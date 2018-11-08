var express = require('express');
var http = require('http');
var sio = require('socket.io');
var MongoClient = require('mongodb').MongoClient;

var app = express();

var url = "mongodb://127.0.0.1:27017";
var dbName = "productions";
var assert = require('assert');

var server = http.createServer(app);
var io = sio.listen(server);

app.use('/',express.static('public'));

MongoClient.connect(url,function(err,client){
  if(err) throw err;
  console.log('connect to mongo');
  // const db  = client.db(dbName);
  client.close();
})

//json version
io.sockets.on('connetion',function(socket){
  console.log('inside sockets her');
  MongoClient.connect(url,function(err,client){
    if(err) throw err;
    var companyname = 'huawei';
    var dbName = "productions";
    const db  = client.db(dbName);
    // console.log(companyname);
    db.collection('product').find({company:"huawei"},function(err,result){
      if(err) throw err;
      // console.log(data);
      // transfer data to else where
      socket.emit('json',data);
      res.end(result);
      client.close();
    })
  })

})

//array version
/**
app.get('/s',function(req,res){

// io.sockets.on('connetion',function(socket){
  console.log('inside sockets her');
  MongoClient.connect(url,function(err,client){
    if(err) throw err;
    var companyname = 'huawei';
    var dbName = "productions";
    const db  = client.db(dbName);
    // console.log(companyname);
    db.collection('product').find({company:"huawei"},function(err,result){
      if(err) throw err;
      // console.log(data);
      // transfer data to else where
      console.log('inside mongo');
       console.log(result);
      res.end(result);
      client.close();
    })
  })
})
// })
**/



app.listen(3000);
