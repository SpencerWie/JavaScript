/*
    For Neural Network (machine learning) AI, board generation and rules for checkers.
    Board: 'r' = red checker , 'R' = King red checker , ... 
           'rP' = possible position red checker, 'RP' = possible position king red checker, ...
           
    Notes : 
    
    *Jumps must be made, advantage because no eval needs to be used. Hence we need to focus on the
    positioning of the board. From the generated eval function.
    
    * minimax search (with aplha pruning for efficency) for the computer to play itself. Aka. Always make the best
    move depending on the board position.
    
    |-----|
    | i,j | ...
    |-----|
       .
       .
       .
*/

var SIZE = document.getElementById("canvas").width;
var RED = "rgb(255,20,20)";
var GREY = "rgb(80,80,80)";
var canvas = document.getElementById("canvas").getContext("2d");
canvas.font="20px Arial";
var moving = false; // determine if the play is moving a piece.
Root = new Node(null, null, null, null, 0);
deapth = 4;
DEAPTH = 4;

var Board = [
    ['0','b','0','b','0','b','0','b'],
    ['b','0','b','0','b','0','b','0'],
    ['0','b','0','b','0','b','0','b'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['r','0','r','0','r','0','r','0'],
    ['0','r','0','r','0','r','0','r'],
    ['r','0','r','0','r','0','r','0']
];


var oldBoard = Board;

//Generate the starting board on the canvas. of n x n size.
function generateBoard(n)
{
    var color = GREY;
    var size = Math.floor(SIZE/n);
    document.getElementById("canvas").height = size*n;
    document.getElementById("canvas").width = size*n;
    canvas.fillStyle = color;
    for(var i=0; i<n; i++){
            if( color == RED ) {
                canvas.fillStyle = GREY;
                color = GREY;
            } else {
                canvas.fillStyle = RED;
                color = RED;
            }
        for(var j=0; j<n-i ;j++){
        canvas.fillRect(j*size,j*size+i*size,size,size);
        canvas.fillRect(j*size+i*size,j*size,size,size);
        }
    }
}

function drawPieces(board){
   
    var size = Math.floor(SIZE/board.length);
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board.length; j++){
            canvas.beginPath();
            if(board[i][j] == 'r' || board[i][j] == 'R'){
                canvas.fillStyle = "#dd0000";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
                if(board[i][j] == 'R'){
                  canvas.arc(j*size+(size/2)-3,i*size+(size/2)-3,(size/2)-5,0,2*Math.PI);
                }
            }
            if(board[i][j] == 'b' || board[i][j] == 'B'){
                canvas.fillStyle = "#333333";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
                if(board[i][j] == 'B'){
                  canvas.arc(j*size+(size/2)-3,i*size+(size/2)-3,(size/2)-5,0,2*Math.PI);
                }
            }
            canvas.fill();
            canvas.stroke();
        }
    }    
}

function removePiece(x, y){
   drawPieces(Board);
   var size = Math.floor(SIZE/Board.length);
   for(var i=0; i<Board.length; i++)
      for(var j=0; j<Board.length; j++)
         if(x>=j*size && x<=(j+1)*size && y>=i*size && y<=(i+1)*size)
            Board[i][j] = '0';
}

function selectPiece(x, y){
   drawPieces(Board);
   var size = Math.floor(SIZE/Board.length);
   for(var i=0; i<Board.length; i++){
      for(var j=0; j<Board.length; j++){
          if(Board[i][j] == 'r'){
            if(x>=j*size && x<=(j+1)*size && y>=i*size && y<=(i+1)*size){
               canvas.beginPath();
               canvas.fillStyle = "rgba(255,255,255,0.3)";
               canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
               canvas.fill();
               getMoves('r',i,j);
               return;
               }
          }
          if(Board[i][j] == 'b'){
            if(x>=j*size && x<=(j+1)*size && y>=i*size && y<=(i+1)*size){
               canvas.beginPath();
               canvas.fillStyle = "rgba(255,255,255,0.3)";
               canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
               canvas.fill();
               getMoves('b',i,j);
               return;
            }
          }
      }
   }
}

