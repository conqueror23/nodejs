var express = require('express');
var sio = require('socket.io');
var http = require('http');
var app = express();
// mongodb setttings
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://127.0.0.1:27017";
var dbName = "productions";

// app.use(express.bodyParser());
app.use('/',express.static('public'));

var server = http.createServer(app);
var io = sio.listen (server);
//promise
var promise = require('promise');


MongoClient.connect(url,function(err,client){
  if(err) throw err;
  const db  = client.db(dbName);
  client.close();
})

io.sockets.on('connection',function (socket){
  console.log('Connected');

  socket.on('search',function(word){
    MongoClient.connect(url,function(err,client){
      if(err) throw err;
      console.log(word);
      const db  = client.db(dbName);
      db.collection("product").find({company:new RegExp(word, 'i')}).limit(4).toArray(function(err,data){
         if(err) throw err;
        console.log(data);

        socket.emit('searchResult',data)
      })
      client.close();
    })

  })
  socket.on('commentl',function (data){
    MongoClient.connect(url,function (err,client){
      if(err) throw err;
      console.log('product name '+data);
      const db  = client.db(dbName);
      db.collection("comments").find({product:data}).toArray(function(err,cd){
        if(err) throw err;
        console.log("cd shows here "+cd);
        socket.emit('show_comments',cd);
      })
      client.close();
    })
  })

  socket.on('comment',function(productname,comment){
    MongoClient.connect(url,function (err,client){
      if(err) throw err;
      console.log(productname,comment);
      const db  = client.db(dbName);
      db.collection("comments").insertOne({product:productname,comments:comment});
      client.close();
    })
  });

});
server.listen(3000);
