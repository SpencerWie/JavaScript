//Globals
var canvas;
var ctx;
var ship;
var enemy;
var bulletArray = [];
var bulletTimer = 0;
var FPS = 30;
var delay = (1/FPS)*1000; // This is 30 FPS in delay convert.
var LEFT = false; var UP = false; var RIGHT = false; var DOWN = false; // Arrow Keys
var SPACE = false; //Other Keys
//On load setup Canvas
window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.fillStyle="#0000FF";
	ctx.fillRect(0,0,100,100);
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
	this.speed = 5;
	this.fireRate = 30;//lower the better
	
	this.update = function(){ // Updates position then draws to canvas.
		this.move();
		this.draw();
	}
	this.shoot = function(){
		var newBullet = new Bullet(this.x+(this.size/2)-3,this.y,5,5+this.speed,bulletArray.length-1);
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
		ctx.fillRect(this.x,this.y,size,size*2);
		if(this.y<0){ 
			bulletArray.splice(this.i,1); //remove from array.
			delete this.x; delete this.y; delete this.i; delete this.size; //remove all properties then self from mem.
			delete this.speed; delete this.color; delete this; // note: this saved 20MB of space. May opomize futher and hide bullets and set limit.
		}
	}
}

//Enemy Class
function Enemy(x,y,size){
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = "#0000FF";
	this.hitColor = "#FF0000";
	this.update = function(){
		ctx.fillStyle = this.color;
		if(this.bulletCollision()){
			ctx.fillStyle = this.hitColor;
		}
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
	this.bulletCollision = function(){
		for(var i=0;i<bulletArray.length;i++){
			if(collisionCheck(this,bulletArray[i])) return true;
		}
	}
}
//The main function setups then runs main loop based on FPS
function main(){
	ship = new Ship(100,canvas.height-50,30);
	enemy = new Enemy(250,100,100)
	setInterval(function(){loop()},delay);	
}
function loop(){
	clearCanvas();
	ship.update();
	enemy.update();
	//Manage Bullets
	bulletTimer++;
	for(var i=0;i<bulletArray.length;i++){
		bulletArray[i].update();
	}
}