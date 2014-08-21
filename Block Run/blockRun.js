var map = [
   '#################################################################################',
   '#             #                   # o           o #                             #',
   '#             # o                 #####   o   #####        ####                 #',
   '#         o   #                           #                                     #',
   '#             #####   ##                 ###            ##########              #',
   '#  o      #               E             #####                                   #',
   '#      #  # #             ######       ## o ##            E              o o    #',
   '#  #     ## #            ## o  #      ###   ###        ############      o o    #',
   '# ###       #E     #    ### o        ####   ####            o                   #',
   '#######  ################################  ##################################   #',
   '#                                                                               #',
   '#      #                    o             o##o                              #####',
   '#      ##                                ######                            #    #',
   '#    #####       oo                     #      #       o       o          #     #',
   '#o     ####o             o     o       #        #                        #      #',
   '###    #####     ##     ##     ##     #   o   o  #     ##     ####      #       #',
   '#   o  ####      ##     ##     ##                                 #    #        #',
   '#      ####o  o  ##  o  ##     ##      E               E        o  #  #         #',   
   '#################################################################################',
];

var delay = 28;
var items = [];
var player;
var yLevel = 0;
var yLevelMax = 288;

var lastLoop = new Date;

LEFT = RIGHT = UP = DOWN = SHIFT = false;

GRAVITY = 0.25;
COINS = 0;
HEARTS = 1

var groundPoint = { x: 0, y: 0 , color: 'red', height: 4, width: 28};

var scrollX = 0;
var scrollY = 0;

var camY = 0;
/*
How timeframes work: For animations via frame-by-frame

[ <frame1>, <frame2> , <frame3>, ... ]

[ [time when to start animation, frameX, frameY] , [time when to move to next frame, frameX, frameY] , ... ]

timer resets when animation is done.
*/
var blink_timeframe = [[220 ,1 ,0] , [223 ,2 ,0] , [226, 1, 0] , [229 ,0 ,0]];
var coin_timeframe = [[5, 1, 0], [10, 2, 0], [15, 1, 0], [20, 0, 0]];

