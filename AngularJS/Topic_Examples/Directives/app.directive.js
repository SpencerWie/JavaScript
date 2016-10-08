var module = angular.module('app');

/*
Directive Information:

---Restrictions ---
	'E' => Element
	'A' => Attribute
	'C' => Class
	'M' => HTML Comment
*/

// This is a custome made HTML element
module.directive('helloE',  function(){
	
	var helloworld = {};
	
	helloworld.restrict = 'E';                         // Restrict this diretive to be only a HTML Element
	helloworld.template = "<h2>Hello World!</h2>";     // A Template is a string or HTML file given and renders as HTML
	
	return helloworld;
});

module.directive('helloA',  function(){
	console.log('ran helloA')
	return {
		restrict: "A",
		link: function(){ alert("Hello World!"); }
	}
});

