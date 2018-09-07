var connect = require('connect');
var server = connect(
	connect.logger('dev')
	,connect.bodyParser()
	,connect.cookieParser()
	,function (req,res){
	const Flickr=require('flickrapi');
	let flickrOptions = {
      api_key: "ea02de069c0d0ab6c9127a03838ec3c1",
      secret: "1786dffd4ec6b4e4"
    };


	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  	flickr.photos.search({text: "red+panda"}, function(err, result) {
  	if(err) {
     throw new Error(err);
   	}
   	res.writeHead(200,{'Content-Type': 'text/html'});
    res.write('<h1> result of your serach</h1>');
  	result.photos.photo.forEach(e=>{
    let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
    console.log(url);
    res.write('<img src ="'+url+'" ></img>');
  });
    res.end('<h2>This is the end of result</h2>');
  });

	});

	}
);



server.listen(3000);