function Player() {
   this.width = 28;
   this.height = 28;
   this.size = 32;
   this.x = (canvas.width/2) - (this.size/2);   
   this.y = (canvas.height/2) - (this.size/2);
   this.dx = 0; this.dy = 0;
   this.ddx = 0; this.ddy = 0;
   this.walk = 7; this.run = 10;
   this.speed = 7;
   this.jumpPower = 10;
   this.frameX = 0; // X frame on tilemap sprite
   this.frameY = 0; // Y frame on tilemap sprite
   this.image = images['player_blink'];
   this.jump = false;
   this.timer = 0; // For animation
   this.step = 0; // For frame movement (animation)
   
   this.draw = function() {
      ctx.drawImage(this.image, this.frameX*this.size, this.frameY*this.size, this.size, this.size, this.x, this.y, this.size, this.size);
   }
   
   this.update = function() 
   {
      this.BlinkAnimation();
      this.verticalMovement();
      this.horizontalMovement();
      this.handleCollisions();
   }
   
   this.BlinkAnimation = function() 
   {
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
   }
   this.verticalMovement = function()
   {
      // Arrow Key detection.
      if(UP && this.jump){ 
         this.dy = -this.jumpPower; 
         this.ddy = -1;
         this.jump = false;
      }       
      
      if(this.dy < 10 && !this.jump) this.ddy += GRAVITY; // Apply Gravity
      
      this.dy += this.ddy; // Update variables
      this.y += this.dy;
      
      // Vertical Block collisions. (needs to be seperate from horizonal for proper collisions)
      for(item in items) {
         if(this.dy < 0 && collide(this,items[item]) && isItem(items[item],'block')) {
            this.dy = 0;
            this.ddy = 0;
            var oldY = this.y;
            this.y = items[item].y + this.size;
            var diff = oldY - this.y
         }
         else if(this.dy > 0 && collide(this,items[item]) && isItem(items[item],'block')) {
            this.dy = 0;
            this.ddy = 0;
            var oldY = this.y;
            this.y = items[item].y - this.size;
            var diff = oldY - this.y
            this.jump = true;
         }
      }
      
      //Speed limits
      if(this.dy > 12) this.dy = 12;          
      if(this.dy < -15) this.dy = -15;   
   }
   
   this.horizontalMovement = function()
   {
      // Handle Running (Shift)
      if(SHIFT) this.speed = this.run;
      else this.speed = this.walk;
      
      if(LEFT){ 
         this.dx = this.speed; // Move Left
         this.frameY = 1; // Face Left
      }
      if(RIGHT){ 
         this.dx = -this.speed; // Move Right
         this.frameY = 0; // Face Right
      }
      if(!LEFT && !RIGHT) this.dx = 0; // If no arrow keys no move hor.
      
      // Update position and move camra.
      player.x -= this.dx;
      scrollX += this.dx;
      ctx.translate(this.dx, 0);   
   }
   
   this.handleCollisions = function() 
   {
      for(item in items) {
         // Blocks
         if(RIGHT && collide(this,items[item]) && isItem(items[item],'block')) {
            // Reposition player to be place right next to block, then get the difference and apply that to scrolling of canvas.
            var oldX = this.x;
            this.x = items[item].x - this.size;
            var diff = oldX - this.x
            ctx.translate(diff, 0);
            scrollX += diff;
         }
         else if(LEFT && collide(this,items[item]) && isItem(items[item],'block')) {
            var oldX = this.x;
            this.x = items[item].x + this.size;
            var diff = oldX - this.x
            ctx.translate(diff, 0);
            scrollX += diff;
         }
         // Coins
         if( isItem(items[item],'coin') && collide(this,items[item]) ) {
            items.splice(item, 1);
            COINS++;
         }
         // Monsters
         if( isItem(items[item],'enemies') && collide(items[item], player) ){
            //Player land on head, enemey is damaged (shift XFrame or die if out of hp)
            if( player.y + player.height < items[item].y + player.dy + 5  && player.dy > 0 ) {
               player.dy = -5;
               player.ddy = -1;
               player.y = items[item].y - 20;
               items[item].hp--;
               if(items[item].type == "RedBlock" && items[item].hp == 1){ 
                  items[item].y += 20;
                  items[item].height -= 20; 
               }
               if( items[item].hp > 0 ) items[item].frameX++;
               else items.splice(item, 1);
            }
         }
      }     
      groundPoint.x = this.x;
      groundPoint.y = this.y + this.size + 1;  
      
      // Handle Jump (only jump when player is on the ground)      
      for(item in items) {
         if(collide(groundPoint, items[item]) && isItem(items[item],'block') && this.dy >= 0) { 
            this.jump = true; 
            break;
         } else {
            this.jump = false;    
         }
      }
   }
}

