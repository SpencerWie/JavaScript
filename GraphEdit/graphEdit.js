var STATE = "node";                  // `STATE` is what is selected in the menu, for example if the user selects "Create/Edit Nodes"
var items = {                        // `items` is the JSON data of the nodes an links on the board, to be used for saving/loading
  "nodeList": {},
  "linkList": {} 
};
var nodeIndex = 0;                   // `nodeIndex` is used for assigning unquie values to nodes from by an integer starting at 0 to n.
var nodeSize = 8;                    // The default radius of created nodes
var LEFT_MOUSE = 1;             
var RIGHT_MOUSE = 3;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Disable right-click context menu
canvas.oncontextmenu = function (){ return false; }

// Resize the canvas to fit the screen when the window is loaded or resized
$( window ).resize(function(){ adjustCanvasSize(); redraw(); } );
$( window ).load(adjustCanvasSize);

function adjustCanvasSize() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// When a button is clicked in the top menu, change the STATE and highlight the selection.
$("#menu > button").click(function(){
  $("#menu > button").removeClass("selected");
  $(this).addClass("selected");
  STATE = $(this).attr("id");
});

$("#canvas").mouseup(function(e) {
  // When the "Create/Edit Nodes" button is selected
  if( STATE === "node" )
  {
    // Get the position of the mouse, and make that the position the center of a new node.
    var cRect = canvas.getBoundingClientRect();
    var nodeOffset = Math.floor(nodeSize/2);
    var canvasX = e.clientX - cRect.left - nodeOffset;
    var canvasY = e.clientY - cRect.top - nodeOffset;  
    
    if( e.which == LEFT_MOUSE ) {      
      var newNode = new Node(canvasX,canvasY,nodeSize,0);
      redraw();
    }
    else if( e.which == RIGHT_MOUSE  ) 
      selectNode(canvasX, canvasY);
  }
});

//Change the value of a node when there is a change in the "Value" field:
$("#NodeValue").keyup(function(){
  if( $("#NodeID").val() )
  {
    affectedNode = items["nodeList"]["node_"+$("#NodeID").val()];
    affectedNode.value = $(this).val();
    affectedNode.size = +(ctx.measureText(affectedNode.value).width/2) + 5;
    console.log(affectedNode.size);
    redraw();
  }
});

// Go through each node, see if the (x,y) given at are at a node.
function selectNode(canvasX, canvasY) {
  var selected = false;    
  for( node in items["nodeList"])
  {
    var node = items["nodeList"][node];
    node.outlineColor = "black";
    if( dist(canvasX,canvasY,node.x, node.y) < node.size && !selected)
    {
      node.outlineColor = "yellow";
      selected = true;
      $("#NodeID").val(node.id);
      $("#NodeValue").val(node.value);
    }
  }
  // If nothing was selected, undo any existing selections
  if( selected ) $("#selection").show();
  else { $("#NodeID").val(""); $("#selection").hide(); }
  redraw();
}

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
  textSize = ctx.measureText(this.value).width;
  ctx.fillText(this.value, this.x - (textSize/2), this.y + 3 );
}

function redraw()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(item in items["nodeList"])
    items["nodeList"][item].draw();
}

function dist(x1,y1,x2,y2){ return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ); }