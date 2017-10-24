// This try catch block is only valid while setTimeout is called...

// its checking its parameters, you gave it a function to call. and it returns. 
// On my event stack there is something to be done. 

try {
    setTimeout(() => {
        throw new Error("OH NOEESS!!!");
        console.log("I've done my work");
    }, 4000)
} catch (e) {
    console.log("i caught the error: " + e.message);
}
console.log("i'm waiting for everything to finish"); 

// no longer in the context of my try catch block...

// the net result is we can't really use structured handling. 
// new pattern for exception handling. Our callback always has an error passed back. 

do_something(param1, param2, (err, result1, result2)=> {
    if(err != nil){
        // something bad happened
    } else {
        // everything is okay.
    }
}); 

