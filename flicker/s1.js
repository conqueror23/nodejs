// username and password login process with more manipulations
// modules
var connect = require('connect')
,users = require('./users');
const Flickr=require('flickrapi');

//create server

var server = connect(
	connect.logger('dev')
	,connect.bodyParser()
	,connect.cookieParser()
	,connect.session({secret : 'my secret'})
	,function (req,res,next){
		if('/' == req.url && req.session.logged_in){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write([
				'<legeng>Welcome back, <b>' +req.session.name +'</b>.'
				+ '<a href ="/logout">Logout</a></legend>'
				,'<form method = "POST" action ="/">'
				,'<fieldset>'
				,'<p>I want to share Pic<input type ="file" name = "shares"></p>'
				,'<p>What are you looking for <input type ="text", name = "search"></p>'
				,'<button>Submit</button>'
				,'</fieldset>'
				,'</form>'
				].join('')
				);
			if('/search' == req.url){
			res.writeHead(200,{'Content-Type':'text/html'});
			//flickr searching --how to pass variable across function?
			let flickrOptions = {
		      api_key: "ea02de069c0d0ab6c9127a03838ec3c1",
		      secret: "1786dffd4ec6b4e4"
		    };
				if(req.body.search){
					//console.log(req.body.search);
					console.log('inside flickr searching process');
					Flickr.tokenOnly(flickrOptions, function(error, flickr) {
				 	flickr.photos.search({text: req.body.search}, function(err, result) {
					  if(err) {
					     throw new Error(err);
					   }
				    //res.writeHead(200,{'Content-Type':'text/html'});
					  	result.photos.photo.forEach(e=>{
					    let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
					    res.write('this is a way to show all pics '); // refresh the pages
					    //res.end('<img src ="'+url+'" ></img>');
					    //console.log(e);
					    console.log(url);
					  	});
				  	});
					});
					console.log('search completed');
				}
			} 
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
			//console.log('loggin finished!');
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
	);
// how to deal with those input

server.use('/search',search);
function(req,res,next){
	
}


//server.use(connect.coockieParser());
server.listen(3000);



// can be usedto share images

// able to share flicker for images 

