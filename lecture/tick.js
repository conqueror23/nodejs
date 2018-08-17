var foo = (function() {
              var tick = "tick";
              return function() { console.log(this, tick); };
 })();

foo();    // the default ‘this’ which is window object

var myObj = {my: "object"};
foo.call(myObj);      //‘this’ is myObj

var yourObj = {your: "object"};
foo.apply(yourObj);  //‘this’ is yourObj


