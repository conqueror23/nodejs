var http = require('http');
var sio = require('socket.io');
var express = require('express');

var app = express();

var server = http.createServer(app);

app.use('/',express.static('public'));

var io = sio.listen(server);


io.sockets.on('connection',function(socket){
  console.log('someone connect');
  // socket.on()
})

server.listen(3000);
