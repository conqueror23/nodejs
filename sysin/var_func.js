// function guess() {
// 	fun1(); 
// 	fun2(); 
// 	var fun1 = function () { 
// 		alert("is foo run?");
// 	}
// 	function fun2() { 
// 		alert("is bar run?");
// 	}
// }
// guess();


k();

t();

// k is a variable that saved with a function but the nature of k is still a variable you need to defined it first 
var k = function (){
    display();
}

function display() {
    console.log('this is a function ?');
}

function t(){
    console.log('this is inside fucntion t which is really a function not jst');
}
