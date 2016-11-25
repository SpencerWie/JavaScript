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