// Takes piece color and returns possible moves.
function getMoves(c,i,j)
{
               moving = true;
               var size = Math.floor(SIZE/Board.length);
               var C = c.toUpperCase();
               // I is for vertical direction, oC means other color.
               if(c == 'r') { var I = -1; var oc = 'b'} else { I = 1; var oc = 'r'}
               var oC = oc.toUpperCase();
               
               // make info more compact loop. (optional)
               
               if(Board[i+I][j+1]==oc || Board[i+I][j+1]==oC){
                  if(Board[i+(2*I)][j+2]=="0"){
                     canvas.fillRect((j+2)*size,(i+(2*I))*size,size,size);
                     if(Board[i][j]==c) Board[i+(2*I)][j+2] = c+"P";
                     else if(Board[i][j]==C) Board[i+(2*I)][j+2] = C+"P";
                  }
               } else if(Board[i+I][j+1]=='0') {  
                  canvas.fillRect((j+1)*size,(i+I)*size,size,size); 
                  if(Board[i][j]==c) Board[i+I][j+1] = c+"P";
                  else Board[i+I][j+1] = C+"P";
               }
               
               if(Board[i+I][j-1]==oc || Board[i+I][j-1]==oC){
                  if(Board[i+(2*I)][j-2]=="0"){
                     canvas.fillRect((j-2)*size,(i+(2*I))*size,size,size);
                     if(Board[i][j]==c) Board[i+(2*I)][j-2] = c+"P";
                     else if(Board[i][j]==C) Board[i+(2*I)][j-2] = C+"P";
                  }
               } else if(Board[i+I][j-1]=='0') {
                  canvas.fillRect((j-1)*size,(i+I)*size,size,size); 
                  if(Board[i][j]==c) Board[i+I][j-1] = c+"P";
                  else Board[i+I][j-1] = C+"P";
               }
               
               Board[i][j] += "M";
               
}


function movePiece(x,y){
   var size = Math.floor(SIZE/Board.length);
   var pieceMove = false;
   var X ; var Y ; // old pos piece
   // loop compact note.
   for(var i=0; i<Board.length; i++){
      for(var j=0; j<Board.length; j++){
         // Find possible moves, then check if the user clicked, make the piece move to the square.
         if(Board[i][j]=='rP'){
            if(x>=j*size && x<(j+1)*size && y>=i*size && y<(i+1)*size) {
               Board[i][j] = 'r';
               pieceMove = true;
               break;
            }
         }
         if(Board[i][j]=='bP'){
            if(x>=j*size && x<(j+1)*size && y>=i*size && y<(i+1)*size) {
               Board[i][j] = 'b';
               pieceMove = true;
               break;
            }
         }
      if(Board[i][j] == "rP" || Board[i][j] == "bP" || Board[i][j] == "RP" || Board[i][j] == "BP") Board[i][j]="0";
      if(Board[i][j] == "rM"){ X = i ; Y = j; Board[i][j]='r'; }
      if(Board[i][j] == "bM"){ X = i ; Y = j; Board[i][j]='b'; }
      }
   }
   if(pieceMove){ 
      /*if(Board[X][Y]=='r'){
         if(Board[X+1][Y+1]=='b' || Board[X+1][Y+1]=='B') {Board[X+1][Y+1] = '0';}
         else if(Board[X-1][Y+1]=='b' || Board[X-1][Y+1]=='B') {Board[X-1][Y+1] = '0';}
      }*/
      
      Board[X][Y]='0';
   }
   moving = false;
   drawPieces(Board);
}

function minimax(d, root, color){
   // root be current pos, nodes be next move. (do just single move for now, then ply-2 or ply-3)
   oldBoard = Board;
   Root = new Node(null, 0, root, null, 0);
   var childBoards = getNextMoves(color,root);
   var childValues = [];
   for(var i=0; i<childBoards.length; i++)
      childValues.push(eval(childBoards[i])); 
   Root.children = [];
   for(var i=0; i<childBoards.length; i++)
      Root.children.push(new Node(root, childValues[i], childBoards[i], null, Root.deapth+1));
   
   // dig in the tree looking at all next moves (looking ahead by deapth)
   searchLevel(color, Root.children, deapth);
   
   // perform a minimax on the tree, we want to assume the other person is perfect.
   Board = search_minimax(color, Root).board;
   
   generateBoard(8);
   drawPieces(Board);
}

