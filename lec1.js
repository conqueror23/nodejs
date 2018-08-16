var foo = (function (){
  var tick ='tick';
  return function (){
    console.log(this,tick);
  };
})();

//foo();

var obj = {my:"object "};
foo.call(obj);

var yourobj = {you:"object"};
foo.apply (yourobj);
