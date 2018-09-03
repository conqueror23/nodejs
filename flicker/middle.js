// moduel reles
var connect = require('connect');

// craete server

var server = connect();

var serverStatic = require('serve-static');

// deal with static files
server.use('/web',serverStatic(__dirname+'/websites'));

//liseten ports

server.listen(3000);
