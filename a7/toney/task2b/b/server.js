var express= require('express');
process.EventEmitter=require('events').EventEmitter;

var wsio=require('websocket.io');
var users = require('./user');
var bodyParser = require('body-parser');

var app=express();

var ws=wsio.attach(app.listen(3000));
app.use(express.static('public'));
var positions = {};
var total = 0;


/*app.use(function (req, res, next) {
    if ('/' == req.url && 'GET' == req.method) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end([
            '<form action="/login" method="POST">'
          ,   '<fieldset>'
          ,     '<legend>Please log in</legend>'
          ,     '<p>User: <input type="text" name="user"></p>'
          ,     '<p>Password: <input type="password" name="password"></p>'
          ,     '<button>Submit</button>'
          ,   '</fieldset>'
          , '</form>'
        ].join(''));
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if ('/login' == req.url && 'POST' == req.method) {
    if (!users[req.body.user] || req.body.password != users[req.body.user].password){
      res.writeHead(200);
      res.end('wrong username/password');
        } else {
      res.redirect('index.html');
        }
    } else {
        next();
    }
});
*/



ws.on('connection',function(socket){

	console.log('connected');

    function broadcast(msg){
    for(var i =0, l = ws.clients.length; i < l; i++){
        if(ws.clients[i] && socket.id != ws.clients[i].id){
            ws.clients[i].send(msg);
        };
    };
};
	socket.id = ++total;
    socket.send(JSON.stringify(positions));
	socket.on('message',function(msg){
		console.log(' got: '+msg);
		try{
          var pos = JSON.parse(msg);
          }catch(e){
              return;
          };
    positions[socket.id] = pos;
    broadcast(JSON.stringify({type:'position', pos:pos, id: socket.id}));
	});

	socket.on('close',function(){
		delete positions[socket.id];
        broadcast(JSON.stringify({type:'disconnect', id: socket.id}));
	});


});
