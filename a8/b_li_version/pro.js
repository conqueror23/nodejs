var promise = require('promise');

var promise1 = new Promise(function(resolve,reject){
  // setTimeout(function (){
  //   resolve('job');
  // },400);
  var a=3,
  b=4;
  resolve(a+b);
  reject(a-b);
  })

promise1.then(function (value){
  console.log(value);
})
console.log(promise1);
