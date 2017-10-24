// Compare synchrouns and asynchronous

// 2008 or so...

setTimeout(() => {
    console.log("I've done my work");
}, 4000)

// set a 4 second timeout. 

console.log("i'm waiting for everything to finish");

// there was an event pending... 
// now we can finally exit. 

// Let's apply those principles to file operations. 

// fileops 

var fs = require('fs');

var file;
var buf = new Buffer(100000); // 100k 

// fs.open('test.txt', 'r', (err, handle) => {
//     file = handle; 
// });

// fs.read(file, buf, 0, 100000, null, (err, length) => {
//     console.log(buf.toString());
//     fs.close(file, () => {}); 
// });

//async principles - call this function when its done. 

// the problem lies in fs.open function does. 
// you're telling node to open this file. when you're done create the handle. 
// goes and opens the file

// fd must be a file descriptor. 

// fs.read() will get called before we're ready...
// node.js is excited its got things to do. 

// file variable hasn't been called. Start reading from this file before its defined. 

fs.open('test.txt', 'r', (err, handle) => {
    file = handle;
    fs.read(file, buf, 0, 100000, null, (err, length) => {
        console.log(buf.toString());
        fs.close(file, () => { });
    });
});

fs.open('test.txt', 'r', (err, handle) => {
    fs.read(handle, buf, 0, 100000, null, (err, length) => {
        console.log(buf.toString());
        fs.close(handle, () => { });
    });
});

// how to think about it...
// call async, it takes all the parameters and the callback to call it validates it. 
// make sure everything is ready, to continue
// it goes to node core and start the operation 
// pushes the next function onto an event stack. 
// haha i've got it back. 
// pop it off the stack. 
// won't exit because we're still on the stack. 


// Mixed error checking. 

fs.open('test.txt', 'r', (err, handle) => {
    if (err) {
        console.log("Error: " + err.code + " " + e.message);
        return;
    }
    fs.read(handle, buf, 0, 100000, null, (err, length) => {
        if (err) {
            console.log("Error: " + err.code + " " + e.message);
        } else {
            console.log(buf.toString());
            fs.close(handle, () => { });
        }
    });
});