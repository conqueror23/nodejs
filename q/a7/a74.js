const express = require('express');
const app = express();
const wsio = require('websocket.io');
const ws =wsio.attach(app.listen(3001));

app.use(express.static('public'));

ws.on('connection',function(s)){
  console.log('connected');
  socket.on('message',function(msg){
    console.log(msg);
    setTimeout(()=>{
      socket.send('pong from server');
    },1000);
  });
}