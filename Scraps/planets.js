var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var refreshRate = 15 // redraw to canvas and update every X milliseconds
var G = 6.667*(Math.pow(10,1));

function Planet(x, y, size, mass, color, velocity, angle) {
    this.x = x; 
    this.y = y; 
    this.size = size
    this.mass = mass;
    this.color = color;
    this.velocity = velocity;
    this.angle = angle;
    
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
    
    this.update = function() {
        for(planet in planets) {
            if(planets[planet] != this) {
                // simulate physical planetary laws
                var distX = Math.abs(planets[planet].x - this.x);
		        var distY = Math.abs(planets[planet].y - this.y);
		        var angle = Math.atan2(distY,distX);
                var dist = distance(this, planets[planet]);
                if(dist == 0) var vel = this.velocity; 
                else var vel = (((G*planets[planet].mass)*(this.mass))/(Math.pow(dist,2)))/this.mass;
		        var Dx = this.velocity * Math.cos(angle);
		        var Dy = this.velocity * Math.sin(angle);
		        if(this.x > planets[planet].x) Dx *= -1;
		        if(this.y < planets[planet].y) Dy *= -1; 
                angle = Math.atan2(Dy,Dx);
                this.velocity = vel;
                this.angle = angle;
            }
            this.x += Math.sin(this.angle)*this.velocity;
            this.y += Math.cos(this.angle)*this.velocity;
        }
        this.draw();
    }
}

function distance(obj1, obj2) {
    return Math.sqrt(Math.pow(obj1.x-obj2.x,2) + Math.pow(obj1.y-obj2.y,2));
}

var earth = new Planet(100, 200, 10, 10, "blue", 0 ,0);
var sun = new Planet(200, 200, 1, 5000, "black", 0, 0);
var mars = new Planet(300, 200, 15, 20, "red", 0 ,0);
var saturn = new Planet(300, 300, 20, 28, "cyan", 0 ,0);
var venus = new Planet(350, 200, 22, 35, "green", 0 ,0);

var planets = [earth, sun, mars, saturn ,venus]; // Array to hold all planets

// Our main update event
function main() 
{
    //Clear Canvas
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw planets
    for(planet in planets) planets[planet].update();
}

// Now update canvas via timer
var timer = setInterval(function(){ main() }, refreshRate);
