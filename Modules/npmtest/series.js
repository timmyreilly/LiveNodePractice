var async = require('async'); 

async.series([
    function(cb){
        setTimeout(() => {
            cb(null, [1, 2, 3]);
        }, 1000 );
    },
    function(cb){
        setTimeout(()=> {
            cb(null, ["a", "b", "c"]); 
        }, 2000); 
    }
], function(err, results){
    console.log(err); 
    console.log(results); 

});

async.parallel({
    numbers: function(cb){
        setTimeout(() => {
            cb(null, [1, 2, 3]);
        }, 1000 );
    },
    letters: function(cb){
        setTimeout(()=> {
            cb(null, ["a", "b", "c"]); 
        }, 2000); 
    }
}, function(err, results){
    console.log(err); 
    console.log(results); 

});

async.auto({
    numbers: function(cb){
        setTimeout(() => {
            cb(null, [1, 2, 3]);
        }, 1000 );
    },
    letters: function(cb){
        setTimeout(()=> {
            cb(null, ["a", "b", "c"]); 
        }, 2000); 
    },
    assemble: ['numbers', 'letters', (thus_far, cb) => {
        cb(null, {
            numbers: thus_far.numbers.join(', '),
            letters: "'" + thus_far.letters.join("', '") + "'"
        });
    }],

}, function(err, results){
    console.log(err); 
    console.log(results); 

});


// for loops while loops with asynchronous code
/*

var only_dirs = []; 
async.forEachOfSeries(
    files, 
    (element, cb) => {
        fs.stat("albums/" + files[index], (err, stats) => {
            if(stats.isDirectory()){
                only_dirs.push(files[index]); 
            }

            cb(null); 
        });
    },

    function(err){

    }
)

*/ 