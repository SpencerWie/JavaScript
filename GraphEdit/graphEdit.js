var STATE = "";
var items = {
  "nodeList": {},
  "linkList": {}
};
var nodeIndex = 0;
var nodeSize = 5;
var LEFT_MOUSE = 1;
var RIGHT_MOUSE = 3;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.oncontextmenu = function (){ return false; }

$("#menu > button").click(function(){
  STATE = "";
  var wasNotSelected = !$(this).hasClass("selected");
  $("#menu > button").removeClass("selected");
  if( wasNotSelected ) {
    STATE = $(this).attr("id");
    $(this).addClass("selected");
  }
});

$("#canvas").mouseup(function(e){
  if( STATE === "node" )
  {
    var cRect = canvas.getBoundingClientRect();
    var nodeOffset = Math.floor(nodeSize/2);
    var canvasX = e.clientX - cRect.left - nodeOffset;
    var canvasY = e.clientY - cRect.top - nodeOffset;  
    
    if( e.which == LEFT_MOUSE )    
    {      
      var newNode = new Node(canvasX,canvasY,nodeSize,10);
      redraw();
    }
    else if( e.which == RIGHT_MOUSE  )
    {
      for( node in items["nodeList"])
      {
        var selected = false;
        var node = items["nodeList"][node];
        node.outlineColor = "black";
        if( dist(canvasX,canvasY,node.x, node.y) < node.size && !selected)
        {
          node.outlineColor = "yellow";
          selected = true;
          console.log("selected node: " + node.id);
        }
      }
      redraw();
    }    
    
  }
});

function Node(x, y, size, value)
{
	this.x = x;
  this.y = y;
  this.size = size;
  this.value = value;
  this.outlineColor = "black";
  this.id = nodeIndex++;
  items["nodeList"]["node_"+this.id] = this;
}

Node.prototype.draw = function()
{
  ctx.strokeStyle = this.outlineColor;
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.stroke();
}

function redraw()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(item in items["nodeList"])
    items["nodeList"][item].draw();
}

function dist(x1,y1,x2,y2){ return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ); }


