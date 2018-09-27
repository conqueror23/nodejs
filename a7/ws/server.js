process.EventEmitter = require('events').EventEmitter; //should be added as the version changes

var express = require('express')
, wsio = require('websocket.io');

var http = require('http');

var server = http.createServer(app);

var app = express();

var ws = wsio.attach(server);

// var postion  = {}
// , total = 0;

app.use(express.static('public'));

ws.on('connection',function (socket){
  socket.on('message',function(msg){
    console.log(msg);
  })
  socket.send('pong');
});
server.listen(3000);
