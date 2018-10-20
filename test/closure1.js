
function outF(arg){
	var inside = arg;
return function bar (){
		console.log(inside);

}

}

outF('new things');

//var innerf = outF('closure?');

//innerf();
