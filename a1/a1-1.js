
(function () {
    var counter = 1;
console.log('inside closure');
console.log(counter);
    return (counter += 1)
    console.log(counter);
})();

/*
// 1

(function (){
  var n =100;
  console.log(n)
})();

// 2

function relas(name){
  this.name = name;
  this.age = 6;
}
var kids = new relas('Trump');
console.log(kids.name);
console.log(kids.age);

// 3

var t= 100;
try {
	console.log('hahahahahah');
}catch(e){
console.log(e);
}
// 4

['sawer','witch','wolf'].forEach (function(u){
	console.log(u);
} )

// 5
var n = [1,2,3];


var numbers = n.map(function(k){
  return k*2;
});
console.log(numbers);


//6

var string = '{"fees":"high","func":"kills"}';
var obj = JSON.parse(string);
console.log(obj);

// 7

var obj = {'fees':'great'};
console.log(
    JSON.stringify(obj)
);

// 8

var t =1000;
try
{
if(t=1000) throw "new things here can be here";
}
catch(e){
	console.log(e);
}

*/