// Contruct the game tree of ply-3.
function searchLevel(color,parents, level){
   if(color == 'r') color = 'b';
   else color = 'r';
   if(level<1) return;
   for(var j=0; j<parents.length; j++)
   {
      var childBoards = getNextMoves(color,parents[j].board);
      var childValues = [];
      for(var i=0; i<childBoards.length; i++)
         childValues.push(eval(childBoards[i])); 
      parents[j].children = [];
      for(var i=0; i<childBoards.length; i++)
         parents[j].children.push(new Node(parents[j], childValues[i], childBoards[i], null, parents[j].deapth+1)); 
      if(parents[j].children!=null)searchLevel(color,parents[j].children, level-1);         
  }
}

// Minimax looks through the nodes finding the largest of children, the smallest depending on black or red. Red finds max while black min. ply-3.
function search_minimax(color, start){

   /*if(color == 'r') color = 'b';
   else color = 'r';
   for(var i=0; i<Root.children.length; i++)
   {
      for(var j=0; j<Root.children[i].children.length; j++){
         for(var k=0; k<Root.children[i].children[j].children.length; k++){
            for(var l=0; l<Root.children[i].children[j].children[k].children.length; l++){
               if(color == 'r') Root.children[i].children[j].children[k].children[l].value = getMax(Root.children[i].children[j].children[k].children[l].children).value;
               else Root.children[i].children[j].children[k].children[l].value = getMin(Root.children[i].children[j].children[k].children[l].children).value;
            }
         }
      }
   }*/
   if(color == 'r') color = 'b';
   else color = 'r';
   
   for(var i=0; i<Root.children.length; i++)
   {
      for(var j=0; j<Root.children[i].children.length; j++){
         for(var k=0; k<Root.children[i].children[j].children.length; k++){
            if(color == 'r') Root.children[i].children[j].children[k].value = getMax(Root.children[i].children[j].children[k].children).value;
            else Root.children[i].children[j].children[k].value = getMin(Root.children[i].children[j].children[k].children).value;
         }
      }
   }
   if(color == 'r') color = 'b';
   else color = 'r';
   
   for(var i=0; i<Root.children.length; i++)
   {
      for(var j=0; j<Root.children[i].children.length; j++){
         if(color == 'r') Root.children[i].children[j].value = getMax(Root.children[i].children[j].children).value;
         else Root.children[i].children[j].value = getMin(Root.children[i].children[j].children).value;
      }
   }
   if(color == 'r') color = 'b';
   else color = 'r';

   for(var i=0; i<Root.children.length; i++)
   {
      if(color == 'r') Root.children[i].value = getMax(Root.children[i].children).value;
      else Root.children[i].value = getMin(Root.children[i].children).value;
   }

   if(color == 'r') color = 'b';
   else color = 'r';

   if(color == 'r') return getMax(Root.children);
   else return getMin(Root.children);
}

// gets the max value node and returns the coor board
function getMax(children){
   var max = 0;
   for(var i=0; i<children.length; i++)
      if(children[i].value > children[max].value) max = i;
   return children[max];
}

function getMin(children){
   var min = 0;
   for(var i=0; i<children.length; i++)
      if(children[i].value < children[min].value) min = i;
   return children[min];
}



