// read files
var fs = require('fs');

fs.readFile('hi.txt','utf8', function (err,content){
if (!err) console.log(content);
});


//write files 

fs.writeFile('filename','things you want to write', 'utf8',function (err){
	if (err){
		console.log(err);
	}else{
		console.log('things has been write on the document')
	}
});


//buffer 

var buffer =new  Buffer ('things are going to ok','utf8');

//console.log(buffer);

require('fs').writeFile('new.txt',buffer,function (err){
	console.log(err)
});

//event emitter

var EventEmitter = require('events').EventEmitter, a = new EventEmitter;
a.on('event',function (){
	console.log('event called');
});
a.emit('event');




