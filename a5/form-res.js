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
	
}else if('/url' ==req.url &&'POST'== req.method){
	var body ='';
	req.on('data',function(chunck){
		body += chunck;

	});
	req.on('end',function(){
		res.writeHead(200,{'Content-type':'text/html'});
		res.end('<p>Content-type '+req.headers['Content-type']+'</p>'
			+'<p>Data :</p><pre>'+body +'</pre>');
		
	})
}
	
}).listen(3000);

