/*
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017';
const dbname='chatroom';
MongoClient.connect(url,{useNewURLParse:true},function(err,client){
	if(!err)
	{
		console.log("Connected!");
		const db=client.db(dbname);

        const myobj = { username: "iris", password: "123" };
        db.collection("userlist").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("注册成功");
            client.close();
        });

		db.collection('userlist').find().toArray(function(err,docs){
			if(err){
				console.log(err);
			}
			else{
				console.log(docs);
				client.close();
			}
		});


	}
	else
		console.log(err);
});
*/

const mongo = require('mongodb').MongoClient;
const client1 = require('socket.io').listen(3000).sockets;

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    client1.on('connection', function(socket){
        let chat = db.db('mongochat').collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(4).sort({time:-1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;
			let email = data.email;
			let time=Date.now();

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message,email:email,time:time}, function(){
                    client1.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });

		//handle search
		socket.on('search',function(data){
			let key=data.key
			chat.find({message:{$regex:key}}).toArray(function(err,res){
				if(err){throw err;}
				socket.emit('searched',res);
			})
		});

    });
});
