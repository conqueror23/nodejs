// moduel reles
var connect = require('http');

// craete server

var server = connect();

var serverStatic = require('serve-static');

// deal with static files
server.use(serveStatic(__dirname +'/website'));

//liseten ports

server.list(3000);
