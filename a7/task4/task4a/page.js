var mongo = require('mongodb');
var Db = mongo.db,
 Server = mongo.Server,
MongoClient = mongo.MongoClient,
assert = require('assert');
// var mc = new MoC(new Server("localhost",27017),{native_parser:true});
MongoClient.connect("mongodb://localhost:27017/customers",function(err,db){
  assert.equal(null,err);
  db.collection('user1')
})

MongoClient.open(function (err,mc){
  var db = mc.db('customer1');
  db.connect('customer1');
  db.collection('customer1').insert({"name":"john"});

  var db2 = mc.db('customer2');
  db2.connect('customer2');
  db2.collection('customer2').add({"sex":"female"});

  mc.close();





})
