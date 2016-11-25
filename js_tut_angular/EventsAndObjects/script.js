

function getWeekday(){
var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var date = new Date();
var day = date.getDay();
alert("Today is "+weekdays[day]);
}

onceLoaded("#block1", function(){
   document.getElementById("block1").onclick = function(){
      //We need to check both RGB and HEX, since browers do it differently.
      if(this.style.backgroundColor == "#DDDDDD" || this.style.backgroundColor == "rgb(221, 221, 221)"){
         this.style.backgroundColor = "#44DD44"; // If grey turn green
      } else {
         this.style.backgroundColor = "#DDDDDD";// If it was green turn it grey
      }
   }
});

onceLoaded("#block2", function(){
   document.getElementById("block2").onmouseover = function(){
      this.innerHTML = "Mouse Over";
   }

   document.getElementById("block2").onmouseout = function(){
      this.innerHTML = "Mouse Out";
   }
});

onceLoaded("#myButton", function(){
   document.getElementById("myButton").onclick = function(){ alert("Hello World") }
});

var count = 0;
var myTimer;
var myTimer2;

function countFunction(){
   count = 0;
   document.getElementById("run1").disabled = true;
   myTimer = setInterval(function(){ counter() },1000);

   function counter(){
      count++;
      document.getElementById("counter").innerHTML = count;
   }
}

function stopCount(){
   clearInterval(myTimer);
   document.getElementById("run1").disabled = false;
}

function outFunction(){
   myTimer2 = setTimeout(function(){ 
      alert("Hello World");
      document.getElementById("run2").disabled = false;   
   }, 5000);
   document.getElementById("run2").disabled = true;
}

function stopTime(){
   clearTimeout(myTimer2);
   document.getElementById("run2").disabled = false;  
}

function localStore(){
   if(localStorage.clicks){
      localStorage.clicks++;
   } else {
      localStorage.clicks = 1;
   }
   document.getElementById("localStore").innerHTML = "Local Clicks : " + localStorage.clicks;
}

function sessionStore(){
   if(sessionStorage.clicks){
      sessionStorage.clicks++;
   } else {
      sessionStorage.clicks = 1;
   }
   document.getElementById("sessionStore").innerHTML = "Session Clicks : " + sessionStorage.clicks;
}

onceLoaded("#localStore", function(){
   document.getElementById("localStore").onclick = function(){ localStore(); }
   if(localStorage.clicks){ document.getElementById("localStore").innerHTML = "Local Clicks : " + localStorage.clicks; }
});

onceLoaded("#sessionStore", function(){
   document.getElementById("sessionStore").onclick = function(){ sessionStore(); }
   if(sessionStorage.clicks){ document.getElementById("sessionStore").innerHTML = "Session Clicks : " + sessionStorage.clicks; }
});