function Enemy(x, y, width, height, image, speed ,walkSteps, hp, type) 
{
   this.x = x;
   this.y = y - 20;
   this.frameX = 0; // X frame on tilemap sprite
   this.frameY = 0; // Y frame on tilemap sprite
   this.width = width;
   this.height = height;
   this.sWidth = width; this.sHeight = height;
   this.image = image;
   this.speed = speed;
   this.startWalk = this.x;
   this.endWalk = this.x + (walkSteps * 32) - (this.width - 32);
   this.hp = hp;
   this.type = type
   
   this.draw = function(){
      this.update();
      ctx.drawImage(this.image, this.frameX*this.sWidth, this.frameY*this.sHeight, this.sWidth, this.sHeight, this.x, this.y, this.sWidth, this.sHeight);
   }
   
   this.update = function() 
   {
      // Walking
      if(this.x >= this.endWalk && this.speed > 0){
         this.x = this.endWalk;
         this.speed *= -1;
         this.frameY = 1;
      }
      else if(this.x <= this.startWalk && this.speed < 0){
         this.x = this.startWalk;
         this.speed *= -1;
         this.frameY = 0;
      }
      this.x += this.speed
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

function Coin(x, y) {
   this.timer = 0;
   this.x = x + 9;
   this.y = y + 9;
   this.image = images["coin"];
   this.frameX = 0;
   this.step = 0;
   this.width = 14; this.height = 14;
   
   this.draw = function() {
      this.timer++;
      for(var i = 0; i <coin_timeframe.length; i++ ) {
         if(this.step == i && this.timer > coin_timeframe[i][0]) {
            this.frameX = coin_timeframe[i][1];
            this.step = i + 1;
         }
         if( this.step == coin_timeframe.length ){
            this.step = 0;
            this.timer = 0;
         }
      }
      ctx.drawImage(this.image, this.frameX*32, 0, 32, 32, this.x - 9, this.y - 9, 32, 32);
   }
}

function loadImages() 
{
   var playerBlink = new Image(); playerBlink.src = "player_blink.png";
   var Block = new Image(); Block.src = "block.png";
   var Coin = new Image(); Coin.src = "coin.png"
   var Background = new Image(); Background.src = "clouds.jpg";
   var Enemies = new Image(); Enemies.src = "enemies.png";
   
   images = {
      player_blink: playerBlink,
      block: Block,
      coin: Coin,
      background: Background,
      enemies: Enemies
   }
   
   return images;
}

function createMap() {
   var X = 0;
   var Y = 0;
   var SIZE = 32;
   
   player = new Player();
   test = new Block(0,0)
   
   for( Y = 0; Y < map.length; Y++ ) {
      for( X = 0; X < map[0].length; X++ ) {
         if(map[Y].charAt(X) == '#') 
            items.push(new Block(X*SIZE, Y*SIZE));
         if(map[Y].charAt(X) == 'o') 
            items.push(new Coin(X*SIZE, Y*SIZE));
         if(map[Y].charAt(X) == 'E') 
            items.push(new Enemy(X*SIZE, Y*SIZE, 40, 52, images["enemies"], 4, 5, 2, "RedBlock"));
      }
   }
}

function collide(a, b) {
    return (
        ((a.y + a.height) >= (b.y)) &&
        (a.y <= (b.y + b.height)) &&
        ((a.x + a.width) >= b.x) &&
        (a.x <= (b.x + b.width)) 
    );
}

document.addEventListener("keydown", function(e) { 
    if( e.keyCode == 37 ) LEFT = true;
    if( e.keyCode == 38 ) UP = true;
    if( e.keyCode == 39 ) RIGHT = true;
    if( e.keyCode == 40 ) DOWN = true;
    if( e.keyCode == 16 ) SHIFT = true;
});
                          
document.addEventListener("keyup", function(e) { 
    if( e.keyCode == 37 ) LEFT = false;
    if( e.keyCode == 38 ) UP = false;
    if( e.keyCode == 39 ) RIGHT = false;
    if( e.keyCode == 40 ) DOWN = false;  
    if( e.keyCode == 16 ) SHIFT = false;    
});

// Check on what an item is based on it's image.
function isItem(check, item) {
   return check.image == images[item];
}

function handleYscroll() {
   if(player.y > 288 && yLevel == 0){
      scrollY+= yLevelMax;
      ctx.translate(0, -yLevelMax);
      yLevel = 1;
      images["background"].src = "ground.jpg";
   }
   if(player.y <= 288 && yLevel == 1){
      scrollY-= yLevelMax;
      ctx.translate(0, yLevelMax);
      yLevel = 0;
      images["background"].src = "clouds.jpg";
   }   
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
images = loadImages();
createMap();

// main
timer = setInterval(function()
{
   var thisLoop = new Date;
   var fps = Math.round(1000 / (thisLoop - lastLoop));
   lastLoop = thisLoop;
   ctx.drawImage(images["background"],-scrollX, scrollY);
   ctx.fillStyle = player.color;
   player.update();
   player.draw();
   handleYscroll();
   for(item in items)
      items[item].draw();
   ctx.fillStyle = "red";
   ctx.fillText("Beta: Scrolling and Collision Test - FPS: "+fps, 10-scrollX, 10+scrollY);
   ctx.drawImage(images['coin'], 0, 0, 32, 32, 400-scrollX, 0+scrollY, 32, 32);
   ctx.fillText(" x "+COINS, 430-scrollX,20+scrollY);
}, delay);