require('http').createServer(function(req,res){
	res.writeHead(200,{'Content-type':'image/png'});
	require('fs').createReadStream('image.png').pipe(res);
	

}).listen(3000);