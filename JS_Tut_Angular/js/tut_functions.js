function helloWorldAlert(){
   alert("Hello World"); 
}
function helloWorldWrite(){
   document.write("<p>Hello World</p>");
   document.write("<p>Notice everything was overwritten? This is a common mistake for begginers using document.write(). You need to make sure to use document.write() <b>before</b> the page is done loading.</p>");
   document.write("<p>This code was written after the page loaded. Everything was wiped and replaced.</p>");
   document.write('<a href="#/TheBasics">Go Back</a>');
}
function helloWorldDOM(){
	document.getElementById("myElement").innerHTML = "Hello World";
}
function resetHelloDom(){
	document.getElementById("myElement").innerHTML = "Test";
}
$(document).on("shown", ".accordion",function(){ // This is to scroll to the top of the accordion group when shown
    var offset = $(".accordion-body.collapse.in").position().top - 80;
    $("html, body").animate({ scrollTop: offset+"px" });
});