// Evaulates how good a board position is based on what color the person is.
function eval(Board)
{
   // Setup weights (these will chage for our AI)
   var W_normal_piece = 10;       // value for a normal piece
   var W_king_piece = 20;         // value for a king piece
   var W_dist_piece = 1;       // value for how far up a normal peice is  
   //var W_center = 1;           // value for how central a piece is.
   //var W_offense = 3;          // value on piece attacking another piece.
   var W_defense = 0.5;          // value on how well a piece is protected.
   
   // Get our pieces and opponents piece
   var points = 0;
   
   var back_i = Board.length-1;
   for(var i=0; i<Board.length; i++){
      for(var j=0; j<Board.length; j++)
      {
          // First we do a basic piece count    
         if(Board[i][j] == 'r') points += W_normal_piece;
         else if(Board[i][j] == 'R') points += W_king_piece;
         else if(Board[i][j] == 'b') points -= W_normal_piece;
         else if(Board[i][j] == 'B') points -= W_king_piece;
         
         // Now we see how far the up each piece is (red wants to be on top while black on bottom) - only for normal pieces
         if(Board[i][j] == 'r') points += back_i*W_dist_piece;
         if(Board[i][j] == 'b') points -= i*W_dist_piece;
         
         // Check how close to the center a piece is (j = 5,4) = center (j = 0,7) = edge - only for normal pieces
         // if(Board[i][j] == 'r') points += checkMiddle(j, W_center);
         // if(Board[i][j] == 'b') points -= checkMiddle(j, W_center);
         
         // Check defense for pieces add for each defended side.
         //if(Board[i][j] == 'r') points += checkDefense('r' ,i, j, W_defense, Board);
         //if(Board[i][j] == 'b') points -= checkDefense('b' ,i, j, W_defense, Board);
         
      }
      back_i--;
   }
   return points;
}

