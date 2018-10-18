var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser());
app.use(express.static('public'));

var Twitter = require('twitter');

app.get('/test',function(req,res){
	var data=require('./public/data.json');
	console.log(data);
	res.send(data);

});

app.get('/search',function(req,res){

	var client = new Twitter({
		consumer_key: 'k0CLgrsoSbjO3a6AdyZPjckKU',
		consumer_secret: 'ggHEboahk5Db3c3vkwNqcVWdLgW7PrRnN3CuNdyLnH3z5sEByN',
		access_token_key: '1034319528572772352-zoR2DJ7Zs7UQOE8zBTD11F7b1wRTmu',
		access_token_secret: 'h0xm1KqenOcQBirr14qR8poC5EA7j3JoikoO60qv0hozT'
	});

	var params = {q: req.query.q, count:6};

	client.get('search/tweets', params, function(error, tweets, response) {
			/*
		  	if (!error) {
			tweets.statuses.forEach(function(tweet){
				console.log('');
				console.log('***********************************************');
				console.log('');
				console.log('Twitter Content：');
				console.log('   \033[95m' + tweet.text + '\033[39m');
				console.log('User Name：');
				console.log('   \033[93m' + tweet.user.name + '\033[39m');
				console.log('User ID：');
				console.log('   \033[93m' + tweet.user.id_str + '\033[39m');
				console.log('Created date');
				console.log('   \033[92m' + tweet.created_at + '\033[39m');
				console.log('');
			});
			*/
			// }
			res.send(tweets);
	});

	//console.log(data);
	//res.send(data);

});



app.listen(3000);
