require('http').createServer(function(req,res){
	res.writeHead(200);
	res.end ('hello this the tweet files');
}).listen (3000);