//$(function(){
  var c;
  var ctx;

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

  function objEx_1(){
     var person1 = new Person("Spencer");
     var person2 = new Person("Calvin");
     alert( person1.name ); // => "Spencer"
     person1.sayHi(); // => "Hello, my name is Spencer"
     person2.sayHi(); // => "Hello, my name is Calvin"
  }

  function init() {
    c=document.getElementById("myCanvas");
    ctx=c.getContext("2d");
    redBall.draw(ctx);
    blueBall.draw(ctx);
  }

window.setTimeout(function(){
  c=document.getElementById("myCanvas");
  ctx=c.getContext("2d");
  redBall.draw(ctx);
  blueBall.draw(ctx);
}, 500);
//});