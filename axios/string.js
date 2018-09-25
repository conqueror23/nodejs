// var k =['a','s','d'];
 var k ='shithskljw';
k.forEach(function(element,index){
  console.log(element);
  console.log(index);
})

// console.log(t);
// console.log(i);
// count string
var arr = [];
for(var i=0;i<k.length;++i){
   t = k[i];
   var sum = 0;
   for(var n=0;n<k.length;++n){
     if(t== k[n]){
       sum ++;
     }
   }
   if(sum <=1){
     arr.push(t);
   }
    console.log(sum);
}
console.log(arr);
if(!arr.lenth){
  console.log(arr[arr.length-1]);
}
// with empty space

// reverse strings
var kk = 'abcdefghi';

var kkr = "";
console.log(j);

for(var j =kk.length-1;j>=0;j--){
  kkr=kkr+kk[j];
}

console.log(kkr);

// remove space

var sk = "this is a sentance";

var arr1 = [];
var body ="";

for(var i1 =0;i1<=sk.length;i1++){

  if(sk[i1]!=" "){
    body+= sk[i1];
    console.log(body);
  }else{
    arr1.push(body);
    body = '';
  }
}

//arr1 is the combination of strings reverse all the elements
  var arr2  =[];

  for(var num=0;num<=arr1.length;num++){
    var st = arr1[num];
    console.log(st);
    var stt = "";
    for(var j =st.length-1;j>=0;j--){
      stt=stt+st[j];
    }
    arr2.push(stt);

  }


str2+= " ";


var str2 = '';
for(var num1 =0;num1<arr2.length;num1++){
  str2+=arr2[num1];
  if(num1!=arr2.length-1){
    str2+=" ";
  }
}
console.log(str2);
