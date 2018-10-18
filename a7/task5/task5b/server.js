var express= require('express');
var sio = require('socket.io');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//connection URL
const url = 'mongodb://127.0.0.1:27017';
//DATAbase name
const dbName = 'a7task5';




app.use(express.static('public'));

var io=sio(server);
var test;
io.sockets.on('connection',function(socket){
     console.log('someone connected');
     MongoClient.connect(url, function(err, client) {
            if(err){throw err;};
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('a7task5chat');
            collection.find().limit(4).sort({_id:-1}).toArray(function(err,res){
                if(err){
                    throw err;
                };
            console.log(res);
            // Emit the messages
            socket.emit('output', res);
                 
            });
            client.close();
        });
    
    socket.on('search',function(msg){
        MongoClient.connect(url, function(err, client) {
            if(err){throw err;};
            console.log("search Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('a7task5chat');
            collection.find({'message': new RegExp(msg, 'i')}).toArray(function(err,res){
                if(err){
                    throw err;
                };
                console.log(res);
                test = res;
                if(res.length!=0){
                    socket.emit('searched',res);
                };
               // socket.emit('searched',res);
            });
            client.close();
            
        });
        //socket.emit('searched',test);
    });
    
   
    
    socket.on('text',function(name,email,message){
        //insert data
        MongoClient.connect(url, function(err, client) {
            if(err){throw err;};
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('a7task5chat');
            collection.insertOne({"name":name,
                                  "email":email,
                                  "message":message
                                 },
                                 function(err,result){
                if(err){throw err;};
                console.log('success');
                // callback(result);
                client.close();
            })
        });
              socket.broadcast.emit('text',name,email,message,'messages');
        
              });
    
    
    
    
});

server.listen(3000);