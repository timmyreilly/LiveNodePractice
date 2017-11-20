var express = require("express");
var fs = require("fs");
var path = require("path"); 
var album_mgr = require('./handlers/album_mgr.js'); 

var app = express();

// /v1/albums.json -- Return all albums
// albums/*NAME*.json -- return list of files 

// content/something.ext 
// templates/some_file.html
// page/some_page_name/{optional_junk}

// err, albumList

app.get("/v1/albums.json", album_mgr.album_list); 
app.get("/v1/albums/album_name.json", album_mgr.load_album);
app.get("/content/:file_name", function(req, res){
    serve_static_file("content/" + req.params.file_name, res); 
});
app.get("/templates/:file_name", function(req, res){
    serve_static_file("templates/" + req.params.file_name, res); 
});
app.get("/pages/:page_name", serve_page); 
app.get("*", function(req, res){
    send_failure(res, 404, { code: "no_such_page", message: "No such page" });
}); 
    




app.listen(8080, function () {
    console.log("running!")
});

// want to add an API to get a list of all the albums on the server. 
// write a function called load album list


function serve_static_file(filename, res) {
    console.log(filename);

    var rs = fs.createReadStream(filename);
    var ct = content_type_for_path(filename);

    res.writeHead(200, { "Content-Type": ct });


    rs.on(
        "error",
        (err) => {
            res.writeHead(404, { "Content-Type": "application/json" });
            var out = { error: "not_found", messsage: "'" + filename + "' was not found" };
            res.end(JSON.stringify(out) + "\n");
        }
    );

    rs.pipe(res); 
}

function serve_page(req, res){
    var page = req.params.page_name; 

    fs.readFile('basic.html', (err, contents) => {
        if(err){
            send_failure(res, 500, err);
        } else {
            contents = contents.toString('utf8'); 
            contents = contents.replace('{{PAGE_NAME}}', page);
            res.writeHead(200, {"Content-Type": "text/html" }); 
            res.end(contents); 
        }
    })
}

function content_type_for_path(filename) {
    var ext = path.extname(filename);
    switch (ext.toLowerCase()) {
        case '.js': return "application/json"; 
        case '.html': return "text/html";
        case '.css': return "text/css";
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return "text/plain";
    }
}


function make_error(code, msg) {
    var e = new Error(msg);
    e.code = code;
    return e;
}

function make_resp_error(err) {
    return JSON.stringify({ code: (err.code) ? err.code : err.name, message: err.message });
}

function send_success(res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + '\n');
}

function send_failure(res, server_code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(server_code, { "Content-Type": "application/json" });
    res.end(make_resp_error(err));
}