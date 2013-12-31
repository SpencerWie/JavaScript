//Globals
var canvas;
var ctx;
var ship;
var blockArray = [];
var FPS = 30;
var delay = (1/FPS)*1000; // This is 30 FPS in delay convert.
var LEFT = false; var UP = false; var RIGHT = false; var DOWN = false; // Arrow Keys

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

function distance(obj1,obj2){ // Get distance as effiecent as possible.
	return Math.sqrt(((obj2.x-obj1.x)*(obj2.x-obj1.x))+((obj2.y-obj1.y)*(obj2.y-obj1.y)));
}

function generateBlocks(num){
	for(var i=0;i<num;i++){
		var numX = Math.random()*canvas.width*80;
		var numY = Math.random()*canvas.height*80;
		var ranX = Math.ceil(numX) - canvas.width*40;
		var ranY = Math.ceil(numY) - canvas.height*40;
		var ranSize = Math.ceil(Math.random()*10)+10; // Size from 10 to 20.
		blockArray.push(new Block(ranX,ranY,50,i));
	}
}

//keyboard handler, on keypress set arrows to true, on release to false.
document.onkeydown = function(e){
    var key = e.charCode || e.keyCode;// charcode or keycode.
   	if(key==37) LEFT=true;
	if(key==38) UP=true;
	if(key==39) RIGHT=true;
	if(key==40) DOWN = true;
}
document.onkeyup = function(e){
	var key = e.charCode || e.keyCode;// charcode or keycode.
	if(key==37) LEFT=false;
	if(key==38) UP=false;
	if(key==39) RIGHT=false;
	if(key==40) DOWN = false;
}

//Ship class
function Player(x,y,size){
	this.x = x;
	this.y = y;
	this.size = size
	this.color = "#00FF00";
	this.speed = 8;
	
	this.update = function(){ // Updates position then draws to canvas.
		this.move();
		this.draw();
	}
	this.move = function(){ // update position and events
		if(LEFT) this.moveCam(this.speed,0);
		if(RIGHT) this.moveCam(-this.speed,0); 
		if(UP) this.moveCam(0,this.speed);
		if(DOWN) this.moveCam(0,-this.speed);
	}
	this.draw = function(){ //draw to canvas.
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
	this.drawTo = function(obj){
		ctx.beginPath();
		ctx.strokeStyle = "rgba(255,50,50,0.4)";
		ctx.moveTo(this.x+(this.size/2),this.y+(this.size/2));
		ctx.lineTo(obj.x+(obj.size/2),obj.y+(obj.size/2));
		ctx.lineWidth = 3;
		ctx.stroke();
	}
	this.moveCam = function(dx,dy){
		for(var i=0;i<blockArray.length;i++){ 
			blockArray[i].x += dx;
			blockArray[i].y += dy;
		}
	}
}

//Bullet Class
function Block(x,y,size,i){
	this.i = i //save index of array in Bullet
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = "#666666";
	this.update = function(){
		ctx.fillStyle = this.color; //Draw on canvas
		ctx.fillRect(this.x,this.y,size,size);
	}
	this.kill = function(){
		bulletArray.splice(this.i,1); //remove from array.
		for(var i=0;i<bulletArray.length;i++) bulletArray[i].i = i; //reset indexs
		delete this.x; delete this.y; delete this.i; delete this.size; //remove all properties then self from mem.
		delete this.speed; delete this.color; delete this; // note: this saved 20MB of space. May opomize futher and hide bullets and set limit.
	}
}

//The main function setups then runs main loop based on FPS
function main(){
	player = new Player((canvas.width/2)-15,(canvas.height/2)-15,30);
	generateBlocks(100000);
	setInterval(function(){loop()},delay);
}
function loop(){
	clearCanvas();
	player.update();
	for(var i=0;i<blockArray.length;i++) {
		if(distance(player,blockArray[i])<250){ // This opomized by ten fold.
			blockArray[i].update();
			player.drawTo(blockArray[i]); // To show number of computation needed to be taken.
		}
	}
}