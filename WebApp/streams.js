// streams
// streamable

var fs = require('fs'); 

var contents = ''; 

var rs = fs.createReadStream("test.txt"); 


// Event handlers are ready to go. 
rs.on(
    "readable",
    () => {
        var str; 
        var d = rs.read();
        if(d){
            if(typeof d == 'string'){
                str = d; 
            } else if (typeof d == 'object' && d instanceof Buffer) {
                str = d.toString('utf8', 0, d.length); 
            }

            if(str) { 
                contents += str; 
            }
        }
    }
)

rs.on(
    "end",
    () => {
        console.log("Read in the file contents: ");
        console.log(contents.toString('utf8')); 
    }
)

rs.on(
    "error", 
    (err) => {
        console.log("error is: " + JSON.stringify(err)); 
    }
)