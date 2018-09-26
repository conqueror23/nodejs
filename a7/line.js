var readline = require('readline'); //builtin packages

var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});


rl.question('how readline works in nodejs?',(line)=>{
  if(line== 'it'){
    rl.question('date?',(con)=>{
      console.log('is your data '+con);
    })
  }else{
    console.log('you have reached unrelavent domaines');
    rl.close();
  }

});



//
// rl.on('pause',()=>{
//   console.log('have not hearing from you for long times $new')
// })
//
// rl.on('resume',()=>{
//   console.log('input resumes and you got the final ways')
//   rl.close();
// })
