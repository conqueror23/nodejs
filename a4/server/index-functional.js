
var net = require('net');

var server = net.createServer(function (conn){
	conn.on('close',function(){
	count--;
	delete users[nickname];
	});

	conn.write(	'\n > welcom to \033[92mnode-chat\033[39m'
	+'\n > ' + count + 'other people are conneted at this time.'
	+'\n > please write your name and press enter :'
	);
	
	var nickname ;
	conn.on('data',function(data){
		
		//delete return 
		data = data.replace('\r\n', '');
		if(!nickname){
			if(users[data]){
				conn.write('\033[93m>nickname already in use. try again:\033[39m');
				return;

			}else{
				nickname = data;
				users[nickname] = conn;
				for (var i in users){
					if (i != nickname){
					users[i].write('\033[90m> '+ nickname+' joined the room\033[39m\n'); 	
					}
					
				}
			}
		}
		console.log(nickname+":"+data);

	});
	
	conn.setEncoding('utf8');

	count ++;
	

});


server.listen(3000,function (){
	console.log('\033[96m server listening on *:3000\033[39m');
});

var count = 0
, users ={};


