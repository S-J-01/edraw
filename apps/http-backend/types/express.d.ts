import { Request } from "express";
declare global {
    namespace Express {
      interface Request {
        username?:string;
        id?:string;
      }
    }
  }