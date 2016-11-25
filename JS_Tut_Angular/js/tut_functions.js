// This is to scroll to the top of the accordion group when shown
$(document).on("shown", ".accordion",function(){ 
    var offset = $(".accordion-body.collapse.in").position().top - 80;
    $("html, body").animate({ scrollTop: offset+"px" });
});

// A Custom function that only executes a given callback function once the element exist
function onceLoaded(ele, func){
  var checkExist = setInterval(function() {
     if ($(ele).length) {
        func();
        clearInterval(checkExist);
     }
  }, 100); // check every 100ms  
}
