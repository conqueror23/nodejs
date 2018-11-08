function show(a,n){
   return a*n;

}
var kill = function (t){
    return (100*t);
}


var promise1 = new Promise(function(resolve, reject) {
    resolve(show(2,4));
    reject(kill(3));
  });
  
  promise1.then(function(data) {
      console.log(data);
    // expected output: "Success!"
  });
  