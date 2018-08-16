console.log('form module a');

exports.number =66;

console.log(exports.number);




function add(a,b){
	var sum = a+b;

}
module.exports = add;

function minus(a,b){
	var sum = a+b;

}
module.exports = minus;



console.log('this number is indside module a');
