/**
*
*/

var net = require('net');
/**
* create server
*/

var server = net.createServer(function (conn){
	conn.on('close',function(){
	count--;
	delete users[nickname];
	broadcast('\033[90m > '+nickname+' left the room \033[39m\n');
	});

	conn.write(	'\n > welcom to \033[92mnode-chat\033[39m'
	+'\n > ' + count + 'other people are conneted at this time.'
	+'\n > please write your name and press enter :'
	);
	
	var nickname ;
	conn.on('data',function(data){
		
		// broadcast 
		function brodacast(msg,exceptMyself){
			for (var i in users){
				if(!exceptMyself || i!=nickname){
					users[i].write(msg);
				}
			}
		}
		brodacast('\033[90m >'+nickname+' joined the room\033[39m\n');
		brodacast('\033[96m >'+nickname+': \033[39m '+data +'\n',true);
		
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
					users[i].write('\033[90m> '+ nickname+'joined the room\033[39m\n'); 	
					}
					
				}
			}
		}
		console.log(nickname+":"+data);

	});
	
	conn.setEncoding('utf8');

	count ++;
	//handle connection
	//console.log('\033[90m new connection!\033[39m');

});


/**
* listening
*/

server.listen(3000,function (){
	console.log('\033[96m server listening on *:3000\033[39m');
});

/*
* counter 
*/
var count = 0
, users ={};


