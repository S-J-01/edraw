import express, {Request,Response} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {signupProp,createRoomSchema} from "@repo/common/zodSchema";
import middleware from "./middleware";
dotenv.config();
import {accessTokenSecret} from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt"

const app = express();
app.use(express.json())

console.log(accessTokenSecret)





app.post('/signup',async (req:Request,res:Response)=>{

    //logic for user signup
    const parsedInput = signupProp.safeParse(req.body);

    if(!parsedInput.success){
        console.log('wrong input type')
       res.status(400).json({message:parsedInput.error});
       return;
    }
   const newUser={
    username: parsedInput.data.username,
    password: parsedInput.data.password,
    
   }

   console.log(newUser)

   
    const hashedPassword = await bcrypt.hash(parsedInput.data.password,10)
   
   

   try{
    const createdUser = await prisma.user.create({
        data:{
            username:parsedInput.data.username,
            password:hashedPassword
        }
    })

    const accessToken = jwt.sign(
        {User:parsedInput.data.username},
        accessTokenSecret,
        {expiresIn:'1h'}
    )

    console.log('the user created in the db is :',createdUser)
   res.status(201).json({message:'Signup successful', token:accessToken})

   }catch(err){
    console.log('database entry failed with error',err)
   }

   
    
});

app.post('/login',async (req:Request,res:Response)=>{
    //login code
    const parsedInput = signupProp.safeParse(req.body)
    if(!parsedInput.success){
        res.status(400).json({message:parsedInput.error});
        return;
    }
    const loggedInUser = {
        username: parsedInput.data.username,
        password: parsedInput.data.password
    }

    console.log(loggedInUser)
    //database-call
    //if database call successful then return token

    try{
        const retrievedUser = await prisma.user.findUnique({
            where:{
                username:parsedInput.data.username
            }
        })
        if (!retrievedUser || !(await bcrypt.compare(parsedInput.data.password,retrievedUser.password))){
            res.status(401).json({message:'invalid username or password'})
        }
        const accessToken = jwt.sign({User:parsedInput.data.username},accessTokenSecret,{expiresIn:'1h'})
    res.status(200).json({message:'login successful',token:accessToken})
    }catch(err){
        res.status(500).json({message:'database error '})
    }
    

})
app.post('/create-room',middleware,async (req:Request,res:Response)=>{
    //logic to create room
    const parsedInput = createRoomSchema.safeParse(req.body)

    if(!parsedInput.success){
        res.status(400).json({message:parsedInput.error})
        return;
    }
    try{
        const createdRoom = await prisma.room.create({
            data:{
                slug:parsedInput.data.slug,
                adminID:parsedInput.data.adminId
            }
        })
        res.status(200).json({message:'room created',user:req.username,createdRoom:createdRoom})

    }catch(error){
        console.log('database error',error)
    }
   
})
app.listen(3001);