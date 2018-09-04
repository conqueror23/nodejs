var connect = require('connect');

var server = connect(
	connect.bodyParse()
	,connect.static('static')
	,function (req,res,next){
	if('POST' == req.method){
		console.log(req.body.file);
	}else{
		next();
	}
	}
);

//server.use(connect.bodyParse());


server.use(function(req,res){
	//req.body.myinput
});
