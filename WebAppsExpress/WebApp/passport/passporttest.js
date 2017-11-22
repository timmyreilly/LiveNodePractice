var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    flash = require('express-flash');


var app = express();

app.use(flash());
app.use(session({
    secret: "cat on keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser("cat on keyboard"));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// 1. store user names and passwords

var user = {
    "id123": {id: 123, username: "marcwan", password: "boo"},
    "id1": {id: 1, username: "admin", password: "admin" }
}

passport.use(new LocalStrategy(
    function(username, password, done){
        for (userid in users){
            var user = users[userid];
            if(user.username.toLowerCase() == username.toLocaleLowerCase()){
                if(user.password == password){
                    return done(null, user);
                }
            }
        }
        return done(null, false, { message: "Incorrect credentials" }); 
    }
));
// 2. Configure passport-local to validate an incoming username + pw
// 3. Serialize users
// 4. de-serialise user 

