
var connect = require('connect');

var server = connect(
	connect.logger('dev')
	,connect.cookieParser()
	,connect.session({secret : 'my secret'})
	,function (req,res,next){
		if('/'==req.url &&req.session.logged_in){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(
				'Welcome back, <b>' +req.session.name +'</b>.'
				+ '<a href ="/logout">Logout</a>'
				);
		}else{
			
			next();
		}
	}
	);




//server.use(connect.coockieParser());
server.listen(3000);