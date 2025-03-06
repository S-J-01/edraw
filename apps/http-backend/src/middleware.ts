import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import { accessTokenSecret } from "@repo/backend-common/config";

export default function middleware(req:Request,res:Response,next:NextFunction){

   
    console.log('secret in middleware is',accessTokenSecret)
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1]
    
    if(token){
        try{
            const decoded = jwt.verify(token,accessTokenSecret) as CustomPayload;
            console.log('the value of user in decoded is ',decoded.User)
            req.username = decoded.User;
            next();
        }catch(err){
            res.status(401).json({message:'token not valid'})
        }
    }else{
        res.status(401).json({message:'auth header empty'})
    }


}