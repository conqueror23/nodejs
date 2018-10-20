
function fibo(n){
	if(n<2)
		return 1;
	else
		return fibo (n-2)+fibo(n-1);
}



console.time('timer');
setTimeout(function (){
	console.timeEnd('timer');
},1000)


fibo(44);
