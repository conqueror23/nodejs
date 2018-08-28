var MongoClient = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost :21017/test';
MongoClient.connect(url,function 
