require('http').createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/html'});
	res.end('hello <b>world</b>');
	setTimeout(function (){
		res.end('HHHHH');

	},500);	
}).listen(3000);

