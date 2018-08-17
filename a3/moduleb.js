console.log(' from module b');

d =189;
var j = 299;
function add (x,y){
return x+y;
};

exports.func = function (){
	return console.log(d);
}

function minus(a,b){
	var res = a -b;
	return  res;
	
}
module.exports ={ minus,add};


console.log(d);

function too(d){
	console.log("your answer is :"+d);
}

too(d);
too (j);
//console.log(minus(3,4));

//module.exports = add ;

/*
add.prototype.kill = function (){
return 0;
}
*/

