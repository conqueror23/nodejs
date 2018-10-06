var express = require('express');

var mongodb = require('mongodb');

var app = express.createServer();

app.use(express.static('public'));

app.use(express.bodyParser());

app.use(express.cookieParser());

app.use(express.session({secret:"hidden"}));

app.use(express.static('/public'));

app.set('view options',{layout:false});
app.set('view engine','jade');

app.get('/',function(req,res){
	res.render('index',{authenticated:false});
})

app.get('/login',function (req,res){
	res.render('login');
})

app.get('/signup',function(req,res){
	res.render('signup');

})




app.listen(3000);
