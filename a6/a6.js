var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require("fs");
var app = express();

app.use('views',express.static('./views'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret:'secret' ,
    name: 'newapp',
    cookie: {maxAge: 80000 },
    resave: false,
    saveUninitialized: true,
}));
app.set("view engine", "ejs");

app.get('/', function (req, res) {
  console.log("/ GET");
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  // res.send('<h1>This is inside send action</h1>');
  res.end([
    '<form method = "post"><br/>Part 1:<br/>'
    ,'<input name = "part1"><br/>Part 2:<br/><input name = "part2"><br/><button>submit</button></form>'
    ,'<a href ="http://localhost:3000/send">send</a><br/>'
    ,'<a href ="http://localhost:3000/json">json</a><br/>'
    ,'<a href ="http://localhost:3000/redirect">redirect</a><br/>'
    ,'<a href ="http://localhost:3000/sendfile">sendfile</a><br/>'
    ,'<a href ="http://localhost:3000/googleapi">googleapi</a><br/>'
    ,'<a href ="http://localhost:3000/render">render</a><br/>'
  ].join(''));
})

app.post('/', function (req, res) {
  res.cookie("userid",'bw');
  req.session.part1 = req.body.part1;
  req.session.part2 = req.body.part2;
  req.session.search = req.body.img;
  res.redirect('http://chart.apis.google.com/chart?chs=400x400&chdlp=b&chtt=PiesOfRatios&chdl=part1|part2&chd=t:'+req.body.part1+','+req.body.part2+'&cht=p')
});

app.get('/send', function(req, res) {
  res.send('send request has been send to server');
});

app.get('/json', function(req, res) {
  res.json({user:'blong'});
});

app.get('/redirect', function(req, res) {
  res.redirect('/send');
});

 app.get('/googleapi', function(req, res) {
  res.redirect('http://chart.apis.google.com/chart?chs=400x400&chdlp=b&chtt=ClockExample&chdl=SHOW|HIDE&chd=t:5,18&cht=c',301);
 });

app.get('/sendfile', function(req, res) {
  // res.sendfile('1.jpg');
  res.sendfile('1.txt');
});

app.get('/render', function(req, res) {
  res.render('index');
});

// app.get('/googleapi', function(req, res) {
//   //res.render('index.html');
//   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
//   // the functio here is just to read a file from local system
//   require('fs').readFile('1.txt', function (err,data) {
//   res.end(data);
//   });
// });
app.listen(3000);
// var server = app.listen(3000, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("http://%s:%s", host, port)
//
// })
