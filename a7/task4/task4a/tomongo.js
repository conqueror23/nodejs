var express = require('express');

var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1',27017);
new mongodb.Db('customer',server).open(function(err,client){
if(err) throw err;
console.log('connected to database');

app.users= new mongodb.Collection (client,'users');

collection.insert({my:'document'},function (err,docs){
db.users.insert(doc);
});


app.listen(3000);


