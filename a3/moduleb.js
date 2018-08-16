console.log(' from module b');

function add (x,y){
return x+y;
};


function minus(a,b){
	var res = a -b;
	return  res;
	
}
module.exports ={ minus,add};

//console.log(minus(3,4));

//module.exports = add ;

/*
add.prototype.kill = function (){
return 0;
}
*/

