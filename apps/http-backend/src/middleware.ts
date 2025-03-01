import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function middleware(req:Request,res:Response,next:NextFunction){

    const accessTokenSecret=process.env.ACCESS_TOKEN_SECRET ??'default_secret'
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1]
    
    if(token){
        jwt.verify(token,accessTokenSecret,(err,username)=>{
            if(err){
                res.status(401).json({message:'token not valid'})
            }else{
                //@ts-ignore
                req.username =username;
                next();
            }
        })
    }else{
        res.status(401).json({message:'auth header empty'})
    }


}