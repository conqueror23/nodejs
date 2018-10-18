var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// connectint to mongodb
const url = 'mongodb://localhost:27017';
var dbname = "customer2";
var app = express.createServer();

//preset middlewares

app.set('view options',{layout:false});
app.set('view engine','jade');

//use middlewares
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:"hidden"}));
app.use(express.static('/public'));


// authentication process in index pages
app.use(function (req,res,next){
	console.log(req.body.loggedIn);
	MongoClient.connect(url,function(err,client){
		console.log(client.users);
	if(req.session.loggedIn){
		console.log('user have logged');
		res.local('authenticated',true);
		client.users.findOne({_id:{ $oid:req.session.loggedIn }},function(err,doc){
			console.log(doc);
			if(err) return next(err);
			res.local('me',doc)
			next();
		});
	}else{
	res.local('authenticated',false);
	next();
}
	client.close();
});
});
//router middleware

app.get('/',function(req,res){
	res.render('index');
});
// two kinds of login conditions
app.get('/login/:Email',function (req,res){
	res.render('login',{signupEmail:req.params.Email });
});
// app.get('/login',function (req,res){
// 	res.render('login',{signupEmail: false });
// });
app.get('/signup',function(req,res){
	res.render('signup');
});
app.get('/logout',function (req,res){
	req.session.loggedIn = null;
	res.redirect ('/');
});
debugger;

// post middleware

app.post('/signup',function (req,res,next){
	MongoClient.connect(url,function(err,client){
		console.log("inserting to database ");
		var db = client.db(dbname);
		db.collection('users').insertOne(req.body.user,function(err,doc){
			if(err) return next(err);
			res.redirect('/login/'+doc["ops"][0].Email);
			});
		client.close();
	});
});
debugger;

app.post('/login',function(req,res){
	MongoClient.connect(url,function(err,client){
		console.log('quering in database');
		var db = client.db(dbname);
		db.collection('users').findOne({Email:req.body.user.Email,password:req.body.user.password},
			function(err,doc){
					if(err) return next (err);
					if(!doc) return res.send('<p>user not fond. Go back')
					req.session.loggedIn = doc._id.toString();
					console.log(req.session.loggedIn);
			});
				client.close();
				res.redirect('/');
			});
});

debugger;

app.listen(3000);
