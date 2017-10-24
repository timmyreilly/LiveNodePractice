
var aa1 = new Array();

// The way to do it: 
var arr2 = []; 

arr2.length 

typeof arr2; 

console.log(Array.isArray(arr2)); 

var arr3 = ['car', 'mat', 'hat']; 

arr3.length

for (var i=0; i < arr3.length; i++){
    console.log(arr3[i]);
}
arr3[arr3.length] = 'bat'; 

arr3.push('splat'); 

console.log(arr3); 

arr3[12] = 'fat';
// Will get undefined values

console.log(arr3); 

delete arr3[2];

console.log(arr3); 

console.log(arr3.splice(2,2));

console.log(arr3); 

var nums = [1,2,3,4,5,6];

nums.length

nums.push(111); 
nums.pop();

console.log(nums);

nums.unshift(-10);

console.log(nums);

nums.shift(); 

console.log(nums);

[1,2,3,4,5,6].join(":"); 

var jumble_nums = [3,1,8,6,2,1];

jumble_nums.sort(); 

var names = ['marc', 'Maria', 'Alfred', 'zumbu']; 

console.log(names.sort());

names.sort(function(a, b){
    var a1 = a.toLowerCase(), b1 = b.toLowerCase();
    if (a1 < b1) return -1; 
    if (a1 > b1) return 1
    return 0; 
});

console.log(names); 

names.forEach(function(value){
    console.log(value); 
})
