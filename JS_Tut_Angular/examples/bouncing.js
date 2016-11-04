var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Ball(x, y, dx, dy, r) {
    this.x = x;    this.y = y;
    this.dx = dx;  this.dy = dy;
    this.r = r; 
    
    this.update = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.stroke();
        this.x += this.dx;
        this.y += this.dy;
        this.checkCollision();
    }
    
    this.checkCollision = function() {
        if(this.x > canvas.width - this.r) this.dx *= -1;
        if(this.y > canvas.height - this.r) this.dy *= -1;
        if(this.x < 0 + this.r) this.dx *= -1;
        if(this.y < 0 + this.r) this.dy *= -1;
    }
}

var ball = new Ball(50,50,2,2,10);

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
}

var timer = setInterval(main, 30);
