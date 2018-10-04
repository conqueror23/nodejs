
var readline = require('readline');

var rl =readline.createInterface({
	input: process.stdin,
	ouput: process.stdou,
	// terminal: false
});

rl.on('line',function(line){
	var arr =[];
	for(var i=0;i<line.length;i++){
	tar = line[i];
	var sum =0;
		for(var j=0;j<line.length;j++){
			if(tar == line[j]){
				sum ++;
}
}
	if(sum<=1){
		arr.push(tar);
}

}
if((arr.length-1)){
		console.log(arr[arr.length-1]);
}else{
	console.log('null');
}

});
