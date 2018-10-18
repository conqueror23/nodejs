
process.stdout.write('what is the final decisons you got ');
process.stdin.resume();

process.stdin.setEncoding('utf8');

// this way the program works fine here

process.stdin.on('data',option);

function option(data){
  // process.stdout.write(data);

}


// works fine as well but you can make
// process.stdin.on('data',function(note){
//   process.stdout.write(note);
// })
