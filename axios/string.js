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

// a more simple way is to use split and forEach method to complete that task

var str3 = 'this is not a funny story';
var arr3 = str3.split(' ');
var str3_1 ="";
var arr3_1 = [];

arr3.forEach(function(element){
  for(var n3=element.length-1;n3>=0;n3--){
    console.log(element[n3]);
     str3_1 +=element[n3];
  }
  str3_1 +=" "
})

var str3 = arr3.map(function(str){
  for(var n3=str.length-1;n3>=0;n3--){
    str3_1+=str
  }
})

// 2 4
var str4 ='justin'; //jtsuin
function rel(str,a,b){
      c1=str[a-1]; //u
      c2=str[b-1]; //t
     return str.substr(0,a-1)+c2+str.substr(a,b-a-1)+c1+str.substr(b)
}
var str1 = rel(str4,2,4)

n = str[4];
str4[1] = str4[4]
