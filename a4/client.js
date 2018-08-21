var net = require('net');

net.connect (port[[, host],callback]);

var client  = net.connect(3000,'localhost');
client.on('connect',function(){});

net.connect (300,'localhost',function (){});

client.setEncoding('utf-8');


client.on('connect',function ({
	client.write('Nick mynick\r\n ');
	client.write('User mynick 0* :realname\r\n ');
	client.write('Join #node.js\r\n');
})
