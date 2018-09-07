require('http').createServer(function(req,res){
	if('/'==req.url){
	res.writeHead(200,{'Content-type':'text/html'});
	res.end(['<form method ="post" action ="/url">'
		,'<h1>My form</h1>'
		,'<fieldset>'
		,'<label>Personal Information </label>'
		,'<p>What is your name </p>'
		,'<input type ="text" name = "name">'
		,'<p><button>Submit </button></p>'
		,'</form>'
	
	].join(''));
	
}else if('/url' ==req.url){
	res.writeHead(200,{'Content-type':'text/html'});
	res.end('you have sent a <em>'+req.body.name + '</em>request');
}
	
}).listen(3000);

