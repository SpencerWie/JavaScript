/* Pong game with very basic AI : By Spencer Wieczorek*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font="30px Verdana";
var mouse = 0; // Get just the mouse in X, we dont care about Y
var oldMouseX = 0;
var delay = 20; // 1 = fast frame rate, 100 = slow frame rate.
var player; var computer;
var spin = 0.3;
var maxSpeed = 20;
var playerScore = 0; var compScore = 0;
var cpuLevel; // how fast AI paddle moves
var state = "start" // Between "start"(menu) and "game"(playing game)

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
        this.x = mouse.x - (this.w/2);
    }
    this.update = function(){
        this.move();
        this.draw();
    }
}

function Computer(x,y,w,h){ // s=speed, higher it is hard the computer is
    Paddle.call(this,x,y,w,h);
    this.s=0; this.dx=0; 
    
    this.move = function(){
        this.x += this.dx;
        hDist = Math.abs(ball.x-(this.x+(this.w/2)))
        if(ball.x>this.x+(this.w/2)) this.dx=hDist;
        else this.dx = -hDist;
        if(this.dx>this.s) this.dx=this.s;
        if(this.dx<-this.s) this.dx=-this.s;
        this.draw();
    }
}

function Ball(x,y,r){
    this.x = x; this.y = y; this.r = r;
   
    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        //Bounce off walls
        if(this.x-this.r<0) this.dx = Math.abs(this.dx); // Left wall
        if(this.x+this.r>canvas.width) this.dx = -Math.abs(this.dx); // Right wall
        if(this.y-this.r+5<0){ //add 1 to score, reset ball
            this.reset(); 
            playerScore++;
        } 
        if(this.y+this.r-5>canvas.height){ // computer win
            this.reset(); 
            compScore++;
        } 
        //Bounce off paddles
        if(this.x<player.x+player.w && this.x>player.x){ 
            if(this.y+this.r>player.y && this.dy>0){
                this.dy = (-1*Math.abs(this.dy)) -0.2; // reflex and add speed 
                this.dx += (mouse.x - oldMouseX)/10; //Move ball.x based on how paddle is moving
            } 
        }
        if(this.x<computer.x+computer.w && this.x>computer.x){ 
            if(this.y-(this.r*3)<computer.y && this.dy<0){
                this.dy = (Math.abs(this.dy)) +0.2 ; 
                if(this.dy>maxSpeed) this.dy = maxSpeed;
            } 
        }
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.closePath();
        ctx.stroke();
    }    
    this.reset = function(){
        this.x = canvas.width/2;
        this.y = canvas.height/2
        this.angle = -((Math.random()*(Math.PI/2))+(Math.PI/4));
        this.dx = 2*Math.cos(this.angle); 
        this.dy = 2*Math.sin(this.angle);
    }  
    this.reset();
}

function Button(x,y,w,h,color,hovColor,text,cpuDifficulty){
    this.x = x; this.y = y; this.w = w; this.h = h;
    this.color=color; this.hovColor=hovColor;
    this.text=text; this.cpuDifficulty=cpuDifficulty;
    this.sColor = color;
    
    this.draw = function(){
        if(mouse.x>this.x && mouse.x<this.x+this.w && mouse.y>this.y && mouse.y<this.y+this.h){
            this.color = this.hovColor;
        } else {
            this.color = this.sColor;
        }
        ctx.strokeStyle = this.color;
        ctx.strokeText(this.text, this.x+10, this.y+35);
        ctx.strokeRect(this.x,this.y,this.w,this.h);  
    }
    this.click = function(){
        state = "game";
        computer.s = this.cpuDifficulty;
        this.color = this.sColor;
    }                    
}

function getMouseCoords(e){
    var canvasRect = canvas.getBoundingClientRect();
    return {x:e.clientX - canvasRect.left, y:e.clientY - canvasRect.top};
}

canvas.addEventListener('mousemove', function(e) { 
    oldMouseX = mouse.x; mouse = getMouseCoords(e); 
});
canvas.onclick = function(){
    if(button.color == button.hovColor) button.click(); // If on button click it.
}
                        
player = new Player(canvas.width/2, canvas.height-20 , 80, 10);
computer = new Computer(canvas.width/2, 10, 80, 10);
ball = new Ball(canvas.width/2, canvas.height/2, 5);
button = new Button(canvas.width/2-50, canvas.height/2-25, 100, 50,"grey","black","Start",5); // cpu speed by <--
//Main loop
function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(state=="game"){
        player.update();
        computer.move();
        ball.update();
        ctx.font="10px Verdana";
        ctx.fillText("You: "+playerScore,5,canvas.height-1);
        ctx.fillText("CPU: "+compScore,5,8);
        if(playerScore==5 || compScore==5) state="start"; //Back to start when someone wins.
    } 
    else if(state=="start"){
        playerScore = 0; compScore = 0;
        ctx.font="30px Verdana";
        button.draw();
    }
}
//Main loop delay
setInterval(function(){main()},delay);
