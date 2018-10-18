var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var web = express();
var Twitter = require('twitter');
// sessions and cookies to record temporal datas
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
// website settings
web.set('view engine','ejs');
web.set('views',__dirname+'/views');
// web.set('view options',{layout:false});

//defines middlewares that is going to used here
web.use('views',express.static('./views'));
web.use(cookieParser());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: false }));

web.get('/',function(req,res){
	res.render('index');
});

var client = new Twitter({
	consumer_key : 'jXwGwh3z6471rgE1nxdlCExtL',
	consumer_secret : 'jVNDEOHoh7kPt004opMl9wteot0YAaubTrpt3lF5l91MX8OAD1',
	access_token_key : '1840296936-rfThqqWXZFXIClSXkpXbQ0ESASLTS26kyq5Y6Wm',
	access_token_secret : '3lmn9LX4AbJKxk2AiHFZ9EhFl00OlMB1xzqOofK5UjC7m'
});

web.post('/search',function(req,res){
	console.log(req.body.q);
	if(!req.body.q.length){
		return console.log('\n Usage : node tweets <search term>\n');
	}
	console.log('\n searching for : \033[96m' + req.body.q + '\033[39m\n');

	client.get('search/tweets',{q: req.body.q, count:5}, function (error,tweets,response){
		res.render('result',{results:tweets.statuses, search: req.body.q});
		});
	});

web.listen(3000);
