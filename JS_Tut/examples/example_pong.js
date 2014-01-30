
/* Pong game with basic AI : By Spencer Wieczorek

 *Player Paddle - A Rect on the screen that follows the mouse hov.
 *AI Paddle - Move at some given speed (The faster the speed the harder the AI), in the direction of the ball
 *Ball Bounces off walls and paddles, when hits paddle speed increases. Ball is created at center with a random starting angle. If ball is past the top/bottom screen the player/computer loses.
*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mouseX = 0; // Get just the mouse in X, we dont care about Y
var oldMouseX = 0;
var delay = 20; // 1 = fast frame rate, 100 = slow frame rate.
var player;

function Paddle(x, y, w, h){
    this.x = x; this.w = w;
    this.y = y; this.h = h;
    this.color = "#F22";
    
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function Player(x, y, w, h){
    Paddle.call(this,x,y,w,h); // extend Paddle
    
    this.move = function(){
        this.x = mouseX - (this.w/2);
    }
    
    this.update = function(){
        this.move();
        this.draw();
    }
}

//Computer placeholder

function Ball(x,y,r){
    this.x = x; this.y = y; this.r = r;
    this.angle = -((Math.random()*(Math.PI/2))+(Math.PI/4));
    this.dx = Math.cos(this.angle); 
    this.dy = Math.sin(this.angle);
    
    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        //Bounce off walls
        if(this.x-this.r<0) this.dx *= -1;
        if(this.y-this.r<0) this.dy *= -1;
        if(this.x+this.r>canvas.width) this.dx *= -1;
        if(this.y+this.r>canvas.height) this.dy *= -1;
        //Bounce off paddles
        if(this.x<player.x+player.w && this.x>player.x){ 
            if(this.y+this.r>player.y && this.dy>0){
                // reflex and add speed
                this.dy = (-1*Math.abs(this.dy)) -0.1; 
                //Move ball.x based on how paddle in is moving
                this.dx += (mouseX - oldMouseX)/20 
            } 
        }
        
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.closePath();
        ctx.stroke();
    }    
}

function getMouseCoords(e){
    var canvasRect = canvas.getBoundingClientRect();
    return e.clientX - canvasRect.left;
}

canvas.addEventListener('mousemove', function(e) { 
    oldMouseX = mouseX;
    mouseX = getMouseCoords(e); 

});
                        
player = new Player(canvas.width/2, canvas.height-10 , 80, 10);
ball = new Ball(canvas.width/2, canvas.height/2, 5);

//Main loop
function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    ball.update();
}

//Main loop delay
setInterval(function(){main()},delay);
