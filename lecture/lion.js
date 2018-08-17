var animal ={move:true};
var lion = {attacks : true};

console.log(animal);


lion.__proto_ = animal;

function Lion (name){
this.name = name;
}

Lion.prototype =animal;
lion1 = new Lion('kate');
console.log(lion1.move);

