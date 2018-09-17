var a =0;



function c(){

a++;
var fun1 =function (){
  console.log('fun1 inside function c');
}
fun1();
  return a;
}



var aIndex = "a".charCodeAt(0); // 97
console.log('aIndex :'+aIndex);
var alphabet = "";
for (var i = 0; i < 26; i++) {
    alphabet += String.fromCharCode(aIndex + i);
}
console.log(alphabet); // "abcdefghijklmnopqrstuvwxyz"

var random = "";

for (var i = 0; i < 8; i++) {
    random += String.fromCharCode(Math.floor(Math.random() * 26)+ aIndex);
}
console.log(random); // "bdwvfrtp" (different result each time)
//
// function c(){
// a++;
// var fun1 =function (){
//   console.log('fun1 inside function c');
// }
// fun1();
//
//   return a;
// }
 c();
 // console.log(c());
// console.log(c());
// console.log(fun1);
