//var fs = require('fs);


var express = require('express');
var app = express ();
var http = require('http');
var server = http.createServer(app);

server(
function(req,res,next){
	res.writeHead(200,{'Content-type':'text/html'});
	res.end('Hi there this is new format of this server ways');
}
);

var vg = app.set('view engine','ejs');

app.set('views',__dirname +'/views');

app.set('view options', {layout : false});

console.log(app.set('views'));

console.log(app.set('view options'));

//console.log(JSON.parse(vg));

app.get('/',function (req,res,next){});

app.listen(3000);
