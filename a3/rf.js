

var fs = require('fs');
                fs.readFile('package.json','utf8', function (err, contents) {
                  if (!err) console.log(contents);

                });

console.log('files writting ');

var new_input = 'this is writting by node programs';
fs.writeFile('writing.txt',new_input,function (err){
if (err){
return console.log(err);
}
console.log('files has been altered');
});

console.log('buffers');

var mybuffer = Buffer.from('==ii1j2i3h1i23h', 'base64');

console.log(mybuffer);
require('fs').writeFile('logo.jpg', mybuffer,function(err){
console.log(err);
});

console.log('events');

var EventEmitter = require('events').EventEmitter;
var action  = new EventEmitter;
action .on('event', function () {
console.log('Action event has been fired');
});
action.emit('event');


//console.log('reading directories');

//console.log(require('fs').readdirSync(__dirname));

