
var g = [];
for (var i =0;i<5;i++){
	var func = function (){
		console.log(i);
	}
	g.push(func);
}

//console.log(i);
//console.log(g[1]());