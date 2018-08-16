/*task 1 library prediction
It can be concluded from those case study that what future library requires are a centralized facility that contains multi-media types of data all stored in oneunit that can be searched and classified in different classes. Most importantly,copy rights are protected by grant hiearchical access ability to different groups of users.

// prediction of 10 years
Libraries in 10 years is going to like to be complete to transform all data thathave ever existed paper formed document into digital copy with great search engines.
*/
// task 2

console.log('1 closure');
var n =100;
(function (){
  console.log(n)
})(n);

console.log('2 inherirt');

function raletives(name){
  this.name = name;
  this.age = 60;
  this.cites ='this is inherirted from raletives';
}
raletives.prototype.getName= function (){
  return this.name;
}

var sister = new raletives('joe');
console.log(sister.getName());
console.log(sister.age);
console.log(sister.cites);
//sister.call({age:'200'});
console.log(sister.age);



// 2-1

/*
function bro (){};
bro.prototype = new raletives();
// save bro prototype under raletives class
var bro = new raletives('kate');
console.log(bro.age);
//console.log(bro.eat);
console.log(bro.name + 'is ' + bro.age);
//bro instanceof raletives;
//bro instanceof sister;
*/

// 2-1-1
/*


function bro (){};
bro.prototype = new raletives();
// save bro prototype under raletives class

var bro = new raletives();

bro.prototype.cites = 'this is bros private things';
console.log(bro.cites);
//console.log(bro.age);
console.log(bro.eat);

console.log(bro.name + 'is ' + bro.age);
//bro instanceof raletives;

//bro instanceof sister;
*/


//tonys verision

/*

function Dog(name){
    this.name=name;
//console.log(this.name)
};
Dog.prototype.color = 'black';
var dog1 = new Dog('Ted');
var dog2 = new Dog('Tom');
console.log(dog1.name+' is '+dog1.color )
console.log(dog2.name+' is '+dog2.color )

function Cat(){};
Cat.prototype = new Dog('cc');
var cat1 = new Cat();
console.log(cat1.name+' is '+cat1.color)
*/



console.log('3 try-catch');

var t= 100;
try {
	//a();
	console.log('in try proces');
}catch(e){
	console.log(e);
	console.log('in catch process');
}

console.log('4  foreach');


//var k  = {a:'e',b:'bs',c:'cd'};
//k.keys(k);

[1,3,4].forEach (function(u){
	console.log(u);
} )

console.log('5 filter map');

var numbers = [1,3,4,23,4,5];

var map = numbers.map(function (n){
return n*2;
});

//[1,3,4,2,5,2,1,3].map(function (d){
//	 console.log(d*2);
//})

/*
var d = {a:'c',d:'k'};
console.log(d);

*/
//forEach(i in d){
//	console.log(i+':'+d);
//}

// 5 filtermap



console.log('6  json.parse');
var string = '{"key":"value","bolong":"kings"}';
var obj = JSON.parse(string);
console.log(obj);



console.log('7 json stringify');

// converting json object to string

var obj = {'key':'value'};
console.log(
    /* define stringify */
JSON.stringify(obj)
);


console.log('8 throwing errors');
// throw has to be use with try and catch in the same time
var t =1000;
try
{
if(t=1000) throw "new things here can be here";
}
catch(e){
	console.log(e);
}


//vice versa

// tonys version

/*

var message = 5
try{
    if(message==5) throw "is correct";
    if(message < 5) throw "is low";
    if(message >5 ) throw "is high";
}catch(e){
    console.log(e)
}
*/



// add new to existing json object
//obj.a == ‘b’; // true
//var exjson = {'key':'value'};
//define key value
 //exjson.key2 = '...abc...';
//define another key value
 //exjson[key] = '...xyz...';

/*
function father(){};

fathter.prototype = new raletives();

father.prototype.type = 'domestic';

var a = 'woot';
a= "new things here";

var b = new String('woot');

console.log(a+b);
*/
