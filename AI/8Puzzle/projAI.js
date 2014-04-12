board = [
    [2,0,3],
    [1,5,6],
    [4,7,8]
];
fringe = [];
parentList = [];

MAXSEARCH = 10000; // Largest size of fringe before stop looking
cost = 0;

function drawBoard(Board){
    $("td").text(" "); // clear the current board
    for(var i = 1; i<4; i++){
        for(var j = 1; j<4; j++){
            if(Board[i-1][j-1] != 0)
                $("table tr:nth-child("+i+") td:nth-child("+j+")").text(Board[i-1][j-1]);
        }
    }
}

//Give the solution node tranverse the tree and get the path to the top, then flip it and show it as an animation.
function showSolution(node){
  if(node.value!=[[1,2,3],[4,5,6],[7,8,9]]){
   var solutionList = [node]
   var parentNode = node.parent;
   var deapth = node.deapth;
   var index = 0;
   for(var i=0; i<deapth; i++){
      solutionList.unshift(parentNode);
      if(parentNode.parent) parentNode = parentNode.parent;
   }
   console.log(solutionList);
   solTimer = setInterval(function(){
      index++;
      drawBoard(solutionList[index].value);
      if(index>=deapth) clearInterval(solTimer);
   },200);
  }
}

//Random by swaping randomly, the number of times given by the user.
function randBoard(swapTimes){
    for(var i = 0; i<swapTimes; i++){
        
        var index = [0,0];
        //Find "0" square
        for(var j=0; j<3; j++){
            index[1] = board[j].indexOf(0);
            index[0] = j;
            if(index[1]!=-1) break;
        }
        var moves = []
        //Find possible moves, and pick one randomly
        if(index[1]+1 < 3) moves.push([index[0],index[1]+1]);
        if(index[1]-1 > -1) moves.push([index[0],index[1]-1]);
        if(index[0]+1 < 3) moves.push([index[0]+1,index[1]]);
        if(index[0]-1 > -1) moves.push([index[0]-1,index[1]]);
        var ranMove = Math.floor(Math.random()*moves.length);
        ranMove = moves[ranMove];
        
        // Swap them
        var t = board[index[0]][index[1]];
        board[index[0]][index[1]] = board[ranMove[0]][ranMove[1]];
        board[ranMove[0]][ranMove[1]] = t;
    }
    drawBoard(board); // redraw the board
}

// Generate the tree in a sequencal order until the solution is found. Looking through all nodes from left to right. Note that this can generate a lot of memeory and looking time.
function breathFirstSearch(){
   document.getElementById("output").innerHTML = ""
    fringe = [board]; // Make the fringe the current board, this will be the root.
    while(true){
        if(fringe.length == 0) { parentList = []; return false; }
        var node = fringe.shift();
        parentList.push(node);
        if(checkSolution(node)) { 
            drawBoard(node); 
            board = node ;
            document.getElementById("output").style.color = "green";
            document.getElementById("output").innerHTML = "Found Solution!"
            return node; 
        }
        var children = getChildren(node);
        for(var i=0; i<children.length; i++)
            fringe.push(children[i]);
        if(fringe.length>MAXSEARCH) {
            document.getElementById("output").style.color = "red";
            document.getElementById("output").innerHTML = "Could not find solution."
            break;
        }
    }
}

// Simlar generation to breath first but the picked nodes will be the least cost along with the closest to the goal state based on the number of match tiles to the goal.
function AStarSearch(){
   document.getElementById("output").innerHTML = ""
    var c = 0;
    var root = new Node(board,0,0);
    root.deapth = 0;
    fringe = [root];
    while(true){
        c++;
        var node = getLowestCost(fringe);
        for(var i=0; i<fringe.length;i++) if(compareArray(fringe[i].value,node.value)) fringe.splice(i,1);
  
        if(checkSolution(node.value)) { 
            //drawBoard(node.value); 
            board = node.value;
            document.getElementById("output").style.color = "green";
            document.getElementById("output").innerHTML = "Found Solution!"
            showSolution(node);
            return node.value; 
        }
        var children = getChildren(node.value);
        evalNodes(children, node);
        if(c>10000) {
            document.getElementById("output").style.color = "red";
            document.getElementById("output").innerHTML = "Error"
            break;
        }
        if(fringe.length == 0) { parentList = []; return false; }
    }
}

