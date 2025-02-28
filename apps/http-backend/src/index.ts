import express, {Request,Response} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {z} from 'zod';
dotenv.config();
const app = express();
app.use(express.json())


const signupProp = z.object({
    username : z.string().min(1).max(50),
    password: z.string().min(1).max(50)
})

app.post('/signup',(req,res)=>{

    //logic for user signup
    const parsedInput = signupProp.safeParse(req.body);

    if(!parsedInput.success){
        return res.status(400).json({message:parsedInput.error})
    }
   const newUser={
    username: parsedInput.data.username,
    password: parsedInput.data.password
   }

   res.status(200).json({message:'Signup successful'})
    
});

app.post('/login',(req,res)=>{
    //login code
})
app.post('/create-room',(req,res)=>{
    //logic to create room
})
app.listen(3001);