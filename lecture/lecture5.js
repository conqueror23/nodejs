function makeF(){
	var fun =[];
	for(var i=0;i<5;i++){
	var func = function(){
	console.log(i);
	}
	fun.push(func);
	}
	return fun
}

var fun1 =makeF();
var   a = fun1[3]
a();

