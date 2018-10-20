var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require("fs");
var app = express();
var Twitter = require('twitter');
var date = new Date;
var assert = require('assert');
var now = Date.now();
var expect = require('expect.js');


app.use(express.static('../public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret:'secret' ,
    name: 'testapp',   //这里的name指得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

var client = new Twitter({
  consumer_key: '11Omvrp1Hldidi96eFLWCcelT',
  consumer_secret: 'FM5Y9a7Mloyy1BKlRrBMWFIg7s3IdgXd3QkXJ3iuP2nRneT5Dq',
  access_token_key: '1032840077527764992-KtSQaZB6MTT4RwS42KnDDD1CEUX5Js',
  access_token_secret: '8XLdGTXPsT5DBbCt5aE8am71b6cp48fULIul2wQHNNoRY'
});

app.get('/', function (req, res) {
  console.log("/ GET");
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  res.end('<form method = "post" action="/a72a"><br/>What to search<br/><input name = "username"><br/>Number for Tweets<br/><input name = "passcode"><br/><button>submit</button></form><br/><a href = "http://localhost:3000/a71b">a71b1</a><br/><a href = "http://localhost:4000/a71b">a71b2</a><br/><a href = "http://localhost:3000/a73b">a73b</a>');
})

app.get('/a71a1', function(req, res) {
  assert.ok(2<1);
});

app.get('/a71a2', function(req, res) {
  expect(false).to.be.ok();
});

app.get('/a71b', function(req, res) {   
  res.sendfile('a71b1.html');
});

app.post('/a72a', function (req, res) {
  var search = req.body.username;
  var tcount = req.body.passcode;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  client.get('search/tweets', {q: search, count:tcount}, function(error, tweets, response){
    tweets.statuses.forEach(function (tweet) { 
        res.write(tweet.text+'<br/>'+tweet.user.name+'<br/>'+date+'<br/>--<br/>'); 
     });
  res.end('<br/><a href ="http://localhost:3000/"> Back to home</a>');
  });

});

app.get('/a73b', function(req, res) {   
  res.sendfile('a73b.html');
});

app.get('/a74a', function(req, res) {   
  // @MongoDB
  res.sendfile('a73b.html');
});

app.get('/a74b', function(req, res) {
  // @Mongoose
  res.sendfile('a73b.html');
});

app.get('/a75a', function(req, res) {   
  // @MongoDB & chat
  res.sendfile('a73b.html');
});

app.get('/a75b', function(req, res) {   
  // @MongoDB & chat
  res.sendfile('a73b.html');
});

app.get('/a76a', function(req, res) {   
  // @MongoDB & with path
  res.sendfile('a73b.html');
});

app.get('/a76b', function(req, res) {   
  // @6*6 Maze
  res.sendfile('a76b.html');
});

app.get('/a76c', function(req, res) {   
  // @6*6 Maze
  res.sendfile('a76c.html');
});



app.get('/stu', function(req, res) {   
  res.json('[{"name":"jq","country":"45","pas":"fail"},{"name":"ab","country":"55","pas":"pass"},{"name":"afk","country":"67","pas":"pass"}]');
});

var server = app.listen(3000, function () {
  console.log("http://localhost:3000"); 
})