import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
import {accessTokenSecret} from "@repo/backend-common/config"
import { prisma} from '@repo/db/client';
import type { Room } from '@repo/db/client';



console.log(accessTokenSecret)
const wss = new WebSocketServer({ port: 8080 });

interface ConnectedUser{
  userId : string,
  rooms: string[],
  ws:WebSocket
}
const connectedUsers : ConnectedUser[] = []
function checkUserStatus(token:string): string | null {
  let decoded:CustomPayload;
  try{
    decoded = jwt.verify(token,accessTokenSecret) as CustomPayload
  }catch(err){
    console.log('token cant be verified');
    
    return null;
  }

  if(!decoded.id){
    console.log('decoded token does not contain id')
    
    return null;
  }

 console.log('the loggged in username is:',decoded.User)
  return decoded.id

}

wss.on('connection', function connection(ws,req) {
  ws.on('error', console.error);

const url = req.url;

if(!url){
  console.log('url could not be found')
  ws.close()
  return;
}
const queryParameters = new URLSearchParams(url.split('?')[1]);
const token = queryParameters.get('token') ?? 'default_token';

const userID = checkUserStatus(token)
if (!userID){
  console.log('userId could not be extracted. Token invalid')
  ws.close()
  return;
}

connectedUsers.push({
  userId : userID,
  rooms:[],
  ws:ws
})


ws.on('message', async function message(data) {
 const stringData = data.toString() 
const parsedData = JSON.parse(stringData)
// parsedData = {requestType: string, roomSlug:string  , chatMessage?:string}
//check the parsedData against the zod Schema
if (parsedData.requestType==='join-room'){
  let doesRoomExist : Room | null
  try{
  doesRoomExist = await prisma.room.findUnique({
  where:{
    slug:parsedData.roomSlug
  }
 })
  }catch(err){
    console.log('database query failed.Server error',err)
    ws.send('database query failed.Server error')
    return
  }
 if(!doesRoomExist){
  ws.send('room does not exist')
  return;
 }
 
 const currentUser = connectedUsers.find(user=>user.ws===ws);
 if(!currentUser){
  ws.send('unauthenticated user. room joining failed')
  return
 }
 currentUser.rooms.push(parsedData.roomSlug)
 ws.send('room joined successfully')
}

if (parsedData.requestType==='leave-room'){

  let doesRoomExist: Room | null
  try{
   doesRoomExist = await prisma.room.findUnique({
    where:{
      slug:parsedData.roomSlug
    }
   })
}catch(err){
  console.log('database query failed. server error')
  ws.send('database query failed. server error')
  return
}
   if(!doesRoomExist){
    ws.send('room does not exist')
    return;
   }

   const currentUser = connectedUsers.find(user=>user.ws===ws)
   if(!currentUser){
    ws.send('unauthenticated user. Room leaving failed')
    return;
   }
   const roomIndex = currentUser.rooms.indexOf(parsedData.roomSlug)
   if(roomIndex===-1){
    ws.send('user not subscribed to room')
    return;
   }
   currentUser.rooms.splice(roomIndex,1)
   ws.send('room left successfully')
}

if(parsedData.requestType==='chat'){
  let doesRoomExist:Room | null
  try{
  doesRoomExist = await prisma.room.findUnique({
    where:{
      slug:parsedData.roomSlug
    }
   })
  }catch(err){
    console.log('database query failed. server error')
    ws.send('database query failed. server error')
    return
  }
   if(!doesRoomExist){
    ws.send('room does not exist')
    return;
   } 
   const currentUser = connectedUsers.find(user=>user.ws===ws)
   if (!currentUser){
    ws.send('unauthenticated user. Chat request failed')
    return
   }
  const isUserSubscribedToRoom = currentUser.rooms.find(room=>room ===parsedData.roomSlug)
  if(!isUserSubscribedToRoom){
    ws.send('user not subscribed to room. chat request failed')
    return
  }
try{
  const chat = await prisma.chat.create({
    data:{
      roomId:doesRoomExist.id,
      message:parsedData.chatMessage,
      senderId:currentUser.userId
    }
  })
}catch(err){
  console.log('chat saving in database failed. server error')
  ws.send('chat saving in database failed. server error')
  return
}
  connectedUsers.forEach(user=>{
    if(user.ws!== ws && user.rooms.includes(parsedData.roomSlug)){
      user.ws.send(parsedData.chatMessage)
    }
  })
}
});
 

  ws.send('connected to ws server');
});