var express = require('express');
var http = require('http');
var sio = require('socket.io');

var app = express();

app.use(express.static('/public'))


var server = http.createServer(app);

var io = sio.listen(server);

io.on('connect',function (socket){
  console.log('conneted');
  // socket.on ('join',function (text){
  //
  //
  // })
})



server.listen(3000);
