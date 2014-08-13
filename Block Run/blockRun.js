var map = [
   '######################################################',
   '#             #                   #               #  #',
   '#             #                   #####       #####  #',
   '#             #                                      #',
   '#             #####   ##                  #          #',
   '#         #                              ###         #',
   '#      #  # #             ######        #####        #',
   '#  #     ## #            ##    #       #######       #',
   '# ###       #           ###           #########      #',
   '######################################################'   
];

var delay = 25;
var items = [];
var player;

LEFT = RIGHT = UP = DOWN = false;

GRAVITY = 0.5;

var groundPoint = { x: 0, y: 0 , color: 'red', height: 4, width: 30};

var scroll = 0;
/*
How timeframes work: For animations via frame-by-frame

[ <frame1>, <frame2> , <frame3>, ... ]

[ [time when to start animation, frameX, frameY] , [time when to move to next frame, frameX, frameY] , ... ]

timer resets when animation is done.
*/
var blink_timeframe = [[220 ,1 ,0] , [223 ,2 ,0] , [226, 1, 0] , [229 ,0 ,0]];

function Player() {
   this.width = 28;
   this.height = 28;
   this.size = 32;
   // Center Player on screen
   this.x = (canvas.width/2) - (this.size/2);   
   this.y = (canvas.height/2) - (this.size/2);
   this.dx = 0; this.dy = 0;
   this.ddx = 0; this.ddy = 0;
   this.ay = 0;
   this.speed = 7;
   this.frameX = 0;
   this.frameY = 0;
   this.image = images['player_blink'];
   this.collision = false;
   this.jump = false;
   this.timer = 0; // For animation
   this.step = 0; // For frame movement (animation)
   
   this.draw = function() {
      ctx.drawImage(this.image, this.frameX*this.size, this.frameY*this.size, this.size, this.size, this.x, this.y, this.size, this.size);
   }
   
   this.update = function() 
   {
      this.collision = false;
      this.timer++;
      

      for(var i = 0; i <blink_timeframe.length; i++ ) {
         if(this.step == i && this.timer > blink_timeframe[i][0]) {
            this.frameX = blink_timeframe[i][1];
            this.step = i + 1;
         }
         if( this.step == blink_timeframe.length ){
            this.step = 0;
            this.timer = 0;
         }
      }
      
      if(UP && this.jump){ 
         this.dy = -this.speed*3; 
         this.ddy = -1;
         this.jump = false;
      }
      if(DOWN){ 
         this.dy = this.speed; 
      } 
      if(this.dy < 10 && !this.jump) this.ddy += GRAVITY; // Apply Gravity
      this.dy += this.ddy;
      this.y += this.dy;
      for(item in items) {
         if(this.dy < 0 && collide(this,items[item]) && !this.collision) {
            this.dy = 0;
            this.ddy = 0;
            this.y = items[item].y + this.size;
         }
         if(this.dy > 0 && collide(this,items[item]) && !this.collision) {
            this.dy = 0;
            this.ddy = 0;
            this.y = items[item].y - this.size;
            this.jump = true;
            this.collision = true;
         }
      }
      
      if(this.dy > 15) this.dy = 15;          //Speed limits
      if(this.dy < -15) this.dy = -15;
      
      
      if(LEFT){ 
         this.dx = this.speed; // Move Left
         this.frameY = 1; // Face Left
      }
      if(RIGHT){ 
         this.dx = -this.speed; // Move Right
         this.frameY = 0; // Face Right
      }
      if(!LEFT && !RIGHT) this.dx = 0; // If no arrow keys no move hor.
      player.x -= this.dx;
      scroll += this.dx;
      ctx.translate(this.dx, 0);
      for(item in items) {
         if(RIGHT && collide(this,items[item])) {
            // Reposition player to be place right next to block, then get the difference and apply that to scrolling of canvas.
            var oldX = this.x;
            this.x = items[item].x - this.size ;
            var diff = oldX - this.x
            ctx.translate(diff, 0);
            scroll += diff;
         }
         else if(LEFT && collide(this,items[item])) {
            var oldX = this.x;
            this.x = items[item].x + this.size ;
            var diff = oldX - this.x
            ctx.translate(diff, 0);
            scroll += diff;
         }
      }     
      
      
      groundPoint.x = this.x;
      groundPoint.y = this.y + this.size + 1;
   
      for(item in items) 
         if(collide(groundPoint, items[item])) { 
            this.jump = true; break;
         } else { this.jump = false; }
      
   }
}

function Block(x, y) {
   this.x = x; 
   this.y = y;
   this.image = images['block'];
   this.width = 30; this.height = 30;
   
   this.draw = function() {
      ctx.drawImage(this.image, this.x, this.y);
   }
}

function loadImages() 
{
   var playerBlink = new Image(); playerBlink.src = "player_blink.png";
   var Block = new Image(); Block.src = "block.png";
   
   images = {
      player_blink: playerBlink,
      block: Block
   }
   
   return images;
}

function createMap() {
   var X = 0;
   var Y = 0;
   var SIZE = 32;
   
   player = new Player();
   test = new Block(0,0)
   
   for( Y = 0; Y < map.length; Y++ ) 
      for( X = 0; X < map[0].length; X++ ) 
         if(map[Y].charAt(X) == '#') 
            items.push(new Block(X*SIZE, Y*SIZE));
}

function collide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

document.addEventListener("keydown", function(e) { 
    if( e.keyCode == 37 ) LEFT = true;
    if( e.keyCode == 38 ) UP = true;
    if( e.keyCode == 39 ) RIGHT = true;
    if( e.keyCode == 40 ) DOWN = true;
});
                          
document.addEventListener("keyup", function(e) { 
    if( e.keyCode == 37 ) LEFT = false;
    if( e.keyCode == 38 ) UP = false;
    if( e.keyCode == 39 ) RIGHT = false;
    if( e.keyCode == 40 ) DOWN = false;    
});

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
images = loadImages();
createMap();

timer = setInterval(function()
{
   ctx.clearRect(-scroll, 0, canvas.width, canvas.height);
   //ctx.translate(-(canvas.width/2)-player.x, 0);
   ctx.fillStyle = player.color;
   player.update();
   player.draw();
   for(item in items)
      items[item].draw();
      ctx.fillStyle = "red";
      ctx.fillText("Beta: Scrolling and Collision Test", 10-scroll, 10);
}, delay);