var express = require('express');
var sio = require('socket.io');
var http = require('http');

  var app = express();

  app.use(express.bodyParser());
  app.use('/',express.static('public'));


  var server = http.createServer(app);

var io = sio.listen (server);

app.listen(3000);

io.socket.on('connection',function (socket){
  socket.on('join',function (name){
    socket.nickname = name;
    socket.broadcast.emit('announcement',name +' joined the chat.');

  });

  socket.on('text',function (msg){
    socket.broadcast.emit('text',socket.nickname,msg);

  })
})
