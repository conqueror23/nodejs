 process.EventEmitter = require('events').EventEmitter; //should be added as the version changes

var express = require('express')
, wsio = require('websocket.io');

var http = require('http');
var app = express();

var server = http.createServer(app);

var ws = wsio.attach(server);
// than server

var positions  = {}
, total = 0;

app.use(express.static('public'));

ws.on('connection',function (socket){
  //cursors version
  socket.id = ++total;
  socket.send(JSON.stringify(positions));

  socket.on('message',function(msg){
    try{
      var pos = JSON.parse(msg);

    }catch(e){
      console.log(e);
      return ;
    }
    positions[socket.id] = pos;
    // console.log(msg);
    broadcast(JSON.stringify({type:'position',pos:pos,id :socket.id}));
  });
  socket.on('close',function (){
    delete positions[socket.id];
    broadcast(JSON.stringify({type:'disconnect',id :socket.id}));
  });
  function broadcast (msg){
    for (var i = 0,l =ws.clients.length;i<l;i++){
      if (ws.clients[i]&&socket.id !=ws.clietns[i].id){
        ws.clients[i].send(msg);
      }
    }
  }




  // socket.send('pong');
});
server.listen(3000);
