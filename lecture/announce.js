//'use strict';

var Person = function (name) {
 this.name = name;
};
Person.prototype.announce = function() {
  console.log(" I am " + this.name);
};
var person1 = new Person("Tim");
var person2 = new Person("Tom");
var announce= person1.announce;
announce();  
//announce.call(person1);
