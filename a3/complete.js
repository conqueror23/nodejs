var fs = require('fs'),stdin = process.stdin,stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
  // console.log('');
  if (!files.length)  { // files arr to store all files
    return console.log('    \033[31m No files to show!\033[39m\n');
	}
  	console.log(' Select which file or directory you want to see\n');
  	//var stats = [];
  	function file(i) {
    var filename = files[i];
 	fs.stat(__dirname + '/' + filename, function (err, stat) {
      if (stat.isDirectory()) {
		console.log('     '+i+ ' \033[36m' + filename + '/\033[39m ');
      } else {
        console.log('     '+i+ '\033[90m' + filename + '\033[39m');
    	}
  if(++i == files.length){
  	read();
  	}else{
  	file(i);
  	}
  });
  }

  function read(){
   	console.log('');
   	stdout.write( 'Enter your choices that you want find ');

   	stdin.resume();
   	stdin.setEncoding('utf8');

   	stdin.on('data',option);
   }
   	function option(data){
  	var filename = files[Number(data)];

   	if (!filename) {
   		stdout.write(' enter your choice:');

   	}else{
 		stdin.pause();
 		fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
 			//stats[i] = stat;
 			console.log('');
 			console.log('\033[90m'+ data.replace(/ ( .*)/g,'  $1')+'\033[39m');
		});
   	}
   }
   file(0);
});
