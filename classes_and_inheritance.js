function Shape(){
    this.X = 0; 
    this.Y = 0; 

    this.move = function(x, y){
        this.X = x;
        this.Y = y; 
    }

    this.distance_from_origin = function(){ 
        return Math.sqrt(this.X * this.X + this.Y * this.Y); 
    }
}

var s = new Shape(); 
s.move(10, 10); 
console.log(s.distance_from_origin());

// functions carry around their own scope. 

// we can create instances of functions and we can 
// way to store member variables with this.X 
// uppercase letter for the name of classes 


// PROTOTYPICAL INHERITANCE 

function Shape2() {}

Shape2.prototype.X = 0; 
Shape2.prototype.Y = 0; 

Shape2.prototype.move = function(x, y){
    this.X = x; 
    this.Y = y; 
}

Shape2.prototype.distance_from_origin = function(){
    return Math.sqrt(this.X*this.X + this.Y*this.Y); 
}

Shape2.prototype.area = function(){
    throw new Error("Need a 2d form"); 
}

var s = new Shape2();
s.move(10, 10); 
console.log(s.distance_from_origin()); 


function Square() {
}

Square.prototype = new Shape(); 
Square.prototype.__proto__ = Shape.prototype;  // Get the functionality from the base Shape Class. 
// Prototypical inheritance in JavaScript. __proto__ is the way to go supposedely. 

Square.prototype.Width = 0; 

Square.prototype.area = function(){
    return this.Width * this.Width;
}

var sq = new Square(); 
sq.move(5,5); 
sq.Width = 15;
console.log(sq.distance_from_origin()); 
console.log(sq.area()); 

// One further level of inheritance

function Rectangle(){
}

Rectangle.prototype = new Square();
Rectangle.prototype.__proto__ = Square.prototype;
Rectangle.prototype.Height = 0; 

Rectangle.prototype.area = function(){
    return this.Width * this.Height; 
}

var re = new Rectangle();
re.move(-5, -5); 
re.Width = 15;
re.Height = 2;


console.log(re.area()); 
console.log(re.distance_from_origin()); 

console.log(sq instanceof Square);      // true 
console.log(sq instanceof Shape);       // true
console.log(sq instanceof Rectangle);   // false 
console.log(re instanceof Square);      // true 
console.log(re instanceof Shape);       // true 






