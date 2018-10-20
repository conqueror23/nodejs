var from,to;

var from_array=['a','b'];
var b_array = ['c','d']
var to ='d';
console.log(from_array);
console.log(from_array.length);
var result_array =[];
function find(from_array,to){
  for(var n =0;n<from_array.length;n++){
      var v = 0;
      console.log(from_array[n]);
      if(from_array[n] == to){
        v++;
        //exit
        result_array.push(v);
      }else{
        console.log('next');
        v++;
        
        find(b_array,to);
      }
  }
  // return result_arrary
}
find(from_array,to);

console.log(result_array)

// if(result_array.length>0){
//   var sort =result_array.sort()
//   console.log(result_array);
//   console.log(sort[0]+' is the shortest')
// }else{
//   console.log('no connections');
// }
