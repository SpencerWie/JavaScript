var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

left = right = up = down = false;

function Box(x, y, size, speed , color) {
    this.x = x; this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    
    this.update = function() {
        this.collision();
        if(left) this.x -= this.speed;
        if(up) this.y -= this.speed;
        if(right) this.x += this.speed;
        if(down) this.y += this.speed;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    
    this.collision = function() {
        if(this.x < 0) left = false;
        if(this.x > canvas.width - this.size) right = false;
        if(this.y < 0) up = false;
        if(this.y > canvas.height - this.size) down = false;
    }
}

var box = new Box(200,50,50,2,"red");

document.addEventListener("keydown", function(e) { 
    if( e.keyCode == 37 ) left = true;
    if( e.keyCode == 38 ) up = true;
    if( e.keyCode == 39 ) right = true;
    if( e.keyCode == 40 ) down = true;
});
                          
document.addEventListener("keyup", function(e) { 
    if( e.keyCode == 37 ) left = false;
    if( e.keyCode == 38 ) up = false;
    if( e.keyCode == 39 ) right = false;
    if( e.keyCode == 40 ) down = false;    
});

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    box.update();
}

setInterval(function(){ main() }, 5);
