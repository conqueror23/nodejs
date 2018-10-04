
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

var n =0;
var ans =0;
// array used to record man and the food pacakge
var arr1 =[];
// array used to record nubmers of different kind of package
var token =[];
rl.on('line',function(line){
  if(n==0){
     arr1 = line.split(' ');
     if(line.length == 0){
       console.log('non input try again');
       n = 0;
       rl.close();
     }
     if(parseInt(arr1[0])>parseInt(arr1[1])){
       console.log(0);
        n = 0;
        rl.close();
     }
    n = 1;
  }else if(n ==1){
     token = line.split(' ');
     if( token.leng<parseInt(arr1[1])){
       n = 0;
     }
    n = 2;
  }else {
    var token_cal = token.sort();
    max_range = arr1[0];
    length = arr1[1];
    nth_max =length-max_range;
    console.log(token[nth_max]);
    n=0;
  }

})
