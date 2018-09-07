var connect = require('connect');
var cookies = require ('connect-cookies');

var server = connect ();

server.use(cookies());

server.use(function (req,res){
	var views = req.cookies.get('views') ||0;

	req.cookies.set('views',++views);
	res.end(views + ' views');
}
);


server.listen(3000);
