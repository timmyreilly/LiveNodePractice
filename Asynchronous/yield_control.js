// yield control

var arrays = require('./arrays.js');

setTimeout(function () {
    console.log("YO YO YO!")
}, 3000);

// function intersect(arr1, arr2) {

//     var intersection = [];

//     for (var i = 0; i < arr1.length; i++) {
//         for (var j = 0; i < arr2.length; j++) {
//             if (arr2[j] == arr1[i]) {
//                 intersection.push(arr2[j]);
//                 break;
//             }
//         }
//     }
//     return intersection;
// }

// can't call the three second because interect it being a hog, 
// but we can politely yield control
// 

// console.log(intersect(arrays.arr1, arrays.arr2).length);

// process.nextTick(callback);

// setImmediate(callback); 

// These Functions yield control


function intersect2(arr1, arr2, callback) {

    var intersection = [];

    var i = 0;

    function sub_compute_intersection() {
        for (var j = 0; i < arr2.length; j++) {
            if (arr2[j] == arr1[i]) {
                intersection.push(arr2[j]);
                break;
            }
        }


        if (i < arr1.length) {
            i++;
            if (i % 1000 ==0) console.log(); 
            setImmediate(sub_compute_intersection());
        } else {
            callback(intersection);
        }

    }

    sub_compute_intersection(); 
}

intersect2(arrays.arr1, arrays.arr2, function (results){
    console.log(results.length); 
}); 



// next tick is better for sequential tasks

function process_step1(params){
    // do some stuff

    process.nextTick(process_step2);
}

function process_step2(asFasd){
    process.nextTick(process_step3); 
}

// very useful for sequential stuff for yielding control 