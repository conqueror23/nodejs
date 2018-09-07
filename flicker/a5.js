// username and password login process with more manipulations
// modules
var connect = require('connect')
,users = require('./users');
const Flickr=require('flickrapi');
const fs =require('fs');
//create server
var server = connect(
	connect.logger('dev')
	,connect.bodyParser()
	,connect.cookieParser()
	,connect.session({secret : 'my secret'})
	,function (req,res,next){
		if('/' == req.url && req.session.logged_in){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end([
				'<legeng>Welcome back, <b>' +req.session.name +'</b>.'
				+ '<a href ="/share">Logout</a></legend>'
				,'<form method = "POST" action ="/upload">'
				,'<fieldset>'
				,'<p>I want to share Pic<input type ="text" name = "shares"></p>'
				,'<button>Shares</button>'
				,'</fieldset>'
				,'</form>'
				,'<form method = "POST" action ="/search">'
				,'<fieldset>'
				,'<p>What are you looking for <input type ="text", name = "search"></p>'
				,'<button>Submit</button>'
				,'</fieldset>'
				,'</form>'
				].join(''));
		}else{
			next();
		}
	}
	,function(req,res,next){
		if('/search' == req.url && "POST" ==req.method){
			const Flickr=require('flickrapi');
			let flickrOptions = {
		      api_key: "ea02de069c0d0ab6c9127a03838ec3c1",
		      secret: "1786dffd4ec6b4e4"
		    };
			Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		  	flickr.photos.search({text: req.body.search}, function(err, result) {
		  	if(err) {
		     throw new Error(err);
		   	}
		   	res.writeHead(200,{'Content-Type': 'text/html'});
		   	res.write('<h1>Search result for : <em>'+ req.body.search+'</em></h1>');
		  	result.photos.photo.forEach(e=>{
		    let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
		    console.log(url);
		    res.write('<img src ="'+url+'" ></img>');
		  	});
		  	res.end('All result has been shown');
		  	});
			});
		}else{
			next();
		}
		}	
	
	,function (req,res,next){
		if('/' == req.url && 'GET' == req.method ){
			res.writeHead(200,{'Content-Type': 'text/html'});
			res.end([
			'<form action = "/login" method = "POST">'
			,'<fieldset>'
			,	'<legend>Please log in</legend>'
			,	'<p>User: <input type ="text" name = "user"></p>'
			,	'<p>Password :<input type = "password" name ="password"></p>'
			,	'<button>Submit<button>'
			,'</fieldset>'
			,'</form>'
			].join(''));
		}else{
			next();

		}
	}
	,function (req,res,next){
		if('/login' == req.url && 'POST' == req.method){
			//console.log('sessions are initializing');
			res.writeHead(200);
			if(!users[req.body.user]||req.body.password!= users[req.body.user].password){
				res.end('Username /password wrong');
			}else{
				console.log(req.session);
				req.session.logged_in = true;
				req.session.name = users[req.body.user].name;
				res.end('<p>Authenticaed!</p><p><a href ="/">pics center&searching engin</a></p>');
			}
		}else{
		next();
		}
	}
	,function (req,res,next){
	if('/logout' == req.url){
		req.session.logged_in = false;
		res.writeHead(200);
		res.end('logged out');
		}else{
		next();
		}
	}
	,function (req,res,next){
		if('/upload'==req.url){
			res.writeHead(200,{'Content-Type': 'text/html'});
			console.log(req.body.shares);
			res.end([
				'<img src= "'+req.body.shares+'"></img>'
				,'<a href ="/">Home</a>'
				].join(''));
		}else{
			next();
		}
	}
	);

server.listen(3000);
