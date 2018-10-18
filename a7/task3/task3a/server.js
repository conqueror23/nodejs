var express = require('express');
var sio = require('socket.io');
var http = require('http');
var app = express();
  // app.use(express.bodyParser());
app.use('/',express.static('public'));

var server = http.createServer(app);
var io = sio.listen (server);


io.sockets.on('connection',function (socket){
  console.log('Connected');
  socket.on('join',function (name){
    socket.nickname = name;
    socket.broadcast.emit('announcement',name +' joined the chat.');

  });

  socket.on('text',function(msg){
    socket.broadcast.emit('text',socket.nickname,msg);

  });
});
server.listen(3000);
