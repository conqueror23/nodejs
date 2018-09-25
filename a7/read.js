var fs = require('fs');

fs.readFile('mocha.js','utf8',function(err,content){
  if(err){
    console.log(err);
  }
  else{
    console.log(content);
  }

})
