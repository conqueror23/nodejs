// use array to complete the tasks

function see(str){
  var str = str.trim();
  for (var i=0;i<str.length-1;i++){
    var arr =[];
    var target = str[i];
    var sum =0;
    for (var n =0;n<str.length-1;n++){
      if(str[n] == target){
        sum ++;

      }
      // console.log(sum);
      arr.push(sum);
    }


  }
  console.log(arr);

}

see('aafsdbghhdkae');
// or you can use other method only record the times that happens ? and link the letter with the time here
