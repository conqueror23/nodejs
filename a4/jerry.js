
//the broadcast feature is removed, and record function is added
var fs = require('fs');
var count = 0;
var users = {};
var to = {};
var complete = '';
var net = require('net');
var server = net.createServer(function(conn){
	conn.setEncoding('utf8');
	var nickname;
	conn.write(
		'\r\n > welcome to \033[92mnode-chat\033[39m!'
        + '\r\n > ' + count + ' other people are connected at this time.'
        + '\r\n > please write your name and press enter: '
	);
	count++;
	conn.on('data', function (data) {
		if (complete == 'date'){
			date = new Date();
			console.log(date);
		}
		if(data=='\r\n'){
			if (!nickname){
				if (users[complete]){
					conn.write('\033[93m nickname already in use. try again \033[39m');
					return;
				}else{
					nickname = complete;
					users[nickname] = conn;
					console.log('\033[90m > ' + nickname + ' joined the room\033[39m\r\n');
				}
			}
			else{					
				console.log('\033[96m > ' + nickname + ':\033[39m ' + complete + '\r\n');
				for (var i in users){
					if (i != nickname){	
						users[i].write('\033[90m> '+ nickname +': ' + complete +' \033[39m\r\n');
					}
				}
				//recording feature
				var date = new Date();
				fs.appendFile('record.txt',  date + '- ' + nickname +': ' + complete + '\r\n', function (err) {
					if (err) throw err;
				});
			}  
			complete = '';
		}else{
		    complete += data;
		}
	});
	
	conn.on('close', function(){
		count--;
		console.log('\033[90m > ' + nickname + ' left the room\033[39m\n');
		delete users[nickname];
	});
});
server.listen(3000, function (){
	console.log('\033[96m  sserver listening on *:3000\033[39m');
});