//Will return points based on how "good (lower points)" the node is.
function evalNodes(nodes, parent){
    var sol = [[1,2,3],[4,5,6],[7,8,0]];
    // Check how close it is to the goal state-wise
    for(var k=0; k<nodes.length; k++){
     var c = 0; 
     points = 1;
     points += parent.deapth; // this needs to be deapth based
     for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            c++;
            if(nodes[k][i][j] == c) points -= 1;
        }
     }
     if(nodes[k][2][2] == 0) points -= 1;
     if(compareArray(nodes[k],sol)) points = -9999;
     var nNode = new Node(nodes[k], points, parent);
     fringe.unshift(nNode);
    }
       // This gives details on each node for the fringe, but slows the program, uncomment this for details to the solution.
        /*var str = "("
        for(var i=0; i<fringe.length; i++) str+="["+fringe[i].value+" ~D:"+fringe[i].deapth+", P:"+fringe[i].deapth+"~ ] "
        console.log(str+")");*/
}

function getChildren(node){
    // Based on where "0" is apply moves to get children
    // Check possibly 4 items next to the "0" node
    var index = [0,0];
    //Find "0" square
    for(var i=0; i<3; i++){
        index[1] = node[i].indexOf(0);
        index[0] = i;
        if(index[1]!=-1) break;
    }
    var childrenPos = [];
    //Find possible moves
        if(index[1]+1 < 3) childrenPos.push([index[0],index[1]+1]);
        if(index[1]-1 > -1) childrenPos.push([index[0],index[1]-1]);
        if(index[0]+1 < 3) childrenPos.push([index[0]+1,index[1]]);
        if(index[0]-1 > -1) childrenPos.push([index[0]-1,index[1]]);
    // Convert to boards
    var children = [];
    var dupCheck = false;
    // Make doublicate items with possible moves
    for(var i=0; i<childrenPos.length; i++){
        var newNode = $.extend(true, [],node);
        var t = newNode[childrenPos[i][0]][childrenPos[i][1]];
        newNode[childrenPos[i][0]][childrenPos[i][1]] = newNode[index[0]][index[1]]
        newNode[index[0]][index[1]] = t
        for(var j=0; j<fringe.length; j++) 
            if(typeof fringe[j].value == "object")
               if(compareArray(fringe[j].value,newNode)){dupCheck=true;break;}
            else
               if(compareArray(fringe[j],newNode)){dupCheck=true;break;}
        if(!dupCheck) children.push(newNode);
        dupCheck=false;
    }
    return children;
}
    
function checkSolution(node){
    var solution = 0;
    for(var i = 0; i<3; i++){
        for(var j = 0; j<3; j++){
            if(i==2 && j==2){
                if(node[i][j] != 0) return false; // Last item is 0
            } else {
                solution++;
                if(node[i][j] != solution) return false; // All items but last is 1->8
            }
        }
    }
    return true;
}

function compareArray(a, b) {
    return a.toString() == b.toString();
}

function getLowestCost(items){
    var lowest = items[0].cost;
    var lowNode = items[0];
    for(var i=0; i<items.length; i++){
        if(items[i].cost < lowest){
            lowest = items[i].cost; 
            lowNode = items[i]; 
        }
    }
    return lowNode;
}

$("#reset").click(function(){ 
    board = [[1,2,3],[4,5,6],[7,8,0]];
    drawBoard(board);
    $("#output").text("");
});
$("#random").click(function(){ randBoard(30); });
$("#step").click(function(){ randBoard(1); });
$("#BFS").click(function(){ parentList = []; breathFirstSearch() });
$("#aStar").click(function(){ parentList = []; AStarSearch() });

function Node(value, cost, parent){
    this.value = value;
    this.cost = cost;
    this.deapth = 0;
    if(typeof parent == 'object') this.deapth = parent.deapth+1;
    else this.deapth = 0;
    if(typeof parent == 'object') this.parent = parent;
    else this.parent = null;
}

drawBoard(board);