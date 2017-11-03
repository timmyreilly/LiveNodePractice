var http = require('http'),
    fs = require('fs'), 
    path = require('path'); 


function handle_incoming_request(req, res){
    if (req.method.toLowerCase() == 'get' && req.url.substring(0,9) == '/content/'){
        serve_static_file(req.url.substring(9), res); 
    } else {
        res.writeHead(404, { "Content-Type" : "application/json"}); 

        var out = { error: "not_found", message: "'" + req.url + "'not found."};

        res.end(JSON.stringify(out) + "\n"); 
    }
}

function serve_static_file(filename, res){
    console.log(filename); 

    var rs = fs.createReadStream(filename);
    var ct = content_type_for_path(filename);
    
    res.writeHead(200, {"Content-Type" : ct}); 

    rs.on(
        "readable",
        () => {
            var d = rs.read(); 
            if(d){

                var str_to_write; 
                if(typeof d == "string"){
                    str_to_write = d;
                } else if (typeof d == 'object' && d instanceof Buffer){
                    str_to_write = d.toString('utf8'); 
                }

                if(!res.write(str_to_write)){
                    rs.pause();
                }
            }
        }
    );

    rs.on(
        "end",
        () => {
            res.end(); 
        }
    );

    rs.on(
        "drain",
        () => {
            rs.resume(); 
        }

    );

    rs.on(
        "error",
        (err) => {
            res.writeHead(404, { "Content-Type" : "application/json"}); 
            var out = {error: "not_found", messsage: "'" + filename + "' was not found"};
            res.end(JSON.stringify(out) + "\n"); 
        }
    ); 
}

function content_type_for_path(filename){
    var ext = path.extname(filename); 
    switch(ext.toLowerCase()) {
        case '.html': return "text/html";
        case '.css': return "text/css";
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return "text/plain";
    }
}

var s = http.createServer(handle_incoming_request);
s.listen(8080, ()=> {
    console.log('Lets go'); 
})