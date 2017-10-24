// language constructs 

console.log(234 == '234');

console.log(234 === '234');


'' == false == null == undefined == 0;

null == undefined;

null === undefined;

var x = new Number(234);

today = "cat"; 
var x = today ? "cat" : "dog";
console.log(x);

switch (x) {
    case "asdfa": console.log("1");
    case 2345: break;
    default:
        break;
}

// 

var x = 10, y = 2; 

console.log(x && y); 

// 10 converted to 1010 to 2 to 10 and 

var user = {fn: 'marc', ln:'wan', bd: 'haha now way'}; 

for (key in user){
    console.log(key); 
}