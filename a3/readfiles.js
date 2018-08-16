// read files
var fs = require('fs');

fs.readFile('hi.txt','utf8', function (err,content){
if (!err) console.log(content);
});
