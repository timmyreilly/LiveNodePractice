var http = require("http");

var qs = require('querystring');

/*
<form action='/resorce/url' method='post'>
username=tim&password=not_ver_secret&happy=dog
*/

function handle_incoming_request(req, res) {
    console.log("Incoming Request: (" + req.method + ") " + req.url);

    var json_data = '';

    req.on(
        "readable",
        () => {
            var d = req.read();
            if (typeof d == 'string') {
                json_data += d;
            } else if (typeof d == 'object' && d instanceof Buffer) {
                json_data += d.toString('utf8');
            }
        }
    );

    req.on(
        "end",
        () => {
            var output = '';
            if (!json_data || json_data.length == 0) {
                output = "I don't have any JSON";
            } else {
                var json;
                try {
                    json = JSON.parse(json_data);
                } catch(e) {

                }

                if (!json){
                    output = "Invalid JSON";
                } else {
                    output = "I received valid JSON: " + json_data
                }
            }

            res.end(output); 
        }
    );
}

var s = http.createServer(handle_incoming_request);

s.listen(8080, function () {
    console.log("Lets do this");
})