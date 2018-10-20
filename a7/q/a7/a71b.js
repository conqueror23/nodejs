var express = require('express');
var fs = require("fs");
var app = express();

app.use(express.static('../public'));

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  res.end('end');
})
 

app.get('/stu', function(req, res) {   
  res.json('[{"name":"jq","country":"45","pas":"fail"},{"name":"ab","country":"55","pas":"pass"},{"name":"afk","country":"67","pas":"pass"}]');
});

app.get('/a71b', function(req, res) {   
  res.sendfile('a71b2.html');
});


var server = app.listen(4000, function () {})