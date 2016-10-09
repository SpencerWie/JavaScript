var level_1 = [
   '#################################################################################                ',
   '#             #                   # o           o #                             #                ',
   '#             # o                 #####   o   #####      o      o               #                ',
   '#              #                                                                #                ',
   '#               ######                   ###            ##      ##              #                ',
   '#  o                      E             #####               o                   #                ',
   '#           #             ######       ## o ##            E              o o    #                ',
   '#  #       ##            ## o  #      ###   ###        ############      o o    #                ',
   '# ###     ###E          ### o        ####   ####       #         H#             #                ',
   '#########################################  #############         ############   #                ',
   '#                                       #  o              #######               #                ',
   '#      o                    o            #  ##############                  #####                ',
   '#                           o                          o                   #    #   #######      ',
   '#    #####       oo                      E                      o         #     #  #       #     ',
   '#o     ####o             o     o       ##########                        #      ###         ###  ',
   '###    #####     ##     ###   ###                    E         ###    ###       ###           #  ',
   '#   o  ######    ##     ##     ##          o         ######                      #            #  ',
   '#      ######vvvv##vvvvv##vvvvv##     ############                           o   L     P      #  ',   
   '###   #########################################################################################  ',
   '#     #########################################################################################  ',
   '#     #########################################################################################  ',
   '#   ###########################################################################################  ', 
   '#                                                o                                       ######  ',   
   '#                                              E            oo                    o o    ######  ',   
   '###                                            ######      ####          o o       K     ######  ',   
   '####                        ####        ####              ########                 o o   ######  ',   
   '####                       #####E     ######            ##########E     ######           ######  ',   
   '###############################################################################################  ', 
   '###############################################################################################  ',    
];

var level_2 = [
   '######################################################################################################',
   '#           o                                       ooo                            #      o          #',
   '#                            0                   #########                         #     ###       K #',
   '#####     #####             ###        o        #        #            #            #          o    ###',
   '#   #       #     #####   ## # ##      o      ##         #        #########        #o        ###     #',
   '#    #    oo#                #        ###     #    o     #            #            ##                #',
   '#         ###                #vvvvvvvvvvvvvvvv#   ooo    #            #        #####     ##vvvvvvvvvv#',
   '#           #####            ##################    o     ######       #    ####    #    ##############',
   '#           #vvvvvvvvvvvvvvvv#                                L       #            ###               #',
   '############################## ################################################    #                 #',
   '# H    o      o       o    o   #                                            ###    ######       ######',   
   '################################K                                           #     #        o         #', 
   '#                              ##                           o     o     o   #    #        ###        #', 
   '#                              #     E                #   E      E          #   ##    ########       #', 
   '#    P                         #     ######          ## #####################    #      L            #', 
   '###########                    #                    ###                     ##   ###    ##           #', 
   '############                   ###                 ######                   #           #   KK       #', 
   '#############                  L         #E       #####o   E                L  E     ####vvv##vvvvvvv#',    
   '######################################################################################################',   
];

var level_3 = [
   '####################################################################################################################################################################',
   '#                                                                                                    #                                                       #     #',
   '#                                                                            oooo                    #                                                       #     #',
   '#            o                                   E              E            ####                    #                                                       #     #',
   '#            o      o       o       o           #######   o    #######                               #                                                       #     #',
   '#          ###     ##      ##       ##     o   o   #      #       #           vv            o        #           o     o     o                               #     #',
   '#         ####                             #####   #vvvvvvvvvvvvvv#oo##  vv   ##           ooo       #    ##<   >#<    o    >#<   ##         o               #     #',
   '#        #####                                     ##################    ##   ##     K      o        #   ###<   >#<   >#<   >#<   ###        v               #     #',
   '#       ######vvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvv#             #   L   ##         ###              L  ####vvvvv#vvvvv#vvvvv#vvvv####E     >#<E             L  P  #',
   '################################### ##############################  ###################################################################################o  ##########', 
   '###################################  K o o o o o o o o o o o o o H  ###################################                                               ##  #        #',
   '######################################################################################################                                                #   #        #',   
   '#                                                                                                    #                                                #   #        #',
   '#               K                                                                                oooo#                o    vv    o                    #  o#        #',   
   '#                                                       o    oo     o                  o   o     #####               #### >##< ####                   #  ##        #',   
   '#  ooo       #######                                   >#<  >##<   >#<               #########       #         oo         >##<         oo                          #',
   '#  oHo      #########          #     #    #             ^    ^^     ^               #         #               ####         ^^         ####              o          #', 
   '#  ooo     ###########        ##vvvvv#vvvv#E     #vvvvvvvvvvvvvvvvvvvvvvvv#        #           #   E             #vvvvvvvvvvvvvvvvvvvv#              #######       #',  
   '####################################################################################################################################################################',    
];

