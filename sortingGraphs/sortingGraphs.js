var canvas;var ctx;

window.onload = function(){
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

ctx.fillStyle = "#dddddd";
ctx.lineWidth = 2;
var speed = 7 ; // 0 being the fastest.
var array;


//document.getElementById("Run").onclick = function(){ runf(); }

}

function findLargest(){
    var largest = array[0];
    for (var i = 0; i < array.length; i++)
        if (largest < array[i] ) largest = array[i];   
    return largest;
} 

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i<array.length; i++){
        ctx.fillRect(i*barWidth+barWidth, canvas.height, -barWidth, -array[i]*heightRatio);
        ctx.strokeRect(i*barWidth+barWidth, canvas.height, -barWidth, -array[i]*heightRatio);
    }
}

function bubble(){
    for(var i=0; i<array.length; i++){
        document.getElementById("Run").disabled = true;
        (function(j){setTimeout(function() { // delay for outerloop
        for(var j=0; j<array.length; j++){
            (function(j){setTimeout(function() { // delay for inner loop
                if(array[j]>array[j+1]){
                    var t = array[j];
                    array[j] = array[j+1];
                    array[j+1] = t;
                }
                draw(array);
           }, speed*(j)); })(j); // end inner loop delay
        }
        }, speed*(i+j*array.length)); })(i); // end outer loop delay
    }
}

function shuffle() { // shuffle by random swaps.
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}

function makeOrderedArray(){
    for(var i=0;i<array.length;i++) array[i] = i+1;
}

function runf(){
    var size = document.getElementById("size").value;
    speed = parseInt(document.getElementById("speed").value);
    array = new Array(parseInt(size));
    makeOrderedArray();
    shuffle();
    largest = findLargest();
    barWidth = canvas.width / array.length;
    heightRatio = canvas.height / largest;
    bubble();
}