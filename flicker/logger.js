var connect = require('connect');

connect.createServer(
//	connect.logger('method is :method  type is :res[content-type],length is'+ ':res[content-length] and it took :response-time ms and the data is :date')
	connect.logger(':http-version :response-time :date :url :referrer :user-agent :remote-addr :status')
	,function(req,res){
		res.writeHead(200);
		res.end('Hello World');
		}
	).listen(3000);
