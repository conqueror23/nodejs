var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb').MongoClient;

var app = express();
// view engines are include in setings not useing places
app.set('view options',{layout:false});
app.set('view engine','ejs');

// app.use(express.static('public'));
app.use(bodyParser());
// app.use(express.cookieParser());
app.use(session({secret:"hidden"}));
app.use(express.static('public'));



app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

app.get('/',function (req,res){
  // res.send('hello world');
  res.render(index.ejs,{dis:'this is from serversdie'});
})

app.get('/sh',function (req,res){
  res.send('sh?t');
})

app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});



app.listen(3000);
