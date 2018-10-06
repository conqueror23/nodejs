var express = require('express');

var mongodb = require('mongodb');
// connectint to mongodb
var server = new mongodb.Server('127.0.0.1',27017);
new mongodb.Db('customer',server).open(function(err,client){
if(err) throw err;
console.log('connected to database');

app.users= new mongodb.Collection (client,'users');

// Collection.insert({my:'document'},function (err,docs){
// 	if(err) throw err;
// 	//db.close();
//
// });

});


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

app.get('/login/:signupEmail',function (req,res){
	res.render('login',{signupEmail:req.params.signupEmail});
})

app.get('/signup',function(req,res){
	res.render('signup');

})


app.post('/signup',function (req,res,next){
	app.users.insert(req.body.user,function(err,doc){
		if(err) return next(err);
		res.redirect('/login/'+doc[0].Email);
	});
});



app.listen(3000);
