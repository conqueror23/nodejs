var express= require('express');
var sio = require('socket.io');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var request = require('superagent');


app.use(express.static('public'));

var io=sio(server);
var apiKey = '{your API key}';
var currentSong;
var dj;


function elect (socket){
    dj = socket;
    io.sockets.emit('annoumcement', socket.nichname+ ' is the new dj');
    socket.emit('elected');
    socket.dj = true;
    socket.on('disconnect',function(){
        dj = null;
        io.sockets.emit('announcement','the dj left - next one to join becomes dj');
    })
}



io.sockets.on('connection',function(socket){
    console.log('someone connected');
    socket.on('join',function(name){
        socket.nickname= name;
        socket.broadcast.emit('annoucement', name + ' joined the chat.');
        if(!dj){
            elect(socket);
        }else{
            socket.emit('song',currentSong);
        }
    });
    socket.on('text',function(msg){
              socket.broadcast.emit('text',socket.nickname,msg);
              });
    socket.on('search',function(q,fn){
        console.log(q);
        request('http://tinysong.com/s/'+encodeURIComponent(q)+'?key='+apiKey+'&format=json',function(res){
            console.log(res);
           if(200==res.status){fn(JSON.parse(res.text))};
        });
    });
    socket.on('song',function(song){
        if(socket.dj){
            currentSong = song;
            socket.broadcast.emit('song',song);
        }
    })

});



server.listen(3000);
