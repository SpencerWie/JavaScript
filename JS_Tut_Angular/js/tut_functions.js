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
$(document).on("shown", ".accordion",function(){ // This is to scroll to the top of the accordion group when shown
    var offset = $(".accordion-body.collapse.in").position().top - 80;
    $("html, body").animate({ scrollTop: offset+"px" });
});