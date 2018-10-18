var mongo = require('mongodb');
var Db = mongo.db;
var Server = mongo.Server;
var MoC = mongo.MongoClient;
var assert = require('assert');


console.log(MoC);
// var mc = new MoC(new Server("localhost",27017),{native_parser:true});
MoC.connect("mongodb://localhost:27017/customers",function(err,db){
  assert.equal(null,err);

  db.collection('user1').add({"name":"jack"},function(err,result){
    assert.equal (null,err);
    assert.equal(1,result);
    db.close();
  });


})
