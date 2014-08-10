var map = [
   '####################################',
   '                                    ',
   '                                    ',
   '                                    ',
   '                                    ',
   '                                    ',
   '       ##               ######      ',
   '   #                    #    #      ',
   '  ###     ##            #    #      ',
   '####################################'   
];

var delay = 25;
var items = [];
var player;

LEFT = RIGHT = UP = DOWN = false;

GRAVITY = 0.8;

function Player() {
   this.size = 32;
   // Center Player on screen
   this.x = (canvas.width/2) - (this.size/2);   
   this.y = (canvas.height/2) - (this.size/2);
   this.dx = 0; this.dy = 0;
   this.ay = 0;
   this.speed = 7;
   this.frameX = 0;
   this.frameY = 0;
   this.image = images['player_blink'];
   this.collision = false;
   
   this.draw = function() {
      ctx.drawImage(this.image, this.frameX*this.size, this.frameY*this.size, this.size, this.size, this.x, this.y, this.size, this.size);
   }
   
   this.update = function() 
   {
      var wasUp = player.dy < 0;
      var wasDown = player.dy > 0;
      this.collision = false;
      if(LEFT){ 
         this.dx = this.speed; // Move Left
         this.frameY = 1; // Face Left
      }
      if(RIGHT){ 
         this.dx = -this.speed; // Move Right
         this.frameY = 0; // Face Right
      }
      if(!LEFT && !RIGHT) this.dx = 0; // If no arrow keys no move hor.
      if(this.dy < 10) this.dy += GRAVITY; // Apply Gravity
      
      if(UP && this.collision){ this.dy = -10; UP = false; }
      
      if ((wasUp  && (player.dy > 0)) || (wasDown && (player.dy < 0))) {
         player.dy = 0; // clamp at zero to prevent friction from making us jiggle side to side
      }
      
      if(this.dy > 15) this.dy = 15;          //Speed limits
      if(this.dy < -15) this.dy = -15;
       
      player.x -= this.dx;
      //player.y += this.dy;
   }
}

function Block(x, y) {
   this.x = x; 
   this.y = y;
   this.image = images['block'];
   this.size = 32;
   
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
        ((a.y + a.size) < (b.y)) ||
        (a.y > (b.y + b.size)) ||
        ((a.x + a.size) < b.x) ||
        (a.x > (b.x + b.size))
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
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   player.update();
   player.draw();
   for(item in items)
      items[item].draw();
}, delay);
