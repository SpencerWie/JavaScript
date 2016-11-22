// BASICS ------------------------------------------------------------------------------------------------------------------------------------------------------------
function helloWorldAlert(){
   alert("Hello World"); 
}
function helloWorldWrite(){
   document.write("<p>Hello World</p>");
   document.write("<p>Notice everything was overwritten? This is a common mistake for begginers using document.write(). You need to make sure to use document.write() <b>before</b> the page is done loading.</p>");
   document.write("<p>This code was written after the page loaded. Everything was wiped and replaced.</p>");
   document.write('<a href="#/TheBasics">Go Back</a>');
}
function helloWorldDOM(){
	document.getElementById("myElement").innerHTML = "Hello World";
}
function resetHelloDom(){
	document.getElementById("myElement").innerHTML = "Test";
}
// END BASICS ------------------------------------------------------------------------------------------------------------------------------------------------------------

// DATA AND FUNCITONS ------------------------------------------------------------------------------------------------------------------------------------------------------------
function arrayChallenge(){
   var array = ["Apple","Banana","Peach","Orange","Cherry"];
   array.sort();
   array.pop();
   array.push("Lemon");
   var newArray = array.slice(1,5);  // [Banana,Cherry,Orange,Lemon]
   alert(newArray);
}
function sayHello(){
   alert("Hello World");
}

function addStuff(x,y){
   var sum = x + y;
   alert(sum); 
}

function giveStuff(x,y){
   var sum = x + y;
   return sum; 
}

function returnEx(){
var theSum = giveStuff(5,10); // addStuff(...) gives a value, 15 in thie case, this would be just like saying: [var theSum = 15;].
alert(theSum);
}

var imGone = "Bye!";
function globalEx(){
alert("Bye!");
alert(imGone); //<-- This works!
}

function input1(){
var name = prompt("What is your name?","Enter name here");
alert("Hello "+name);
}

function input2(){
var num = prompt("Enter a number");
var sum = num + 12;
alert(num+" + 12 = "+sum);
}

function input3(){
var num = prompt("Enter a number");
num = parseInt(num);
var sum = num + 12;
alert(num+" + 12 = "+sum);
}
// END DATA AND FUNCITONS ------------------------------------------------------------------------------------------------------------------------------------------------------------

// BRANCHING ------------------------------------------------------------------------------------------------------------------------------------------------------------
function functionIf_1(){
var x = 5;
if(x == 5){
   alert("x is 5"); // x is 5 => true. So the alert statement will run.
}
}

function functionIf_2(){
var x = 10;
if(x < 10){
   alert("x is less than 10"); // (10 < 10) => false. So the alert statement will not run.
}
alert("End");
}

function functionIf_3(){

	function checkEvenOdd(num){
	   if(num%2 == 0){ // Remember '%' means Modulus (division remainder). If x%2 is 0 it means the number is even.
	      alert(num+" is even");
	   } else {
	      alert(num+" is odd");
	   }
	}

	checkEvenOdd(7); // 7 is odd
	checkEvenOdd(12); // 12 is even
}

function functionIf_4(){
	var time = new Date().getHours(); // time is the current hour of the day from( 0 to 23)
	if(time < 12){
	   alert("Good morning!");    // From mid-night to 11AM. 
	} else if(time <= 16){
	   alert("Good afternoon!");  // From noon to 4PM
	} else if(time <= 20){ 
	   alert("Good evening!");    // From 5PM to 8PM
	} else {
	   alert("Good night!");      // From 9PM to 11PM
	}
}
// END BRANCHING ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

// OOP ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
var c;
var ctx;
function init() {
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");
}

function Ball( X,Y,R,Color ) // Creates a class called "ClassName"
   {
   this.x = X; // Makes a property called: x.
   this.y = Y; // Makes a property called: y.
   this.r = R; // Makes a property called: r ( radius )
   this.color = Color; // Makes a property called: coor.
   
   this.moveTo = function(newX, newY) // Makes a method called: moveTo(newX, newY).
      {
        ctx.fillStyle= "White"; // Clears last drawn ball.
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r+1,0,2*Math.PI);
        ctx.fill(); 
        
        this.x = newX; // Change the x to the new position
        this.y = newY; // Change the y to the new position
        this.draw(ctx);
      }
   this.draw = function(ctx)
      {
        ctx.fillStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();          
      }
   }
   
function Person( name ) // Creates a class called "Person"
   {
   // It's ok to use ( this.name = name ) as JavaScript can tell the difference between the two variables.
   this.name = name; // Makes a property called: name. 
   
   this.sayHi = function() // Makes a method called: moveTo(newX, newY).
      {
         alert("Hello, my name is " + this.name);
      } 
   }

var redBall = new Ball(40,40,25,"Red"); // Creates a red ball from Ball class.
var blueBall = new Ball(200,40,35,"Blue"); // Creates a red ball from Ball class.

redBall.draw(ctx);
blueBall.draw(ctx);

function objEx_1(){
   var person1 = new Person("Spencer");
   var person2 = new Person("Calvin");
   alert( person1.name ); // => "Spencer"
   person1.sayHi(); // => "Hello, my name is Spencer"
   person2.sayHi(); // => "Hello, my name is Calvin"
}
*/
// END OOP ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

// SHARED
$(document).on("shown", ".accordion",function(){ // This is to scroll to the top of the accordion group when shown
    var offset = $(".accordion-body.collapse.in").position().top - 80;
    $("html, body").animate({ scrollTop: offset+"px" });
});
// END SHARED