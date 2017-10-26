var http = require("http");
var fs = require("fs");

// albums.json -- Return all albums

// albums/*NAME*.json -- return list of files 

// err, albumList
function load_album_list(callback) {
    fs.readdir("albums", (err, files) => {
        if (err) {
            callback(err);
        } else {
            var only_dirs = [];

            var iterator = (index) => {
                if (index == files.length) {
                    callback(null, only_dirs);
                    return;
                }

                fs.stat('albums/' + files[index], (err, stats) => {
                    if (stats.isDirectory()) {
                        only_dirs.push(files[index]);
                    }

                    iterator(index + 1);
                });
            };

            iterator(0); 
        }
    });
}

function load_album(album_name, callback){
    fs.readdir("albums/" + album_name, (err, files) => {
        if(err){
            if(err.code == "ENOENT"){
                callback(make_error("no_such_album", "That album does not exist")); 
            } else {
                callback(make_error("cant_load_photos", "The server is broken."));
            }
        } else {
            var only_files = []; 

            var path = `albums/${album_name}/`;

            var iterator = (index) => {
                if (index == files.length){
                    var obj = { short_name: album_name, photos: only_files }; 
                    callback(null, obj); 
                    return; 
                }

                fs.stat(path + files[index], (err, stats) => {
                    if (!err && stats.isFile()){
                        only_files.push(files[index]); 
                    }

                    iterator(index+1); 
                });
            };

            iterator(0); 
        }
    });
}

function handle_incoming_request(req, res) {
    console.log("Incoming Request: " + req.method + " " + req.url);

    if (req.url == '/albums.json'){
        load_album_list((err, albums) => {
            if (err){
                res.writeHead(500, { "Content-Type" : "application/json" }); 
                res.end(JSON.stringify({ code: "cant_load_albums", message: err.message })); 
            } else {
                var output = { err: null, data: {albums: albums} };
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(output) + '\n'); 
            }
        });
    } else if (req.url.substr(0, 7) == '/albums' && req.url.substr(req.url.length - 5) == '.json'){
        // user is requesting contents of an album
        load_album(req.url.substr(7, req.url.length - 12), (err, photos) => {
            if(err){
                res.writeHead(500, { "Content-Type": "application/json"});
                res.end(make_resp_error(err));
            } else {
                var output = { error: null, data: photos };
                res.writeHead(200, {"Content-Type": "application/json"}); 
                res.end(JSON.stringify(output) + '\n'); 
            }
        });
    } else {
        res.writeHead(404, {"Content-Type" : "application/json"}); 
        res.end(JSON.stringify({code: "no_such_page", message: "No such page"})); 
    }
}

var s = http.createServer(handle_incoming_request);

s.listen(8080, function () {
    console.log("running!")
});

// want to add an API to get a list of all the albums on the server. 
// write a function called load album list


function make_error(code, msg){
    var e = new Error(msg);
    e.code = code; 
    return e; 
}

function make_resp_error (err){
    return JSON.stringify({ code: err.code, message: err.message }); 
}