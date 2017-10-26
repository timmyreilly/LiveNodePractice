var http = require("http");

function process_request(req, res){
    console.log("Incoming Request: " + req.method + " " + req.url); 

    res.writeHead(200, {'Content-Type': 'application/json'}); 

    res.end(JSON.stringify({err: null, data: {}})); 
}

var s = http.createServer(process_request); 

s.listen(8080); 