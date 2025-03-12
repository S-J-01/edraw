import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
import {accessTokenSecret} from "@repo/backend-common/config"

console.log(accessTokenSecret)
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,req) {
  ws.on('error', console.error);


function checkUserStatus(token:string): string | null {
  let decoded:CustomPayload;
  try{
    decoded = jwt.verify(token,accessTokenSecret) as CustomPayload
  }catch(err){
    console.log('token cant be verified');
    
    return null;
  }

  if(!decoded.id){
    console.log('decoded token does not contain Username')
    
    return null;
  }


 console.log('the loggged in username is:',decoded.User)
  return decoded.id

}

const url = req.url;

if(!url){
  return;
}
const queryParameters = new URLSearchParams(url.split('?')[1]);
const token = queryParameters.get('token') ?? 'default_token';







 


ws.on('message', function message(data) {
console.log('received: %s', data);
});
 

  ws.send('connected to ws server');
});