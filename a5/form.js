require('http').createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/html'});
	res.end(['<form method ="post" action ="/url">'
		,'<h1>My form</h1>'
		,'<fieldset>'
		,'<label>Personal Information </label>'
		,'<p>What is your name </p>'
		,'<input type ="text" name = "name">'
		,'<p><button>Submit </button></p>'
		,'</form>'
	
	].join(''));}).listen(3000);

