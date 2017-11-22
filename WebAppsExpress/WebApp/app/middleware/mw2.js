var express = require('express'),
    morgan = require("morgan"),
    multer = require("multer");

var app = express();

// to test in curl: 
// curl -i -H "Expect:" --form 'file_to_upload=@test.php' --form file_info=hellothere http://localhost:8080/uploadtest

app.use(morgan("dev"));

var upload = multer({ dest: "uploads/" });

app.post("/uploadtest", upload.single('file_to_upload'), function (req, res) {

    console.log(JSON.stringify(req.body, 0, 2));

    res.end(JSON.stringify(req.file, 0, 2) + "\n");
});





app.listen(8080);
