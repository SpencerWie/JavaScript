/*
    For Neural Network (machine learning) AI, board generation and rules for checkers.
    Board: 'r' = red checker , 'R' = King red checker , ... 
           'rP' = possible position red checker, 'RP' = possible position king red checker, ...
           
    Notes : Jumps must be made, advantage because no eval needs to be used. Hence we need to focus on the
    positioning of the board. From the generated eval function
*/

var SIZE = document.getElementById("canvas").width;
var RED = "rgb(255,20,20)";
var GREY = "rgb(80,80,80)";
var canvas = document.getElementById("canvas").getContext("2d");
canvas.font="20px Arial";

var Board = [
    ['0','b','0','b','0','b','0','b'],
    ['b','0','b','0','b','0','b','0'],
    ['0','b','0','b','0','0','0','b'],
    ['0','0','0','0','0','0','b','0'],
    ['0','0','0','0','0','r','0','0'],
    ['r','0','r','0','0','0','r','0'],
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
    var c=0;
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board.length; j++){
        c++;
            canvas.beginPath();
            if(board[i][j] == 'r'){
                canvas.fillStyle = "#dd0000";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
            }
            if(board[i][j] == 'b'){
                canvas.fillStyle = "#333333";
                canvas.arc(j*size+(size/2),i*size+(size/2),(size/2)-5,0,2*Math.PI);
            }
            if(Board[i][j] == "rP" || Board[i][j] == "bP" || Board[i][j] == "RP" || Board[i][j] == "BP") Board[i][j]="0";
            canvas.fill();
            canvas.stroke();
            //canvas.fillText(c,j*size+(size/2),i*size+(size/2));
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
               var size = Math.floor(SIZE/Board.length);
               var C = c.toUpperCase();
               // I is for vertical direction, oC means other color.
               if(c == 'r') { var I = -1; var oc = 'b'} else { I = 1; var oc = 'r'}
               var oC = oc.toUpperCase();
               
               if(Board[i+I][j+1]==oc || Board[i+I][j+1]==oC){
                  canvas.fillRect((j+2)*size,i+(2*I)*size,size,size);
                  if(Board[i+(2*I)][j+2]=="0"){
                     if(Board[i][j]==c) Board[i+(2*I)][j+2] = c+"P";
                     else if(Board[i][j]==C) Board[i+(2*I)][j+2] = C+"P";
                  }
               } else if(Board[i+I][j+1]=='0') {  
                  canvas.fillRect((j+1)*size,(i+I)*size,size,size); 
                  if(Board[i][j]==c) Board[i+I][j+1] = c+"P";
                  else Board[i+I][j+1] = C+"P";
               }
               
               if(Board[i+I][j-1]==oc || Board[i+I][j-1]==oC){
                  canvas.fillRect((j-2)*size,(i+(2*I))*size,size,size);
                  if(Board[i+(2*I)][j-2]==c) Board[i+(2*I)][j-2] = c+"P";
                  if(Board[i+(2*I)][j-2]=="0"){
                     if(Board[i][j]==c) Board[i+(2*I)][j-2] = c+"P";
                     else if(Board[i][j]==C) Board[i+(2*I)][j-2] = C+"P";
                  }
               } else if(Board[i+I][j-1]=='0') {
                  canvas.fillRect((j-1)*size,(i+I)*size,size,size); 
                  if(Board[i][j]==c) Board[i+I][j-1] = c+"P";
                  else Board[i+I][j-1] = C+"P";
               }
               
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
   selectPiece(mousePos.x, mousePos.y);
}, false);

generateBoard(8);
drawPieces(Board);