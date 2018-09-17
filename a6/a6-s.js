var http = require('http');
var express = require('express');


var app = express();
// var app = http.createServer();

app.set('view engine','ejs');
app.set('views', __dirname+'/views');
app.set('view options',{layout :false});



app.get('/',function (req,res,next){
  res.render('index');
})
app.listen(3000);
