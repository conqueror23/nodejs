var express = require('express');
var sio = require('socket.io');
var http = require('http');
var app = express();
// mongodb setttings
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://127.0.0.1:27017";
var dbName = "chatroom";

// app.use(express.bodyParser());
app.use('/',express.static('public'));

var server = http.createServer(app);
var io = sio.listen (server);

MongoClient.connect(url,function(err,client){
  if(err) throw err;

  const db  = client.db(dbName);

  client.close();
})

io.sockets.on('connection',function (socket){
  console.log('Connected');

  socket.on('loginm',function(email,nickname){
    //it works things has been transfered here
    // console.log(email,nickname,url);
    MongoClient.connect(url,function(err,client){
      if(err) throw err;
      console.log("mongo auth process");
      const db  = client.db(dbName);
      // to make it functional
      db.collection("record").find({"email":email,"nickname":nickname},function(err,data){
        if (err) throw err;
        if(data){
        //authenticated and shows the resutl
        db.collection("record").find({"author":nickname}).sort({_id:-1}).limit(4).toArray(function(err,data){
          console.log(data);
          socket.emit('last4',data);
        });
        }
      });

      client.close();
    });
  });
  socket.on('text',function(email,nickname,input){
    socket.broadcast.emit('text',nickname,input);

    console.log("emails"+nickname);
    //save the record to mongodb
    MongoClient.connect(url,function(err,client){
      if(err) throw err;
      console.log("connect to mongo");
      const db  = client.db(dbName);
      db.collection("record").insert({"author":nickname,"email":email,"record":input})
      client.close();
    })

  });
  socket.on('search',function(word){
    MongoClient.connect(url,function(err,client){
      if(err) throw err;
      console.log(word);
      const db  = client.db(dbName);
      db.collection("record").find({record:new RegExp(word, 'i')}).toArray(function(err,data){
         if(err) throw err;
        console.log(data);
        socket.emit('searchResult',data)
      })
      client.close();
    })

  })

});
server.listen(3000);
