
var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  db.close();
},{ useNewUrlParser:true});
