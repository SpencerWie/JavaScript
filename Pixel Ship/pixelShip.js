//Globals
var canvas;
var ctx;
var ship;
var bulletArray = [];
var enemyArray = [];
var score = 0;
var timer = 0;
var bulletTimer = 0;
var enemyTimer = 0;
var enemySpawnRate = 2000; //every # miliseconds.
var FPS = 30;
var delay = (1/FPS)*1000; // This is 30 FPS in delay convert.
var LEFT = false; var UP = false; var RIGHT = false; var DOWN = false; // Arrow Keys
var SPACE = false; //Other Keys
var state = "start";
var startState;
var gameState;
var endState;
//On load setup Canvas
window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	main();
}

//Clear canvas to white screen.
function clearCanvas(){ 
	ctx.fillStyle = "#FFFFFF";
	ctx.clearRect(0,0,canvas.width,canvas.height); 
}

function collisionCheck(obj1,obj2){
	if(obj2.x<obj1.x+obj1.size && obj1.x<obj2.x) 
		if(obj2.y<obj1.y+obj1.size && obj1.y<obj2.y)
			return true;
}

function generateEnemy(intensity){
	if(enemyTimer>(enemySpawnRate/FPS)){
		//Place enemy randomly on top of page, although just not directly on the page corners
		var space = 30;
		var newEnemy = new Enemy(Math.ceil(Math.random()*(canvas.width-space)),0,25,2,enemyArray.length);
		enemyArray.push(newEnemy);
		enemyTimer=0;
	}
}

//keyboard handler, on keypress set arrows to true, on release to false.
document.onkeydown = function(e){
    var key = e.charCode || e.keyCode;// charcode or keycode.
   	if(key==37) LEFT=true;
	if(key==38) UP=true;
	if(key==39) RIGHT=true;
	if(key==40) DOWN = true;
	if(key==32) SPACE = true;
}
document.onkeyup = function(e){
	var key = e.charCode || e.keyCode;// charcode or keycode.
	if(key==37) LEFT=false;
	if(key==38) UP=false;
	if(key==39) RIGHT=false;
	if(key==40) DOWN = false;
	if(key==32) SPACE = false;
}

//Ship class
function Ship(x,y,size){
	this.x = x;
	this.y = y;
	this.size = size
	this.color = "#00FF00";
	this.speed = 8;
	this.fireRate = 15;//lower the better
	this.damage = 1;
	
	this.update = function(){ // Updates position then draws to canvas.
		this.move();
		this.draw();
	}
	this.shoot = function(){
		var newBullet = new Bullet(this.x+(this.size/2),this.y,5,10,bulletArray.length-1);
		bulletArray.push(newBullet);
	}
	this.move = function(){ // update position and events
		if(LEFT) this.x -= this.speed;
		if(RIGHT) this.x += this.speed;
		if(SPACE){
			if(this.fireRate<bulletTimer) { this.shoot(); bulletTimer=0; }
		}
		if(this.x<0-this.size) this.x=canvas.width;
		else if(this.x>canvas.width+1) this.x= 0-(this.size-1)
	}
	this.draw = function(){ //draw to canvas.
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.size,this.size);	 // Size will be 30x30
	}
}

//Bullet Class
function Bullet(x,y,size,speed,i){
	this.i = i //save index of array in Bullet
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.color = "#00FF00";
	this.update = function(){
		this.y-=speed; //Move up
		ctx.fillStyle = this.color; //Draw on canvas
		ctx.fillRect(this.x-(size/2),this.y,size,size*2);
		if(this.y<0) this.kill();
	}
	this.kill = function(){
		bulletArray.splice(this.i,1); //remove from array.
		for(var i=0;i<bulletArray.length;i++) bulletArray[i].i = i; //reset indexs
		delete this.x; delete this.y; delete this.i; delete this.size; //remove all properties then self from mem.
		delete this.speed; delete this.color; delete this; // note: this saved 20MB of space. May opomize futher and hide bullets and set limit.
	}
}

//Enemy Class
function Enemy(x,y,size,speed,i){
	this.x = x;
	this.y = y;
	this.size = size;
	this.speed = speed;
	this.i = i;
	this.color = "#0000FF";
	this.hitColor = "#FF0000";
	this.HP = 2;
	this.update = function(){
		this.y+=this.speed;
		ctx.fillStyle = this.color;
		if(this.bulletCollision()){
			ctx.fillStyle = this.hitColor;
		}
		ctx.fillRect(this.x,this.y,this.size,this.size);
		this.checkDeath();
	}
	this.bulletCollision = function(){
		for(var i=0;i<bulletArray.length;i++){
			if(collisionCheck(this,bulletArray[i])) {
				bulletArray[i].kill();
				this.HP-=ship.damage;
				if(this.HP<1) {this.kill();score+=10;}
				return true;
			}
		}
	}
	this.checkDeath = function(){
		if(this.y>canvas.height) { //End game -> to endState
			this.kill();
			clearInterval(mainState); state="end"; stateCheck();
		}
	}
	this.kill = function(){
		enemyArray.splice(this.i,1); //remove from array.
		//Update indexes of other enemies
		for(var i=0;i<enemyArray.length;i++) enemyArray[i].i = i;
		for(var i=0;i<enemyArray.length;i++) enemyArray[i].update(); //reupdate;
		delete this.x; delete this.y; delete this.i; delete this.size; //remove all properties then self from mem.
		delete this.speed; delete this.color; delete this.hitColor; delete this; // note: this saved 20MB of space. May opomize futher and hide bullets and set limit.
	}
}
//The main function setups then runs main loop based on FPS
function main(){
	ship = new Ship(100,canvas.height-50,30);
	stateCheck();
}
function stateCheck(){
	if(state=="start"){startState = setInterval(function(){start()},100);}
	if(state=="main"){mainState = setInterval(function(){loop()},delay);}
	if(state=="end"){endState = setInterval(function(){end()},100);}
}
function loop(){
	clearCanvas();
	ship.update();
	for(var i=0;i<enemyArray.length;i++) enemyArray[i].update(); 
	bulletTimer++;	//Manage Bullets and Enemies timers
	enemyTimer++;
	generateEnemy(0);
	for(var i=0;i<bulletArray.length;i++) bulletArray[i].update();
	//Show score
	ctx.fillStyle = "#000000";
	ctx.font="14px Arial";
	ctx.fillText("Points: "+score,15,15);
}
function start(){// Show menu screen (space to start)
	ctx.fillStyle = "#55FF55";
	ctx.fillRect(98,98,252,102);
	ctx.fillStyle = "#DDFFDD";
	ctx.fillRect(100,100,248,98);	
	ctx.fillStyle = "#55FF55";
	ctx.font="20px Arial";
	ctx.fillText("Press SPACE to start",120,135);
	if(SPACE) {clearInterval(startState); state="main"; stateCheck();}
}
function end(){// Show end screen (UP to start)
	enemyArray = [];
	ctx.fillStyle = "#55FF55";
	ctx.fillRect(98,98,252,102);
	ctx.fillStyle = "#DDFFDD";
	ctx.fillRect(100,100,248,98);	
	ctx.fillStyle = "#55FF55";
	ctx.font="15px Arial";
	ctx.fillText("YOU LOSE",190,115);
	ctx.font="18px Arial";
	ctx.fillText("UP ARROW to try again",120,135);
	ctx.fillText("Score: "+score,120,165);
	if(UP) {clearInterval(endState); state="main"; score=0; stateCheck();}
}