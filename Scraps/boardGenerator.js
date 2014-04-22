/*
    For Neural Network (machine learning) AI, board generation and rules for checkers.
    Board: 'r' = red checker , 'R' = King red checker , ... 
           'rP' = possible position red checker, 'RP' = possible position king red checker, ...
           
    Notes : 
    
    *Jumps must be made, advantage because no eval needs to be used. Hence we need to focus on the
    positioning of the board. From the generated eval function.
    
    * minimax search (with aplha pruning for efficency) for the computer to play itself. Aka. Always make the best
    move depending on the board position.
    
    * NN - for the nerual network (1st pass), we will use the expert system use algothrim in order to use a weights in      
    the nerual network as board positions as outputs. This should diverege to the oringal system (or come to the limit).
    
    * Expert system eval(), for this we have the board state into the eval function. Then we look at all other next         
    moves and calculate their value (based on how good the move is [offense, defensize, cenerality]), if this was a         
    single look-head we would stop and pick the best one as the next move. Or we could diverge futher and look for each     
    move, the possible next moves. This would take more time but be more accurate , for n moves it would be 2^n next       
    moves. 2-move-look ahead will be used for the expert sytem AI.
    
    * NextMove Checking - We need to find the next possible move for each position, this is the 1st step before the        
    eval().
*/

var SIZE = document.getElementById("canvas").width;
var RED = "rgb(255,20,20)";
var GREY = "rgb(80,80,80)";
var canvas = document.getElementById("canvas").getContext("2d");
canvas.font="20px Arial";
var moving = false; // determine if the play is moving a piece.

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
            if(board[i][j] == 'r'){
                canvas.fillStyle = "#dd0000";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
            }
            if(board[i][j] == 'b'){
                canvas.fillStyle = "#333333";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
            }
            canvas.fill();
            canvas.stroke();
        }
    }    
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
   for(var i=0; i<Board.length; i++){
      for(var j=0; j<Board.length; j++){
         // Find possible moves, then check if the user clicked, make the piece move to the square.
         if(Board[i][j]=='rP'){
            //alert(x+","+y+"\n"+"x:("+j*size+","+(j+1)*size+") | y:("+i*size+","+(i+1)*size+")");
            if(x>=j*size && x<(j+1)*size && y>=i*size && y<(i+1)*size) {
               Board[i][j] = 'r';
               pieceMove = true;
               break;
            }
         }
      if(Board[i][j] == "rP" || Board[i][j] == "bP" || Board[i][j] == "RP" || Board[i][j] == "BP") Board[i][j]="0";
      if(Board[i][j] == "rM"){ X = i ; Y = j; Board[i][j]='r'; }
      }
   }
   if(pieceMove) Board[X][Y]='0';
   moving = false;
}

function getMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function printBoard(){
   var str = "";
   for(var i=0; i<Board.length; i++){
      for(var j=0; j<Board.length; j++){
         str+=Board[i][j]+" ";
      }
      str+="\n";
   }
   console.log(str);
}

document.getElementById("canvas").addEventListener('mouseup', function(evt) {
   var mousePos = getMousePos(document.getElementById("canvas"), evt);
   generateBoard(8);
   drawPieces(Board);
   if(!moving) selectPiece(mousePos.x, mousePos.y);
   else movePiece(mousePos.x, mousePos.y)
   drawPieces(Board);
}, false);

generateBoard(8);
drawPieces(Board);
