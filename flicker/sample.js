/**
* dependencies 
*/

var connect = require ('connect')
, time = require ('./request-time');


/**
* create server 
*/

var server = connect.createServer();


/**
* record request 
*/

server.use(connect.logger('dev'));


/**
* realise middle ware
*/

server.use({time:500});

/**
* quick response
*/

server.use(function(req,res,next){
	if('/a' == req.url){
	res.writeHead(200);
	res.end('Fast');
	}else{
	next();
	}
});

/**
* slow response
*/


server.use(function(req,res,next){
	if('/b'==req.url){
		setTimeout(function(){
			res.writeHead(200);
			res.end('slow');

		},1000);
	}else{
		next();
	}
});
/**
* listening port
*/
server.listen(3000);





