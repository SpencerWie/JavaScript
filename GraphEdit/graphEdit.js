var STATE = "";
var items = {};
var nodeIndex = 0;
var nodeSize = 5;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

$("#menu > button").click(function(){
    $("#menu > button").removeClass("selected");
    $(this).addClass("selected");
    STATE = $(this).attr("id");
});

$("#canvas").click(function(e){
    if(STATE === "node")
    {
        var cRect = canvas.getBoundingClientRect();
        var nodeOffset = Math.floor(nodeSize/2);
        var canvasX = e.clientX - cRect.left - nodeOffset;
        var canvasY = e.clientY - cRect.top - nodeOffset;
        var newNode = new Node(canvasX,canvasY,nodeSize,10);
        redraw();
    }
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

function redraw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
	for(item in items)
    	items[item].draw();
}
