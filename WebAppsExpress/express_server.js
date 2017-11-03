var express = require('express');

var app = express();


// app.method(url_regex, optional funcs, handler_function);
// get post put delete
// get is the default case 


// users or user 
app.get("/user[s]?/:userid", function(req, res){
    res.end("You asked for user: " + req.params.userid); 

});

app.get("*", function(req, res){
    res.end("Hello world, EXPRESS STYLE")
});

app.listen(8080); 