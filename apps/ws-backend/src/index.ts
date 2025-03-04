import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
const accessTokenSecret=process.env.ACCESS_TOKEN_SECRET ?? 'default_secret';
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,req) {
  ws.on('error', console.error);

const url = req.url;

if(!url){
  return;
}
const queryParameters = new URLSearchParams(url.split('?')[1]);
const token = queryParameters.get('token') ?? 'default_token';

let decoded:CustomPayload;
try{
  decoded = jwt.verify(token,accessTokenSecret) as CustomPayload
}catch(err){
  console.log('token cant be verified');
  ws.close();
  return;
}



if(!decoded.User){
  console.log('decoded token does not contain Username')
  ws.close()
  return
}

console.log('the loggged in username is:',decoded.User)
 


ws.on('message', function message(data) {
console.log('received: %s', data);
});
 

  ws.send('connected to ws server');
});