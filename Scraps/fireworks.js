canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvasX = canvasY = 0;

fireworks = [];

function Particle() {
    this.x = canvasX;
    this.y = canvasY;
    var R = Math.floor(Math.random()*255);
    var G = Math.floor(Math.random()*255);
    var B = Math.floor(Math.random()*255);
    var A = Math.random();
    this.color = "rgba("+R+","+G+","+B+","+A+")";
    this.r = Math.floor(Math.random()*5)+1;
    this.ay = 0.3;
    this.dx = Math.floor(Math.random()*14)-7;
    this.dy = Math.floor(Math.random()*14)-7;
    
    this.update = function() {
        this.dy += this.ay;
        this.x += this.dx;
        this.y += this.dy;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
    }
}

document.addEventListener("click", function(e) { 
    var amount = Math.floor(Math.random()*100)+20;
    for(var i = 0; i < amount; i++) {
        fireworks.push(new Particle());
    }
});

function main() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        if(fireworks[i].y > canvas.height) 
            fireworks.splice(i, 1);
    }
    ctx.fillStyle = "rgba(200,200,200,0.95)";
    ctx.fillText(fireworks.length,10,10);
}

canvas.addEventListener("mousemove", function(e) 
{ 
    var cRect = canvas.getBoundingClientRect();
    canvasX = e.clientX - cRect.left;
    canvasY = e.clientY - cRect.top;
});

setInterval(function(){main()},15);
