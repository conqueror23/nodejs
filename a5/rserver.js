require('http').createServer(function(req,res){
	if('/', ==req.url){
		res.writeHead(200,{'Content-type ':'text/html'});
		res.end({
			'<form method = "Post" action = "/url">'
			,'<h1> New form </h1>'
			,'<fieldst>'
			,'<label>Personal Information </lable>'
			,'<p> what you name</p>'
			,'<input type = "text" name = "name "'
			,'<button >Submit </button>'
			,'</form >'

		})
	}
	
})