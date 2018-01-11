
// working with spawn function

var spawn = require('child_process').spawn; 

if(process.argv.length < 3) {
    console.log("Do what now"); 
    process.exit(-1); 
}

function spawn_node() {
    var node = spawn("node", process.argv.slice(2)); 
    node.stdout.on("readable", function() {
        var d = node.stdout.read();
        console.log("STDOUT: " + d.toString("utf8"));
    });
    node.stderr.on("readable", function() {
        var d = node.stderr.read(); 
        console.log("STDERR: " + d.toString("utf8")); 
    });

    node.on("exit", process_exited); 
}

function process_exited() {
    console.error("Unexpected exit. restarting"); 
    spawn_node(); 
}

spawn_node(); 