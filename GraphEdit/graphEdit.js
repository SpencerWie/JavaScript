var STATE = "";
var items = {};
var nodeIndex = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

$("#menu > button").click(function(){
    $("#menu > button").removeClass("selected");
    $(this).addClass("selected");
    STATE = $(this).attr("id");
});

function Node(x, y, size, value)
{
	this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.id = nodeIndex++;
    items["node_"+this.id] = this;
}

Node.prototype.draw = function()
{
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.stroke();
}

var node1 = new Node(10,10,5,10);
var node1 = new Node(30,30,5,10);
var node1 = new Node(50,50,5,10);
var node1 = new Node(100,100,5,10);

console.log(items);

function main()
{
	for(item in items)
    	items[item].draw();
}

requestAnimationFrame(main);
