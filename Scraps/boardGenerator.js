/*
    For Neural Network (machine learning) AI, board generation and rules for checkers.
    Board: 'r' = red checker , 'R' = King red checker , ... , '0' = board (alt of W,G)
*/

var SIZE = document.getElementById("canvas").width;
var RED = "rgb(255,20,20)";
var GREY = "rgb(80,80,80)";

//Generate the starting board on the canvas. of n x n size.
function generateBoard(n)
{
    var color = GREY;
    var canvas = document.getElementById("canvas").getContext("2d");
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

generateBoard(8);