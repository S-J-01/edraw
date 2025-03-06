import express, {Request,Response} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {signupProp} from "@repo/common/zodSchema";
import middleware from "./middleware";
dotenv.config();
import {accessTokenSecret} from "@repo/backend-common/config";

const app = express();
app.use(express.json())

console.log(accessTokenSecret)





app.post('/signup',(req:Request,res:Response)=>{

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

   const accessToken = jwt.sign({User:newUser.username},accessTokenSecret,{expiresIn:'1h'})
   res.status(201).json({message:'Signup successful', token:accessToken})
    
});

app.post('/login',(req:Request,res:Response)=>{
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
    const accessToken = jwt.sign({User:loggedInUser.username},accessTokenSecret,{expiresIn:'1h'})
    res.status(200).json({message:'login successful',token:accessToken})

})
app.post('/create-room',middleware,(req:Request,res:Response)=>{
    //logic to create room
    
    res.status(200).json({message:'middleware passed',user:req.username})
})
app.listen(3001);