function getNextMoves(color, Board)
{
   var boardArray = [];
   var jumpArray = [];
   var newBoard = copyArray(Board);
   var m = 0; // m is based on which piece we are were to look for defenders, red is behind while back infront.
   if(color == 'r' ) { m = -1; op_color = 'b'; }
   else { m = 1; op_color = 'r'; }
   var kColor = color.toUpperCase();
   for(var i=0; i<Board.length; i++)
   {
      for(var j=0; j<Board.length; j++)
      {
         if((Board[i][j] == color || Board[i][j] == color.toUpperCase())  && (i+m) < 8 && (i+m) > -1 ){
            // Check for open spots for red and black
            if(Board[i+m][j+1] == '0' && (j+1) < 8)
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0'; 
               if(piece == 'r' && i+m == 0) piece = 'R';
               if(piece == 'b' && i+m == 7) piece = 'B';
               newBoard[i+m][j+1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            if(Board[i+m][j-1] == '0' && (j-1) > -1)
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0'; 
               if(piece == 'r' && i+m == 0) piece = 'R';
               if(piece == 'b' && i+m == 7) piece = 'B';               
               newBoard[i+m][j-1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            
            // Now check for jumps
            if( ((i+(m*2))>-1 && (i+(m*2))<8 && (j+2)>-1) && (Board[i+m][j+1] == op_color || Board[i+m][j+1] == op_color.toUpperCase()) && Board[i+(m*2)][j+2] == '0') 
            {
               newBoard[i+m][j+1] = '0'; 
               var piece = Board[i][j];
               if(piece == 'r' && i+(m*2) == 0) piece = 'R';
               if(piece == 'b' && i+(m*2) == 7) piece = 'B';
               newBoard[i+(m*2)][j+2] = piece;
               newBoard[i][j] = '0';
               jumpArray.push(newBoard);
               newBoard = copyArray(Board);
            }
            if(((i+(m*2))>-1 && (i+(m*2))<8 && (j-2)<8) && (Board[i+m][j-1] == op_color || Board[i+m][j-1] == op_color.toUpperCase()) && Board[i+(m*2)][j-2] == '0' ) 
            {
               newBoard[i+m][j-1] = '0'; 
               var piece = Board[i][j];
               if(piece == 'r' && i+(m*2) == 0) piece = 'R';
               if(piece == 'b' && i+(m*2) == 7) piece = 'B';
               newBoard[i+(m*2)][j-2] = piece;
               newBoard[i][j] = '0';
               jumpArray.push(newBoard);
               newBoard = copyArray(Board);
            }
         }
            // King moves
            if( (j+1) < 8 && (i+1) < 8 && (Board[i][j] == kColor) &&  Board[i+1][j+1] == '0')
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0'; 
               newBoard[i+1][j+1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            if((j-1) > -1&& (i+1) < 8 && (Board[i][j] == kColor) && Board[i+1][j-1] == '0' )
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0';            
               newBoard[i+1][j-1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            if(  (j+1) < 8 && (i-1) > -1 && (Board[i][j] == kColor) &&  Board[i-1][j+1] == '0' )
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0'; 
               newBoard[i-1][j+1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            if(  (j-1) > -1 && (i-1) > -1 && (Board[i][j] == kColor) && Board[i-1][j-1] == '0')
            { 
               var piece = Board[i][j];
               newBoard[i][j] = '0';            
               newBoard[i-1][j-1] = piece; 
               boardArray.push(newBoard); 
               newBoard = copyArray(Board);
            }
            // King jumps
            if(  (i+2)>-1 && (i+2)<8 && (j+2)>-1 && (Board[i][j] == kColor) && Board[i+1][j+1] == op_color.toLowerCase() && Board[i+2][j+2] == '0') 
            {
               newBoard[i+1][j+1] = '0'; 
               var piece = Board[i][j];
               newBoard[i+2][j+2] = piece;
               newBoard[i][j] = '0';
               jumpArray.push(newBoard);
               newBoard = copyArray(Board);
            }
            if(  (i-2)>-1 && (i-2)<8 && (j-2)<8 && (Board[i][j] == kColor) && Board[i-1][j-1] == op_color.toLowerCase() && Board[i-2][j-2] == '0' ) 
            {
               newBoard[i-1][j-1] = '0'; 
               var piece = Board[i][j];
               newBoard[i-2][j-2] = piece;
               newBoard[i][j] = '0';
               jumpArray.push(newBoard);
               newBoard = copyArray(Board);
            }
      }
   }
   
   if(jumpArray.length>0) return jumpArray;
   if( boardArray.length<1 ) boardArray.push(Board);
   return boardArray;
}

function printNextMoves(color,board){
   boardArray = getNextMoves(color, board);
   console.log(boardArray);
   for(var i = 0; i<boardArray.length; i++)
      printBoard(boardArray[i]);
}

function checkDefense(color, i, j, W_defense, Board)
{
   var points = 0; var m = 0; // m is based on which piece we are were to look for defenders, red is behind while back infront.
   if(color == 'r' || color == 'R') m = 1;
   else m = -1;
   if( j == 0 || j == 7 || i == 0 || i == 7) points += W_defense*2; // edge is defended
   else
   {
      if( Board[i+m][j+1] == color) points += W_defense // If on the (right-bottom side).
      if( Board[i+m][j-1] == color) points += W_defense // If on the (left-bottom side).
   }
   return points;
}

function getMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function printBoard(board){
   var str = "";
   for(var i=0; i<board.length; i++){
      for(var j=0; j<board.length; j++){
         str+=board[i][j]+" ";
      }
      str+="\n";
   }
   console.log(str);
}

function copyArray(array){
var newArray = [];

for (var i = 0; i < array.length; i++)
    newArray[i] = array[i].slice();
return newArray;
}

function Node(parent, value, board, children, deapth) 
{
   this.parent = parent; // parent node.
   this.children = children // array of nodes.
   this.value = value; // number
   this.board = board; // coorisponding board
   this.deapth = deapth;
}

document.getElementById("canvas").addEventListener('mouseup', function(evt) {
   var mousePos = getMousePos(document.getElementById("canvas"), evt);
   generateBoard(8);
   if(evt.button == 0){
      if(!moving) selectPiece(mousePos.x, mousePos.y);
      else movePiece(mousePos.x, mousePos.y);
   }
   if(evt.button == 1){
      removePiece(mousePos.x, mousePos.y);
   }
   drawPieces(Board);
}, false);

document.addEventListener('keyup', function(evt) {
   if(evt.keyCode == 38) minimax(0,Board,'r');
   else if(evt.keyCode == 40) minimax(0,Board,'b');
}, false);

generateBoard(8);
drawPieces(Board);