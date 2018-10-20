// username and password login process with more manipulations
// modules
var connect = require('connect')
,users = require('./users');
const Flickr=require('flickrapi');
const http = require('http');
const fs = require('fs');
const util = require('util');
const querystring =require('querystring');


//http server
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() === 'get') {
    // forms
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple" />'+
        '<input type="submit" value="Upload" />'+
      '</form>'
    );
  } else if (req.url == '/upload' && req.method.toLowerCase() === 'post') {
    if(req.headers['content-type'].indexOf('multipart/form-data')!==-1)
      parseFile(req, res)
    } else {
      res.end('other upload method');
    }
})

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
				+ '<a href ="/logout">Logout</a></legend>'
				,'<p><a href="/upload">Sharing Pics</a></p>'
				/*
				,'<form method = "POST" action ="/upload">'
				,'<fieldset>'
				,'<p>I want to share Pic<input type ="file" name = "shares"></p>'
				,'</fieldset>'
				*/
				,'<form method = "POST" action ="/search">'
				,'<fieldset>'
				,'<p>What are you looking for <input type ="text", name = "search"></p>'
				,'<button>Submit</button>'
				,'</fieldset>'
				,'</form>'
				].join('')
				);
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
		    res.write('<img src ="'+url+'" ></img>');
		  	});
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
	);

server.listen(3000);

function parseFile (req, res) {
  req.setEncoding('binary');
  var body = '';   // data
  var fileName = '';  // filename
  // bondary
  var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', function() {
    var file = querystring.parse(body, '\r\n', ':')
    // image only
    if (file['Content-Type'].indexOf("image") !== -1)
    {
      // get file name
      var fileInfo = file['Content-Disposition'].split('; ');
      for (value in fileInfo){
        if (fileInfo[value].indexOf("filename=") != -1){
          fileName = fileInfo[value].substring(10, fileInfo[value].length-1);
          if (fileName.indexOf('\\') != -1){
            fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
          }
          console.log("File : " + fileName);
        }
      }
      // get image type
      var entireData = body.toString();
      var contentTypeRegex = /Content-Type: image\/.*/;
      contentType = file['Content-Type'].substring(1);
      // get binary start point
      var upperBoundary = entireData.indexOf(contentType) + contentType.length;
      var shorterData = entireData.substring(upperBoundary);
      // replace empty
      var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      // remove extra data
      var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--'+boundary+'--'));
      // save files
      fs.writeFile(fileName, binaryData, 'binary', function(err) {
        res.end('upload complete');
      });
    } else {
      res.end('png are only accepted');
    }
  });
}
