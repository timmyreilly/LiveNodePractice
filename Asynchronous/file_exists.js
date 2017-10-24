// Oddity

var fs = require('fs'); 

function FileObject() {
    this.filename = '';

    // (err, boolean)
    this.file_exists = function(callback){
        console.log("About to open: " + this.filename); 
        fs.open(this.filename, 'r', function(err, handle){
            if(err){
                console.log("Can't open: " + this.filename); // this filename member variable isn't there. 
                callback(err);
                return; 
            }

            fs.close(handle);
            callback(null, true); 
        });

    }
}

// use this class

var fo = new FileObject();
fo.filename = "Somthing that doens't exit";

fo.file_exists((err, exists) => {
    if(err){
        console.log("error opening file: " + JSON.stringify(err)); 
        return; 
    }
}); 

// can't open undefined??

// should print out the same file name... what has gone wrong. 
// this is the most subtle things to understand. 
// these functions that we're passing to node are actually closures have a specific scope. 
// javascript captures that scope. 

// 'this' is not included in the scope. 
// have the incapsulating scope. 

function FileObject() {
    this.filename = '';
    // (err, boolean)
    this.file_exists = function(callback){
        var self = this; 
        console.log("About to open: " + self.filename); 
        fs.open(this.filename, 'r', function(err, handle){
            if(err){
                console.log("Can't open: " + self.filename); // this filename member variable isn't there. 
                callback(err);
                return; 
            }

            fs.close(handle);
            callback(null, true); 
        });

    }
}

fo.file_exists((err, exists) => {
    if(err){
        console.log("error opening file: " + JSON.stringify(err)); 
        return; 
    }
}); 

// saved the this pointer in self. This is actually a slightly contrived problem. 
// var self = this; 
// they seem to save the this pointer. This solves the closure and encapsulation 
// we have this new arrow functions that make this a little easier.. Arraow functions...
// Arrow functions solve this problem! 


function FileObject() {
    this.filename = '';

    // callback: (err, boolean)
    this.file_exists = function(callback){
        console.log("About to open: " + this.filename); 
        fs.open(this.filename, 'r', (err, handle) => {
            if(err){
                console.log("Can't open: " + this.filename); // this filename member variable isn't there. 
                callback(err);
                return; 
            }

            fs.close(handle);
            callback(null, true); 
        });

    }
}

fo.file_exists((err, exists) => {
    if(err){
        console.log("error opening file: " + JSON.stringify(err)); 
        return; 
    }
}); 