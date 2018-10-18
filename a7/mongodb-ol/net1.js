var MongoClient = require('mongodb'),
  test = require('assert');
  var db =MongoClient.Db;
// Connection url
var url = 'mongodb://localhost:27017/test1';
// Connect using MongoClient
// console.log(require('mongodb'));

MongoClient.connect(url, function(err, db) {
  // Create a collection we want to drop later

  var col = db.collection('createIndexExample1');
  // Show that duplicate records got dropped
  col.find({}).toArray(function(err, items) {
    // test.equal(null, err);
    // test.equal(4, items.length);
    db.close();
  });
});
