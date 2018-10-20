
function outF(arg){
	var inside = arg;
return function bar (){
		console.log(inside);

}

bar();
}

outF('closure?');
