var qs = require ('querystring')
, http = require('http')

var Twitter = require('twitter');

var search = process.argv.slice(2).join(' ').trim()

var client = new Twitter({
	consumer_key : 'k0CLgrsoSbjO3a6AdyZPjckKU',
	consumer_secret : 'ggHEboahk5Db3c3vkwNqcVWdLgW7PrRnN3CuNdyLnH3z5sEByN',
	access_token_key : '1034319528572772352-zoR2DJ7Zs7UQOE8zBTD11F7b1wRTmu',
	access_token_secret : 'h0xm1KqenOcQBirr14qR8poC5EA7j3JoikoO60qv0hozT'
});

if(!search.length){
	return console.log('\n Usage : node tweets <search term>\n');
}

console.log('\n searching for \033[96m' +search + '\033[39m\n');

client.get('search/tweets',{q: search,count : 5}, function (error,tweets,response){
	//tweets.statuses.forEach(function(tweet){
		console.log(tweets);
		//console.log(tweets.user.name);
		//console.log('--');
	//});
});