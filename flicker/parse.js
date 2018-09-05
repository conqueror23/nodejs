var connect = require('connect');

var bodyParser = require('body-parser');

var serverStatic = require('serve-static');


var server = connect(
	//connect.bodyParse()
	//connect.static('static')
);

server.use(serverStatic(__dirname+'/static'));

//server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req,res,next){
		//bodyParser.json()
		console.log(req.method); // req.method cannot be read?
		if('POST' == req.method && req.body.file){
			//console.log(req.body.file);
			// results are undefined retruned to server figure out why later?
			//console.log(req.body.file.path);
			fs.readFile(req.body.file.path,'utf8',function (err,data){
				if(err){
					res.writeHead(500);
					res.end('Error!');
					return;
				}else{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end([
					'<h3>Files :' +req.body.file.name+'</h3>'
					,'<h4>Type :' +req.body.file.type + '</h4>'
					,'<h4> Contents:</h4> <pre> ' +data+'</pre>'
					].join(''));	
				}
				
			});
		}else{
			next();
		}	
	//req.body.myinput
});

server.listen(3000);

