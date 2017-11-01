exports.helloworld = function () {
    console.log("hello world");
}

exports.tim = {
    'one': 1,
    'two': 2
}

function Greeter(lang) {
    this.language = lang;

    this.greet = function () {
        switch (this.language) {
            case 'en': return 'hello';
            case 'fr': return 'bonjour';
            case 'it': return 'Ciao';
            default: return "Don't speak that sorry";
        }
    };
}

exports.create_greeter = function (lang) {
    return new Greeter(lang);
}

// factory model ^ 

// Another way of doing object creation. 
// The module is the class itself. 

// Constructor method - create instances of those clsses. 

// module.exports = Greeter; 

// var g = new Greeter('it');  

// Both equally valid in their own way. Factory + Constructor 