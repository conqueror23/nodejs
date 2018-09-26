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
web.set('view',__dirname+'/view');
// web.set('view options',{layout:false});
web.get('/',(res,req,next)=>{
	res.render(index);
});


//defines middlewares that is going to used here
web.use(cookieParser());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: false }));


// var search = process.argv.slice(2).join(' ').trim()

var client = new Twitter({
	consumer_key : 'jXwGwh3z6471rgE1nxdlCExtL',
	consumer_secret : 'jVNDEOHoh7kPt004opMl9wteot0YAaubTrpt3lF5l91MX8OAD1',
	access_token_key : '1840296936-rfThqqWXZFXIClSXkpXbQ0ESASLTS26kyq5Y6Wm',
	access_token_secret : '3lmn9LX4AbJKxk2AiHFZ9EhFl00OlMB1xzqOofK5UjC7m'
});

if(!search.length){
	return console.log('\n Usage : node tweets <search term>\n');
}

console.log('\n searching for : \033[96m' + search + '\033[39m\n');

client.get('search/tweets',{q: search, count:5}, function (error,tweets,response){
	tweets.statuses.forEach(function (tweet){
		// console.log(tweet);
		console.log(' \033[90m' + tweet.text + '\033[39m');
		console.log(' \033[94m' + tweet.user.name + '\033[39m');
		console.log('--');

		fs.writeFile('searching_record.txt','\n'+tweet.text+tweet.user.name+'=====\n',function(err){
			if(err){
				return console.log(err);
			}

		})
		console.log('result has been output to a files');
	});
});

web.listen(3000);
