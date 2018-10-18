var express = require('express')
, sio =require('socket.io');
var http = require('http');

// =====================================
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

var server = http.createServer(app);
// sever.on('request',function (req,res))


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('/public',express.static('public'));



// connect socket.io to app
var io = sio.listen(server); // bind to server

// app.listen(3000);
server.listen(3000);

io.sockets.on('connection',function(socket){
  socket.on('join',function (name ){
    socket.name = name ;
    socket.broadcast.emit('announcement',name + 'joind the chat');

  })
  // console.log('someone connected');
  socket.on('text',function (msg){
    socket.broadcast.emit('text',socket.nickname,msg);
  })
  socket.on('close',function(){
    delete position[socket.id];
  })
})
// io.socket.on('cancelled',function (socket){
//   console.log('This function can be used to detected the final round');
// })
//
function broadcast(msg){
  for(var i= 0,l = ws.clients.length; i< l;i++){
    if(ws.clients[i] && socket.id != ws.clients[i].id){
      ws.clients[i].send(msg);
    }
  }
}
