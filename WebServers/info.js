var http = require('http');

function handle_incoming_request(req, res) {
    console.log("=--------------------------------------------------------------------=");
    console.log(req);
    console.log("=--------------------------------------------------------------------=");
    console.log(res);
    console.log("=--------------------------------------------------------------------=");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: null }));
}

var s = http.createServer(handle_incoming_request);     

s.listen(8080, function(){
    console.log("info.js reporting for duty"); 
}); 