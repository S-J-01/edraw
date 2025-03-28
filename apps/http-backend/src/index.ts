import express, {request, Request,Response} from "express";
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
        {User:parsedInput.data.username,
         id:createdUser.id   
        },
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
            return;
        }
        const accessToken = jwt.sign(
            {User:parsedInput.data.username,
             id: retrievedUser.id   
              },accessTokenSecret,
        {expiresIn:'1h'}
        ) 
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
    if(!req.id){
        res.status(400).json({message:' ID not found in request object'})
        return;
    }
   
    try{
        const createdRoom = await prisma.room.create({
            data:{
                slug:parsedInput.data.slug,
                adminID:req.id
            }
        })
        res.status(200).json({message:'room created',user:req.username,createdRoom:createdRoom})

    }catch(error){
        console.log('database error',error)
    }
   
})


app.get('/chat/:roomId',middleware,async (req:Request,res:Response)=>{

    const roomId = Number(req.params.roomId)
    if(!roomId){
        res.status(400).json({message:'room Id not found'})
        return
    }

    const previousChats = await prisma.chat.findMany({
       where:{
        roomId:roomId
       },
        select:{
            roomId:true,
            message:true,
            senderId:true
        },
        orderBy:{
            id:'desc'
        },
        take:50
    })

    res.status(200).json({previousChats:previousChats})

})

app.get('/room/:slug',middleware,async (req:Request,res:Response)=>{

    const slug = req.params.slug
    if(!slug){
        res.status(400).json({message:'slug not found'})
        return
    }

    const roomId = await prisma.room.findUnique({
       where:{
        slug:slug
       },
        select:{
            id:true,
            
        }
    })

    res.status(200).json({roomId:roomId})

})
app.listen(3001);