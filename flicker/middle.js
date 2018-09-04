// moduel reles
var connect = require('connect');

// craete server

var server = connect();

var serverStatic = require('serve-static');

// deal with static files
server.use('/web',serverStatic(__dirname+'/websites'),{maxAge:1000,hidden:true});
server.use(connect.query);
server.use(function (req,res){
	//req.query.page =="5";
})

//logger middle ware
//server.use(connect.logger('dev'));



//liseten ports

server.listen(3000);
