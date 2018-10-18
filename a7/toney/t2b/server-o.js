var express = require('express')
, sio =require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(8000);
// connect socket.io to app
var io = sio.listen(app); // bind to server

io.sockets.on('connection',function(socket){
  socket.on('join',function (name ){
    socket.name = name ;
    socket.broadcast.emit('announcement',name + 'joind the chat');

  })
  // console.log('someone connected');
})

// io.socket.on('cancelled',function (socket){
//   console.log('This function can be used to detected the final round');
// })
var express = require('express')
, sio =require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(8000);
// connect socket.io to app
var io = sio.listen(app); // bind to server

io.socket.on('connection',function(socket){
  socket.on('join',function (name ){
    socket.name = name ;
    socket.broadcast.emit('announcement',name + 'joind the chat');

  })
  // console.log('someone connected');
})

// io.socket.on('cancelled',function (socket){
//   console.log('This function can be used to detected the final round');
// })
