// functions

function hello(name){
    console.log("Hello there " + name); 
}

hello("marc"); 

hello("Marc", true, 23123, 123123);

function hello2(){
    console.log(arguments); 
}

hello2("Marc", true, 132123, 123123);

function init_cache(){
    var init_data = {
        cache_size: 10, // mb 
        location: "/tmp",
        type: "btree"
    }
    
    var a = arguments; 

    for (var i = 0; i < a.length, a++;){
        if(typeof a[i] == 'number'){
            init_data.cache_size = a[i]; 
        } else if (typeof a[i] == 'object'){
            init_data = a[i]; 
        } else {
            throw new Error("bad params to init_cache"); 
        }
    }

}

// 1 () -- use default values
// 2 (number) -- cache size only
// 3 (object) -- we'll use those instead. 

init_cache(); 
init_cache(100);
init_cache({
    cache_size: 50,
    location: '/var', 
    type: 'avltree'
});  


// The function will intuitively be able to figure out what I want to do. 


// Anonymous function ie. no name: 
var x = function (a, b) { return a + b}
x(2, 3); 

var x = function () { throw new Error("Boo!"); }
// x(); 

// won't be able to give you context or info about what's happening. 

var x = function name_here_instead () { throw new Error("Boo!"); }
// x(); 

// FUNCITON SCOPE

var pet = "cat";

function play_with_pets() {
    var pet = "dog";
    console.log(pet); 
}

play_with_pets();

console.log(pet); 

// does get its own new scope and any variables are private. 
// cool thing to do to work with scratch variables 
// combine anonymous functions with their scopes

var height = 5; 
var radius = 3; 

var volume; 

(function () {
    var pir2 = Math.PI * radius * radius;
    volume = pir2 * height / 3; 
})(); 

console.log(volume); 

// console.log(pir2);  
// is not defined! 
