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
var io = sio.listen(app);

io.socket.on('connection',function(socket){
  console.log('someone connected');
})
