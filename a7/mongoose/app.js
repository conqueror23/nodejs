var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var app =express.createServer();
// connectint to mongodb
var server = new mongodb.Server('127.0.0.1',27017);

new mongodb.Db('customer',server).open(function(err,client){
if(err) throw err;
console.log('connected to database with moogose model');

var Schema = mongoose.Schema;

var User = mongoose.model('User',new Schema({
	first: String
	,last: String
	,Email:{type:String,unique:true}
	,password:{type:String,index:true}
}));


app.users= new mongodb.Collection (client,'users');


mongoose.connect('mongodb://127.0.0.1/app');

client.ensureIndex('users',function(err){
	if(err) throw err;
	client.ensureIndex('users','password',function(err){
		if(err) throw err;
		console.log('\033m[96m + \033[39m ensured index');



})
})


// Collection.insert({my:'document'},function (err,docs){
// 	if(err) throw err;
// 	//db.close();
//
// });

});


var app = express.createServer();

//presert middlewares

app.set('view options',{layout:false});
app.set('view engine','jade');

//use middlewares

app.use(express.static('public'));

app.use(express.bodyParser());

app.use(express.cookieParser());

app.use(express.session({secret:"hidden"}));

app.use(express.static('/public'));



app.use(function (req,res,next){
	if(req.session.loggedIn){
		res.local('authenticated',true);
		User.findById(req.session.logggedIn,function(err,doc){
			if(err) return next(err);
			next();
		});
	}else{
	res.local('authenticated',false);
	next();
}
});

//router middleware

app.get('/',function(req,res){
	res.render('index',{authenticated:authenticated});
})

app.get('/login/:signupEmail',function (req,res){
	res.render('login',{signupEmail:req.params.signupEmail});
})

app.get('/signup',function(req,res){
	res.render('signup');

})
app.get('/logout',function (req,res){
	req.session.loggedIn=null;
	res.redirect ('/');
});

// post middleware

app.post('/login',function (req,res,next){
	User.findOne({email:req.body.user.email,password:req.body.user.password},function(err,doc){
	if(err) return next(err);
	if(!doc) return res.send('<p>User not fond.Try again');
	req.session.loggegIn = doc._id.toString();
	res.redirect('/');
});
});

app.post('/signup',function(req,res,next){
	var user = new User(re1.body.user).save(function(err){
		if(err) return next(err);
		res.redirect('/login/'+user.email);
});
});

	app.listen(3000);
