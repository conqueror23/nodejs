// var a = module('inp.js');
// console.log(a);


// testing for closure in js

//
// (function (k){
//   var kk = '55'+k;
//   console.log(kk);
// }(22));

//
// (function (k){
//   var kk = '55'+k;
//   console.log(kk);
// })(22);

//1-16
// var k=0;
// while (k<16)
// {
//       k++;
//       (function (i) {
//       setTimeout ( function ()  {
//                                    console.log(i);
//                               } , 1 );
//       } (k));
// }

//debug
// var z = 9;
// console.debug(z);
// function print_z(){
//     console.debug(z);
// }
// (function(){
//     var z = 7;
//     console.debug(z);
//     print_z();
// })();

//this example in nodejs
var tick ='outside the fucntion';
var foo = (function() {
              var tick = "tickect";
              return function() { console.log(this,tick); };
 }());

foo();    // the default ‘this’ which is window object

var myObj = {my: "object"};
foo.call(myObj);      //‘this’ is myObj

var yourObj = {your: "object"};
foo.apply(yourObj);  //‘this’ is yourObj
