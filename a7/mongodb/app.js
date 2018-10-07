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

client.ensureIndex('users','Email',function(err){
	if(err) throw err;
	client.ensureIndex('users','password',function(err){
		if(err) throw err;

		console.log('\033m[96m + \033[39m ensured index');




		app.listen(3000);


})
})

});

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
	if(req.session.loggedIn){
		res.local('authenticated',true);
		// User.findById(req.session.logggedIn,function(err,doc){
		app.users.findOne({_id:{ $oid:req.session.loggedIn }},function(err,doc){
			if(err) return next(err);
			res.local('me',doc)
			next();
		});
	}else{
	res.local('authenticated',false);
	next();
}
});

//router middleware

app.get('/',function(req,res){
	res.render('index');
})
// two kinds of login conditions
app.get('/login/:Email',function (req,res){
	res.render('login',{signupEmail:req.params.Email });
})
app.get('/login',function (req,res){
	res.render('login',{signupEmail: false });
})
app.get('/signup',function(req,res){
	res.render('signup');

})
app.get('/logout',function (req,res){
	req.session.loggedIn = null;
	res.redirect ('/');
});

// post middleware

app.post('/signup',function (req,res,next){
	app.users.insert(req.body.user,function(err,doc){
		if(err) return next(err);
		res.redirect('/login/'+doc[0].Email);
	});
});

app.post('/login',function(req,res){
	app.users.findOne({Email:"req.body.user.Email",password:"req.body.user.password"}
		,function(err,doc){
			if(err) return next (err);
			if(!doc) return res.send('<p>user not fond. Go back')
			req.session.loggedIn = doc._id.toString();
			res.redirect('/');
			console.log(req.session.loggedIn);
		});
});
