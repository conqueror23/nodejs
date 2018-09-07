var connect = require('connect');
var server = connect(
	connect.logger('dev')
	,connect.bodyParser()
	,connect.cookieParser()
	,function (req,res,next){
	if ('/' == req.url){
		res.writeHead(200,{'Content-Type': 'text/html'});
		res.end([
				'<form method = "POST" action ="/search">'
				,'<fieldset>'
				,'<p>What are you looking for <input type ="text", name = "search"></p>'
				,'<button>Submit</button>'
				,'</fieldset>'
				,'</form>'
				].join('')
				);

		//get search request need to transfer to next page
	}else {
		next();
	}
	}
	,function(req,res,next){
		if('/search' == req.url && "POST" ==req.method){
			const Flickr=require('flickrapi');
			let flickrOptions = {
		      api_key: "ea02de069c0d0ab6c9127a03838ec3c1",
		      secret: "1786dffd4ec6b4e4"
		    };
			Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		  	flickr.photos.search({text: req.body.search}, function(err, result) {
		  	if(err) {
		     throw new Error(err);
		   	}
		   	res.writeHead(200,{'Content-Type': 'text/html'});
		  	result.photos.photo.forEach(e=>{
		    let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
		    console.log(url);
		    res.write('<img src ="'+url+'" ></img>');
		  	});
		  	res.end('All result has been shown');
		  	});
			});
		}else{
			next();
		}
	});



server.listen(3000);