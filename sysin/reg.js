//regular expression 


// var n = /()/;

// var k = 'just have 3 phones here that i like to have ';
// n = /\d/;

// console.log(RegExp(n,k));

var text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end';

var lines = text.split(/.o/);

console.log(lines); // logs [ 'Some text', 'And some more', 'And yet', 'This is the end' ]