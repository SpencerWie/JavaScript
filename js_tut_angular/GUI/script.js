console.log("foo");

onceLoaded("#ex_canvas", function(){
  var canvas = document.getElementById("ex_canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";

  var myBox = new Box(10,10,30); // x = 10  y = 50  size = 10

  function main()
  {
      // * Clear the Canvas
      ctx.clearRect(0,0,canvas.width,canvas.height);
      
      // * Update Items
      
      // If our box hits the sides of the canvas reverse it's direction.
      if(myBox.x > canvas.width - myBox.size || myBox.x < 0)
          myBox.vel = -myBox.vel;
      
      myBox.moveX();
      
      // * Draw Items
      myBox.draw();
  }

  function Box(x, y, size)
  {
      this.x = x;
      this.y = y;
      this.size = size;
      this.vel = 3; // speed and direction for our box
      
      this.moveX = function() {
           this.x += this.vel; 
      }
      this.draw = function() {
           ctx.fillRect(this.x, this.y, this.size, this.size); 
      }
  }


  setInterval(function(){main()}, 30);
});

onceLoaded("#keyCanvas", function(){
  var k_canvas = document.getElementById("keyCanvas");
  var k_ctx = k_canvas.getContext("2d");
  k_ctx.font = "20px Arial";
  k_ctx.fillText("keyCode = ",5,40);
  k_ctx.font = "30px Arial";

  document.addEventListener("keydown", function(e) { 
      k_ctx.clearRect(100,0,k_canvas.width,k_canvas.height);
      k_ctx.fillText(e.keyCode,110,40);
  });
});

onceLoaded("#mouseCanvas", function(){
  var m_canvas = document.getElementById("mouseCanvas");
  var m_ctx = m_canvas.getContext("2d");
  m_ctx.font = "20px Arial";

  m_canvas.addEventListener("mousemove", function(e) { 
      var cRect = m_canvas.getBoundingClientRect();
      var canvasX = Math.round(e.clientX - cRect.left);
      var canvasY = Math.round(e.clientY - cRect.top);
      m_ctx.clearRect(0,0,m_canvas.width,m_canvas.height);
      m_ctx.fillText("X: "+canvasX+", Y: "+canvasY,10,30);
  });
});

onceLoaded("#soundCanvas", function(){
  var a_canvas = document.getElementById("soundCanvas");
  var a_ctx = a_canvas.getContext("2d");
  a_ctx.font = "20px Arial";
  a_ctx.fillText("Click to play",20,30);

  a_canvas.addEventListener("click", function(e) { 
      document.getElementById("audioPlayer").play();
  });
});

function drawGrid(){
   var canvas = document.getElementById("myCanvas2");
   var ctx = canvas.getContext("2d");
   ctx.fillStyle = "#222288";
   ctx.font = "15px Arial";
   ctx.fillText("(0,0)",3,15);
   ctx.fillText("(w,0)",65,15);
   ctx.fillText("(w,h)",65,90);
   ctx.fillText("(0,h)",3,90);
   ctx.fillRect(1,1,2,2);
   ctx.fillRect(97,1,2,2);
   ctx.fillRect(97,97,2,2);
   ctx.fillRect(1,97,2,2);
}
onceLoaded("#myCanvas2", drawGrid);

function drawExample(){
   var canvas = document.getElementById("myCanvas3");
   var ctx = canvas.getContext("2d");
   ctx.font = "10px Arial";
   
   ctx.fillRect(20,20,30,30);
   ctx.fillText("ctx.fillRect(..)",10,15);
   ctx.strokeRect(105,20,30,30);
   ctx.fillText("ctx.strokeRect(..)",80,15);
   
   ctx.beginPath();
   ctx.moveTo(170,20);
   ctx.lineTo(200,30);
   ctx.lineTo(190,10);
   ctx.fillText("ctx.moveTo(..)",160,45);
   ctx.fillText("ctx.lineTo(..)",160,58);
   ctx.fillText("ctx.stroke(..)",160,71);
   ctx.stroke();
   
   ctx.beginPath();
   ctx.moveTo(250,20);
   ctx.lineTo(280,30);
   ctx.lineTo(270,10);
   ctx.closePath();
   ctx.fill();
   ctx.fillText("ctx.beginPath(..)",240,45);
   ctx.fillText("ctx.closePath(..)",240,58);
   ctx.fillText("ctx.fill(..)",240,71);
   
   ctx.beginPath();
   ctx.arc(370,38,20,0,Math.PI*2);
   ctx.stroke();
   ctx.fillText("ctx.arc(x,y,r,0,Math.PI*2)",320,12);

   ctx.font = "28px Arial";
   ctx.fillText("Hello",10,100)
   ctx.strokeText("Hello",90,100)
   ctx.font = "10px Arial";
   ctx.fillText("ctx.fillText(..)",10,120)
   ctx.fillText("ctx.strokeText(..)",85,120)
   
   ctx.font = "8px Arial";
   ctx.fillText('A',177,90);
   ctx.font = "30px Arial";
   ctx.fillText('A',170,120);
   
   ctx.font = "10px Arial";
   ctx.fillText("(ctx.font = 5)",195,90);
   ctx.fillText("(ctx.font = 30)",195,120);

   ctx.fillStyle = "#FF0000";
   ctx.fillRect(280,80,30,30);
   ctx.fillStyle = "#111111";
   ctx.fillText("ctx.fillStyle", 273,125);
   
   var crate = new Image();   
   crate.src = 'crate.png';
   crate.onload = function(){
      ctx.drawImage(crate, 348, 70, 45, 45);
   }; 
   ctx.fillText("ctx.drawImage(...)", 335,128);
}
onceLoaded("#myCanvas3", drawExample);
