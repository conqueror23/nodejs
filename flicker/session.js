var connect = require('connect')
, RedisSessions = require('connect-redis');
rs = new RedisSessions();

rsapp = 'myapp';

rs.create({
	app : myapp,
	id : 'bw1',
	up : '127.0.0.1',
	ttl: 3600,

	d :{
		kid : 'ill',
		numbers : 10
	}
},
function (err,resp){
	console.log(resp);
}
)



//server.use(connect.session({store : new RedisStore,secret: 'my secret'}));
//server.use(connect.session());
//console.log('sessions trying things');

server.listen(3000);
