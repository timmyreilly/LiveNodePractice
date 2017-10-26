var http = require("http");
var fs = require("fs");

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



function handle_incoming_request(req, res) {
    console.log("Incoming Request: " + req.method + " " + req.url);


    load_album_list((err, albums) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ code: "cant_load_albums", message: err.message }));
        } else {
            var output = { error: null, data: { albums: albums } };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(output) + '\n');
        }
    })

}

var s = http.createServer(handle_incoming_request);

s.listen(8080, function () {
    console.log("running!")
});

// want to add an API to get a list of all the albums on the server. 
// write a function called load album list