var b = new Buffer(100000);

var str = "hello world";

b.write(str);

console.log(str.length);
console.log(b.length);  // readable object is different from a buffer. 

console.log(Buffer.byteLength(str)) // if using characters with different byte lengths. 

