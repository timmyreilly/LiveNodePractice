var greeter = require('./greeter.js');

greeter.helloworld(); 

console.log(greeter.tim.one); 

var g = greeter.create_greeter('fr'); 
console.log(g.greet()); 