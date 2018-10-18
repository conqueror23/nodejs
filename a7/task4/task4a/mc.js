const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//   db.collection('mc').insertOne({"record":"1"});
//
//   client.close();
// });

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Reading part ");

  const db = client.db(dbName);
  var result  = db.collection('mc').findOne({"record":"1"});

  console.log(result);
  client.close();
});
