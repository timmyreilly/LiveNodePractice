// globals

console.log("asdfasdf");

// Couple globals not standardized only Node supported:

// window object - global execution context not available in Node. 
// global object is the one we're looking it for that

global.fish = "gold";

global.pet = "cat";

function print_a_global(name){
    console.log(global[name]); 
}

print_a_global("fish"); 

print_a_global("pet"); 

// Current execution environment process.exit(-1); 

// process.exit(-1); 

console.log(process.env.HOME); 

// New Innovations

// From...
var x = function(a, b) { return a + b; }

// arrow function to simplify syntax

var x = (a, b) => a + b; 

x(4,5); 

// before the arrow is the parameter list, after the value is the return 

var x = (a, b) => { return a + b; }

// arrow syntax is a little easier to see. 
// holds an extremely property with the this pointer. 

// for..of loop???
// particularly useful for iterable objects. Arrays are iterable. 

var x = [1, 2, 3, 4, 5]

for (idx in x){
    console.log(x[idx]);
}

// yay iterables! for of's are neat!

for (value of x){
    console.log(value); 
}

