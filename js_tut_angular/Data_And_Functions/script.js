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