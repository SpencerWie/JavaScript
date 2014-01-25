$(document).ready(function(){
   var toggle = 0;
   $("#code-box").children().hide();
   $(".slider").click(function(){
      if(toggle==0){
         $("#code-box").animate({
            width:"95%",
            height:"80%"
         },500);
         toggle=1;
         $("#code-box").children().fadeIn("slow");
      } else {
         $("#code-box").animate({
            width:"0px",
            height:"80%"
         },500);
         toggle=0;
         $("#code-box").children().fadeOut("slow");
      }
   });
   $("#run").click(function(){
    eval($("#code").val());
   });
});