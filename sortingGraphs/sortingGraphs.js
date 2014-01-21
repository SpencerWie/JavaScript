var canvas;var ctx;

window.onload = function(){
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
loadChanges();
enable();

ctx.fillStyle = "#dddddd";
ctx.lineWidth = 2;
var speed = 7 ; // 0 being the fastest.
var array;

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

function drawCol(i){
   ctx.fillRect(i*barWidth+barWidth, canvas.height, -barWidth, -array[i]*heightRatio);
   ctx.strokeRect(i*barWidth+barWidth, canvas.height, -barWidth, -array[i]*heightRatio);
}

function bubble(){ // Bubble Sort
    for(var i=0; i<array.length; i++){
        (function(j){setTimeout(function() { // delay for outerloop
        for(var j=0; j<array.length; j++){
            (function(j){setTimeout(function() { // delay for inner loop
                if(array[j]>array[j+1]){
                    var t = array[j];
                    array[j] = array[j+1];
                    array[j+1] = t;
                }
                draw();
           }, speed*(j)); })(j); // end inner loop delay
        }
        }, speed*(i+j*array.length)); })(i); // end outer loop delay
    }
}

//Go from left->right, find smallest and place in position
function select(){ // Selection Sort
   for(var i=0; i<array.length; i++){
     (function(i){setTimeout(function() { // delay for outerloop
      small = i;
      for(var j=i; j<array.length; j++)
         if(array[j]<array[small]) small = j; 
      var t = array[i]; //Switch smallest and current pos
      array[i] = array[small];
      array[small] = t;
      ctx.fillStyle = "#dddddd";
      draw();
      ctx.fillStyle = "#22dd22";
      for(var k=i; k<array.length; k++) drawCol(k);
      if(i==array.length-1){ ctx.fillStyle = "#dddddd"; draw(); }
     }, speed*(i*array.length)); })(i); // end outer loop delay
   }
   draw();
}

//Build sorted array from left-right, placing all current right-most elements in order compared to the current sub-array
function insert(){ // Insertion Sort
   for(var i=0; i<array.length; i++){
    (function(i){setTimeout(function() { // delay for outerloop
      j=i;
      while(j>0 && array[j]<array[j-1]){
         t = array[j];
         array[j] = array[j-1];
         array[j-1] = t;
         j--;
      }
      ctx.fillStyle = "#dddddd";
      draw();
      ctx.fillStyle = "#ffffff";
      for(var k=i; k<array.length; k++) drawCol(k);
      if(i==array.length-1){ ctx.fillStyle = "#dddddd"; draw(); }
     }, speed*(i*array.length)); })(i); // end outer loop delay
   }
   draw();
}

//Sort array by picking a partiction and recurisvly sorting all smallest and largest elements to their respective sides (sm|P|la)...
function quickSort(Start, End){
   if(Start < End){
      setTimeout(function(){
         var piv = partition(Start, End);
          draw();
          ctx.fillStyle = "#bbbbff";
          drawCol(piv);
          ctx.fillStyle = "#dddddd";
         quickSort(Start,piv-1);
         quickSort(piv+1, End);
      },speed*20);
   }
   function swap(a,b){var t=array[a]; array[a]=array[b]; array[b]=t; }
   function partition(start, end){
      var pivot = array[end]; 
      var i = start - 1;
      for(var j=start; j<end; j++){
         if(pivot >= array[j]){ i++; swap(i,j); }
      }
      swap(i+1,end);
      return i+1;
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

function loadChanges(){
   if(localStorage.size){
    document.getElementById("size").value = localStorage.size;
    document.getElementById("speed").value = localStorage.speed;
    document.getElementById("sort").options[localStorage.selected].selected = true;
    }
}

function disable(){
   document.getElementById("Run").disabled = true;
   document.getElementById("size").disabled = true;
   document.getElementById("speed").disabled = true;
   document.getElementById("sort").disabled = true;
}

function enable(){
   document.getElementById("Run").disabled = false;
   document.getElementById("size").disabled = false;
   document.getElementById("speed").disabled = false;
   document.getElementById("sort").disabled = false;
}

function sleep(milliseconds) { // Make busy
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function runf(){
    disable();
    var size = document.getElementById("size").value;
    speed = parseInt(document.getElementById("speed").value);
    localStorage.size = size;
    localStorage.speed = speed;
    array = new Array(parseInt(size));
    makeOrderedArray();
    shuffle();
    largest = findLargest();
    barWidth = canvas.width / array.length;
    heightRatio = canvas.height / largest;
    var option = document.getElementById("sort");
    localStorage.selected = option.selectedIndex;
    option = option.options[option.selectedIndex].text;
    if(option == "Bubble")
      bubble();
    else if(option == "Selection")
      select();
    else if(option == "Insertion") 
      insert();
    else quickSort(0,array.length-1);
}