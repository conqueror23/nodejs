function nee(name,age){
  this.name = name;
  this.age = age;

}
nee.prototype.toString = function (){
  return "[nee" +this.name + "]";
}
nee.prototype.askage = function (){
  return nage = this.age
}
var k =new nee('jack ',23);

console.log(k.name);

// var k = new nee('jack',23);
// k.__proto__ == nee.prototype;
// console.log(k['name']);
// console.log(nee['k']);
// console.log(k.toString);
// console.log(k.name);
// console.log(this.name); // undefined in strict mode
// console.log(this.age);

// var j = {1,2};
// //console.log(j);
// console.log(typeof j);