var level_end = [
   '#                                                                                                                                                                  #',
   '#                                                                                                                                                                  #',
   '#                                                                                                                                                                  #',
   '#                                                                                                                                                                  #',
   '#                                                                                                                                                                  #',
   '#               ooo o  o oo                                                                                                                                        #',
   '#               o   oo o o o                                                                                                                                       #',
   '#               ooo oo o o o                                                                                                                                       #',
   '#               o   o oo o o                                                                                                                                       #',
   '################ooo o  o oo#########################################################################################################################################', 
   '####################################################################################################################################################################',    
];

var delay = 28;
var items = [];
var player;
var yLevel = 0;
var yLevelMax = 288;
var levels = [level_1, level_2, level_3, level_end];

LEFT = RIGHT = UP = DOWN = SHIFT = false;

GRAVITY = 0.25;
COINS = 0;
HEARTS = 3;
LEVEL = 1;
KEYS = 0;
DEAD = false;

var groundPoint = { x: 0, y: 0 , color: 'red', height: 4, width: 28};
var portalIndex = 0; // index of the portal in the items

var scrollX = 0;
var scrollY = 0;

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
   this.startX = this.x;
   this.startY = this.y;
   this.dx = 0; this.dy = 0;
   this.ddx = 0; this.ddy = 0;
   this.walk = 7; this.run = 10;
   this.speed = 7;
   this.jumpPower = 10;
   this.frameX = 0; // X frame on tilemap sprite
   this.frameY = 0; // Y frame on tilemap sprite
   this.image = images['player_blink'];
   this.jump = false;
   this.ducked = false;
   this.timer = 0; // For animation
   this.step = 0; // For frame movement (animation)
   this.lastPositions = [];    // Keeps track of the last `lastPositionsMax` player positions, used for movement animation
   this.lastPositionsMax = 10; // Maximum number of positions being kept track of
   this.runColors = {r: 0, g: 0, b: 0}; // Color of running animation
   
   this.draw = function() {
      ctx.drawImage(this.image, this.frameX*this.size, this.frameY*this.size, this.size, this.size, this.x, this.y, this.size, this.size);
   }
   
   this.update = function() 
   {
      this.BlinkAnimation();
      this.verticalMovement();
      this.horizontalMovement();
      this.handleCollisions();
	  this.recordPosition(this.x, this.y);
      if(DEAD) { this.frameX = 0; this.frameY = 2; }
   }
   
   this.recordPosition = function(x, y) 
   {   // Push to positions array, new items are the first and old are the last.
		this.lastPositions.unshift({'x': x, 'y': y});
		if(this.lastPositions.length > this.lastPositionsMax) this.lastPositions.length = this.lastPositionsMax;
		if(!SHIFT || this.ducked ) {this.lastPositions.pop(); this.lastPositions.pop()}
		this.RunAnimation();
   }
   
   this.RunAnimation = function(){
	var length = this.lastPositionsMax;
	for(var i=0; i < this.lastPositions.length; i++)
	{
		var pos = this.lastPositions[i];
		var alphaEffect = 5.0; // The larger the more light the effect is
		var factor = (((i*length)+1)*alphaEffect);
		var aplha = length/factor;
		var c = this.runColors;
		ctx.fillStyle = "rgba("+c.r+","+c.g+","+c.b+","+aplha+")";
		ctx.fillRect(pos.x, pos.y, this.size, this.size);
	}
   }
   
   this.BlinkAnimation = function() 
   {
      if(this.ducked) { this.timer = 0; return; }
      this.timer++;

      for(var i = 0; i < blink_timeframe.length; i++ ) {
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
      if(DEAD) return;
      // Arrow Key detection.
      if(UP && this.jump && !DOWN){  
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
      if(DEAD) return;
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
      this.handleDucking();
      // Update position and move camra.
      player.x -= this.dx;
      scrollX += this.dx;
      ctx.translate(this.dx, 0);   
   }
   
   this.handleDucking = function()
   {  // Duck only when holding the down arrow and player isn't jumping
      var duckLeft =  { x: 2, y: 2 };
      var duckRight = { x: 1, y: 2 };
      if(!DOWN && this.ducked) 
      {
          this.ducked = false;
          if( this.frameX == duckLeft.x && this.frameY == duckLeft.y ) {
            this.frameX = 0; this.frameY = 1;
          }
          else if( this.frameX == duckRight.x && this.frameY == duckRight.y ) {
            this.frameX = 0; this.frameY = 0;
          }
      }      
      if(DOWN && this.jump)
      {
          if(this.frameY == 1) { 
            this.frameX = duckLeft.x; 
            this.frameY = duckLeft.y; 
          }
          if(this.frameY == 0) { 
            this.frameX = duckRight.x; 
            this.frameY = duckRight.y; 
          }          
          this.ducked = true;
      }
   }
   
   this.handleCollisions = function() 
   {
      for(item in items) {
        var isSolidBlock = (isItem(items[item],'block') || isItem(items[item],'lock')  || isItem(items[item],'platform'));  
        
         if( isItem(items[item],'key') && collide(this,items[item]) ) {
            items.splice(item, 1);
            KEYS++;
         }                         
         // Locks [ breaks lock if you have a key, otherwise it's treated as a normal block ]
         if( isItem(items[item],'lock') && collide(this,items[item]) && KEYS > 0 ) {
            items.splice(item, 1);
            KEYS--;
         }                 
         // Blocks
         if(RIGHT && collide(this,items[item]) && isSolidBlock ) {
            // Reposition player to be place right next to block, then get the difference and apply that to scrolling of canvas.
            var oldX = this.x;
            this.x = items[item].x - this.size;
            var diff = oldX - this.x
            ctx.translate(diff, 0);
            scrollX += diff;
         }
         else if(LEFT && collide(this,items[item]) && isSolidBlock ) {
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
         // Hearts
         if( isItem(items[item],'heart') && collide(this,items[item]) ) {
            items.splice(item, 1);
            HEARTS++;
         }         
         // Spikes
         if( isItem(items[item],'spikes') && collide(this,items[item]) ) {
            this.die();
         }         
         // Monsters
         if( isItem(items[item],'enemies') && collide(items[item], this) ){
            //Player land on head, enemey is damaged (shift XFrame or die if out of hp)
            if( this.y + this.height < items[item].y + this.dy + 5  && this.dy > 0 ) {
               this.dy = -6;
               this.ddy = -1;
               this.jump = true; 
               this.y = items[item].y - 25;
               items[item].hp--;
               if(items[item].type == "RedBlock" && items[item].hp == 1){ 
                  items[item].y += 20;
                  items[item].height -= 20; 
               }
               if( items[item].hp > 0 ) items[item].frameX++;
               else items.splice(item, 1);
            } else { this.die(); } 
         }
      }     
      groundPoint.x = this.x;
      groundPoint.y = this.y + this.size + 1;  
      
      // Handle Jump (only jump when player is on the ground)      
      for(item in items) {
         var isSolidBlock = (isItem(items[item],'block') || isItem(items[item],'lock') || isItem(items[item],'platform'));  
         if(collide(groundPoint, items[item]) && isSolidBlock && this.dy >= 0) { 
            this.jump = true; // When we found a collision we stop looking
            break;
         } else {
            this.jump = false; // Otherwise we keep looking   
         }
      }
   }
   // When the player dies, subtract a life and place back to start point. Translate camera back as well.
   this.die = function() {
      var self = this
      if(!DEAD)
      {
        setTimeout(function(){
          // Change Sprite to normal 
          DEAD = false;
          self.frameX = self.frameY = 0;
          // Reset Camera
          ctx.translate( self.x - self.startX, 0  );
          scrollX = 0; 
          
          // Reset Player position.
          self.x = self.startX;   
          self.y = self.startY;
          
          handleYscroll(); // Handle yScroll based on new position.
          
          // If the player has hearts subtract, if the player is out of lives restart.
          if( HEARTS > 1 ) HEARTS--;
          else location.reload();
        }, 3000);
      }
      DEAD = true;
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
      if(DEAD) return;
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

function Platform(x, y) {
   Block.call(this, x, y);
   this.image = images['platform'];
   this.height = 5
}

function MovingBlock(x, y) {
    Block.call(this, x, y);
    this.speed = 5;
    
    this.move = function() {
      for(item in items) {
          if( isItem(items[item],'block') && collide(this,items[item])) {   
            speed *= -1;
            if(speed > 0)
              this.x = items[item].x - this.width;
            else
              this.x = items[item].x + this.width;
              
            break;
          }
      }
      this.x += speed;      
    }
}

function Heart(x, y) {
   this.x = x + 10; 
   this.y = y + 10;
   this.image = images['heart'];
   this.width = 15; this.height = 15;
   
   this.draw = function() {
      ctx.drawImage(this.image, this.x - 10, this.y - 10);
   }
}

function Spikes(x, y, type) {
   this.x = x; 
   this.y = y;
   this.image = images['spikes'];
   this.size = 32;   
   this.type = type;

   this.init = function(fx, fy, w, h, offX, offY) {
      this.frameX = fx; this.frameY = fy; 
      this.width = w; this.height = h;
      this.offsetX = offX; this.offsetY = offY;
      this.x -= offX; this.y -= offY;
   }   
   
   if( this.type == "bottom" ) this.init(0, 0, 30, 10, 0, -20);
   else if( this.type == "top" ) this.init(0, 1, 30, 10, 0, 0);
   else if( this.type == "left" ) this.init(1, 0, 10, 30, 0, 0);
   else if( this.type == "right" ) this.init(1, 1, 10, 30, -20, 0);
   
   this.draw = function() {
        ctx.drawImage(this.image, this.frameX*this.size, this.frameY*this.size, this.size, this.size, this.x + this.offsetX, this.y + this.offsetY, this.size, this.size);
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

function Portal(x, y, map, text) 
{
   this.x = x - 32; // Reposition (since bigger than 32x32)
   this.y = y - 64;
   this.width = 64;
   this.height = 100;
   this.map = map;
   this.text = text;
   this.image = images["portal"];
   
   this.draw = function() {
      ctx.drawImage(this.image, this.x, this.y);
   }
}

function loadImages() 
{
   var playerBlink = new Image(); playerBlink.src = "player_blink.png";
   var Block = new Image(); Block.src = "block.png";
   var Coin = new Image(); Coin.src = "coin.png"
   var Heart = new Image(); Heart.src = "heart.png"
   var Background = new Image(); Background.src = "clouds.jpg";
   var Enemies = new Image(); Enemies.src = "enemies.png";
   var Portal = new Image(); Portal.src = "portal.png";
   var Lock = new Image(); Lock.src = "lock.png";
   var Key = new Image(); Key.src = "key.png";
   var Spikes = new Image(); Spikes.src = "spikes.png";
   var Platform = new Image(); Platform.src = "platform.png";
   
   images = {
      player_blink: playerBlink,
      block: Block,
      coin: Coin,
      heart: Heart,
      background: Background,
      enemies: Enemies,
      portal: Portal,
      lock: Lock,
      key: Key,
      spikes: Spikes,
      platform: Platform
   }
   
   return images;
}

function createMap(map) {
   var X = 0;
   var Y = 0;
   var SIZE = 32;
   
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   
   player = new Player();
   items = [];
   
   scrollX = 0;
   scrollY = 0;
   yLevel = 0;
   
   for( Y = 0; Y < map.length; Y++ ) {
      for( X = 0; X < map[0].length; X++ ) {
         if(map[Y].charAt(X) == '#') 
            items.push(new Block(X*SIZE, Y*SIZE));
         else if(map[Y].charAt(X) == '_') 
            items.push(new Platform(X*SIZE, Y*SIZE)); 
         else if(map[Y].charAt(X) == 'o') 
            items.push(new Coin(X*SIZE, Y*SIZE));
         else if(map[Y].charAt(X) == 'H') 
            items.push(new Heart(X*SIZE, Y*SIZE));            
         else if(map[Y].charAt(X) == 'E') 
            items.push(new Enemy(X*SIZE, Y*SIZE, 40, 52, images["enemies"], 4, 5, 2, "RedBlock"));
         else if(map[Y].charAt(X) == 'P')   
              items.push(new Portal(X*SIZE, Y*SIZE, "", ""));
         else if(map[Y].charAt(X) == 'M')
            items.push(new MovingBlock(X*SIZE, Y*SIZE));
         else if(map[Y].charAt(X) == 'L') {  
              var lock = new Block(X*SIZE, Y*SIZE);
              lock.image = images["lock"];
              items.push(lock);  
         }  
         else if(map[Y].charAt(X) == 'K') {  
              var key = new Block(X*SIZE, Y*SIZE);
              key.image = images["key"];
              items.push(key);  
         }    
         else if(map[Y].charAt(X) == 'v') 
            items.push(new Spikes(X*SIZE, Y*SIZE, "bottom"));     
         else if(map[Y].charAt(X) == '^') 
            items.push(new Spikes(X*SIZE, Y*SIZE, "top"));  
         else if(map[Y].charAt(X) == '>') 
            items.push(new Spikes(X*SIZE, Y*SIZE, "right"));  
         else if(map[Y].charAt(X) == '<') 
            items.push(new Spikes(X*SIZE, Y*SIZE, "left"));              
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
    if( e.keyCode == 32 ) nextLevel(); // SPACE
});

function nextLevel() {
    if(LEVEL < levels.length) {
        for(item in items) {
           if(isItem(items[item],'portal') && collide(player,items[item])) {      
              LEVEL++;
              createMap(levels[LEVEL-1]);
            }
        }
    }
}

// Check on what an item is based on it's image.
function isItem(check, item) {
   return check.image == images[item];
}

function handleYscroll() {
   if(player.y > 288*2 && yLevel == 1){
      scrollY+= yLevelMax;
      ctx.translate(0, -yLevelMax);
      yLevel = 2;
      images["background"].src = "ground_deep.jpg";
   }
   else if(player.y > 288 && yLevel == 0){
      scrollY+= yLevelMax;
      ctx.translate(0, -yLevelMax);
      yLevel = 1;
      images["background"].src = "ground.jpg";
   }
   else if(player.y <= 288 && yLevel == 1){
      scrollY-= yLevelMax;
      ctx.translate(0, yLevelMax);
      yLevel = 0;
      images["background"].src = "clouds.jpg";
   }   
   else if(player.y <= 288*2 && yLevel == 2){
      scrollY-= yLevelMax;
      ctx.translate(0, yLevelMax);
      yLevel = 1;
      images["background"].src = "ground.jpg";
   }      
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
images = loadImages();
createMap(level_1);

// main
timer = setInterval(function()
{
   ctx.drawImage(images["background"],-scrollX, scrollY, canvas.width, canvas.height);
   ctx.fillStyle = player.color;
   player.update();
   handleYscroll();
   for(item in items)
      items[item].draw();
   player.draw();   
   ctx.fillStyle = "red";
   ctx.fillText("Beta: V 0.39", 10-scrollX, 10+scrollY);
   ctx.drawImage(images["coin"], 0,0, 32, 32, canvas.width-65-scrollX, scrollY, 32, 32);
   ctx.fillText(" x "+COINS, canvas.width-40-scrollX,20+scrollY);
   ctx.drawImage(images["heart"], 0,0, 32, 32, canvas.width-110-scrollX, scrollY, 32, 32);
   ctx.fillText(" x "+HEARTS, canvas.width-85-scrollX,20+scrollY);   
}, delay);