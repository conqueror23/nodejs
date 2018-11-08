Object.prototype.myFunction = function() {
  var resultArray = [];
  // for (var property in this)
  //   resultArray.push(property);
  // return resultArray;


  //hasOwnProperty to select origin properties
  for (var property in this)
  {
    if (this.hasOwnProperty(property)) 
         resultArray.push(property);
  }
  return resultArray;


};
 
var myObj = {a: 1, b: 2};
console.log(myObj.myFunction());
// do not forget myFunction is a property as well