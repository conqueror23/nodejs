server.use(function (req,res,nex){
	// record
	console.error('%s %s',req.method,req.url);
	next();
});
server.use(function (req,res,next){
	if('GET' == req.method && '/images'=req.url.substr(0,7)){
		//pics
	}else{
		// leave to middle_ware 
		next();
	}
});


server.use(function (req,res,next){
	if('GET' == req.method && '/' == req.url){
		// respones to index files
	}else{
		// leave to middle ware
		next();
	}
})

server.use(function (req,res,next){
	res.writeHead(404);
	res.end('Not found');
});

return function (req,res,next){
	var timer = setTimeout(function (){
		console.log(
			'\033[90m%s %s\033[39m \033 [91mis taking too long !\033[39m'
			,req.metho
			,req.url
			);
	},time);
}