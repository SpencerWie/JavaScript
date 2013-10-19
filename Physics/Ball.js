var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
var mouseX=0; var mouseY=0;
var HEIGHT = 350; WIDTH = 600;
var delay = 20;
var GRAVITY = 1.5;
var FRICTION = 0.97;
var changeGrav = 1;
var balls = [];
var lines = [];

function Update(){
   clearCanvas()
   for(var i=0;i<balls.length;i++) balls[i].update(); 
   for(var i=0;i<lines.length;i++) lines[i].draw(); 
}

function clearCanvas(){
   ctx.fillStyle = "#FFFFFF";
   ctx.fillRect(0,0,WIDTH,HEIGHT);
}

function distance(x1,y1,x2,y2){
   var diffX = x1-x2;
   var diffY = y1-y2;
   return Math.sqrt((diffX*diffX)+(diffY*diffY));
}

window.onload = function(){
   document.getElementById("Canvas").height = HEIGHT;
   document.getElementById("Canvas").width = WIDTH;
   generateBalls();
   generateLines();
   document.onmousemove = function(event){
      mousePos = getMousePos(event);
   };
   document.onmousedown = function(event){
      for(var i=0;i<balls.length;i++){ balls[i].checkMouse(); }
   };
   document.onmouseup = function(event){
      for(var i=0;i<balls.length;i++){ balls[i].mouseOn = false; }
   };
   setInterval(function(){Update()},delay);
}

function generateBalls(){
   var numberOfBalls = Math.ceil(Math.random()*2+2);//2+(0 to 2)
   for(var i=0;i<numberOfBalls;i++){
      var newX = Math.ceil(Math.random()*WIDTH);
      var newY = Math.ceil(Math.random()*HEIGHT);
      var newR = Math.ceil(Math.ceil(Math.random()*20)+15);
      var R = Math.ceil(Math.random()*255);
      var G = Math.ceil(Math.random()*255);
      var B = Math.ceil(Math.random()*255);
      var newColor = "rgb("+R+","+G+","+B+")";
      balls[i] = new Ball(newX,newY,newR,newColor);
   }
}

function generateLines(){
   lines[0] = new Line(0,HEIGHT/1.5,HEIGHT/2,HEIGHT)
   lines[1] = new Line(WIDTH,HEIGHT/2,WIDTH/1.2,HEIGHT)
}

function getMousePos(event){
   var canvasRect = canvas.getBoundingClientRect();
   mouseX = event.clientX - canvasRect.left,
   mouseY = event.clientY - canvasRect.top
}

function Ball(x,y,r,color){
   //Constructor: sColor = starting Color
   this.x = x; this.y = y;
   this.dx = 0; this.dy = 0;
   this.r = r; this.color = color;
   this.sColor = this.color;
   this.mouseOn = false;
   this.bounce = 0.8;
   
this.draw = function(){ //Draws the this on the canvas.
   ctx.fillStyle = this.color;
   ctx.beginPath();
   ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
   ctx.fill();  
   }
this.checkMouse = function(){ // Checks the distance from mouse to it, it mouse is inside then true.
   var dist = Math.sqrt(Math.pow(this.x-mouseX,2)+Math.pow(this.y-mouseY,2));
   if(dist<this.r) this.mouseOn = true; 
   }
this.calcBounds = function(){ //Checks bounds and reverse dy and dx accordingly.
      if((this.x+this.r) > WIDTH) { this.x = WIDTH-this.r; this.dx = -this.dx * this.bounce; }
      else if((this.x-this.r) < 0) { this.x = 0+this.r; this.dx = -this.dx * this.bounce; }
      if((this.y+this.r) > HEIGHT) {this.y = HEIGHT-this.r; this.dy = -this.dy * this.bounce; }
      else if((this.y-this.r) < 0) {this.y = 0+this.r; this.dy = -this.dy * this.bounce; }
   }
this.checkBallCollision = function(){
   for(var i=0;i<balls.length;i++){
      if(balls[i]!=this){
         var diffX = this.x-balls[i].x;
         var diffY = this.y-balls[i].y
         var dist = Math.sqrt((diffX*diffX)+(diffY*diffY));
         if(dist < this.r+balls[i].r){
            //elasitic colliison: calculate correct displacement for collided balls based on the deepness of the collision.
            var changeX = (balls[i].x+(diffX/dist)*(this.r+balls[i].r)) - this.x; 
            var changeY = (balls[i].y+(diffY/dist)*(this.r+balls[i].r)) - this.y; 
            //ball-ball position update -> to avoid ball falling inside each other.
            balls[i].x -= changeX;
            balls[i].y -= changeY;
            this.x += changeX;
            this.y += changeY;
            balls[i].dx -= changeX;
            balls[i].dy -= changeY;
            this.dx += changeX;
            this.dy += changeY;
         }
      }
   }
}
this.checkLineCollision = function(){
   for(var i=0;i<lines.length;i++){
      var AC = distance(this.x,this.y,lines[i].x1,lines[i].y1);
      var AB = distance(lines[i].x1,lines[i].y1,lines[i].x2,lines[i].y2);
      var CB = distance(this.x,this.y,lines[i].x2,lines[i].y2);
      //law of cos repect to CB
      var angle = Math.acos(((AC*AC)+(AB*AB)-(CB*CB))/(2*AC*AB));
      var angle = (Math.PI/2)-angle;//angle to normal line. 
      var distLine = Math.abs(Math.abs(AC)*Math.cos(angle));//dist from ball to line via normal line.
      if(distLine<this.r){
         //Place ball on proper x and y coords
         var changeX = this.r - distLine;
         var changeY = this.r - distLine;
         var vel = Math.sqrt((this.dx*this.dx)+(this.dy*this.dy));
         var opAngle = Math.sin(distLine/vel);
         if(lines[i].x1<=lines[i].x2){ 
            this.x += changeX; this.y -= changeY;
            var newAngle = (Math.PI/2) - 2*opAngle;
            if(newAngle>(Math.PI/2)){newAngle = Math.PI/2;} //force balls not to go up lines.
         }else{ 
            this.x -= changeX; this.y -= changeY;
            var newAngle = (Math.PI/2) + 2*opAngle;
            if(newAngle<(Math.PI/2)){newAngle = Math.PI/2;}
         }
         // angle will var on position of ball on ethier side of line
         this.dx = vel*Math.cos(newAngle);
         this.dy = -vel*Math.sin(newAngle);
      } 
   }
}
   
this.calcPhysics = function(){
   this.checkBallCollision();
   this.checkLineCollision()
   if(this.mouseOn){ //When user is dragging the this
      var tx = this.x; var ty = this.y
      this.x = mouseX; this.y = mouseY;
      this.dx = (this.x - tx)/2;
      this.dy = (this.y - ty)/2;
      }
   if(!this.mouseOn){ //this in normal motion
      this.x += this.dx;
      this.y += this.dy;
      this.calcBounds();
      this.dx = this.dx * FRICTION;
      this.dy = this.dy * FRICTION + GRAVITY
      }
   }
this.update = function(){
   this.calcPhysics();
   this.calcBounds();
   this.draw();
   }
}

function Line(x1,y1,x2,y2){
   this.x1 = x1; this.x2 = x2;
   this.y1 = y1; this.y2 = y2;
   this.D = (x1*y2) - (x2*y1);
   this.Dr = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
   this.color = "#000000";
this.draw = function(){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x1,this.y1);
      ctx.lineTo(this.x2,this.y2);
      ctx.stroke();
   }
}