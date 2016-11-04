/* Snake Game : By Spencer Wieczorek*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var delay = 70;
var size = 20;
var color = "#2f2";
var powerUp = new Node();
powerUp.color = "#f22"; powerUp.randomize();

function Node(x,y){
    this.x = x; this.y = y;
    this.color = color;
    
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x+1, this.y+1, size-2, size-2);
    }
    this.randomize = function(){
        var randX = Math.floor(Math.random()*(canvas.width/size));
        var randY = Math.floor(Math.random()*(canvas.height/size));
        this.x = randX*size;
        this.y = randY*size;
    }
}

function Snake(){
    this.snake = [new Node(0,0),new Node(10,0),new Node(20,0)];
    this.dir = "right";
    
    this.draw = function(){
        for(node in this.snake){
            this.snake[node].draw();
        }
    }
    this.update = function(){
        if(this.dir=="right") this.move(size,0);
        if(this.dir=="left") this.move(-size,0);
        if(this.dir=="down") this.move(0,size);
        if(this.dir=="up") this.move(0,-size);
        this.draw();
        if(this.collision()){
         this.snake = [new Node(0,0),new Node(10,0),new Node(20,0)];
         this.dir = "right";            
        }
    }
    this.move = function(dirX,dirY){
        if(!this.checkPower()) this.snake.splice(0, 1); // remove first only if did not get powerup.
        var newX = this.snake[this.snake.length-1].x+dirX;
        var newY = this.snake[this.snake.length-1].y+dirY;
        this.snake.push(new Node(newX, newY)); // Add new node to last, pos based on direction.
    }
    this.collision = function(){
        var head = this.snake.length-1;
        for(var i=0; i<this.snake.length-1; i++){ // Check for self collision
            if(this.snake[head].x==this.snake[i].x && this.snake[head].y==this.snake[i].y) return true;
        }
        //Check wall collision
        if(this.snake[head].x<0) return true;
        if(this.snake[head].x>canvas.width-size) return true;
        if(this.snake[head].y<0) return true;
        if(this.snake[head].y>canvas.height-size) return true;
        return false;
    }
    this.checkPower = function(){
        //Check for powerup, if there is one append a new node
        var head = this.snake.length-1;
        if(this.snake[head].x==powerUp.x && this.snake[head].y==powerUp.y){
            powerUp.randomize();
            return true;
        }
        return false;
    }
}

var snake = new Snake();

document.addEventListener("keydown", function(e) { 
    if(e.keyCode == 37) snake.dir="left"
    else if(e.keyCode == 38) snake.dir="up";
    else if(e.keyCode == 39) snake.dir="right";
    else if(e.keyCode == 40) snake.dir="down";
});

function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    snake.update();
    powerUp.draw();
}
setInterval(function(){main()},delay); //Main loop
