var module = angular.module('app');

module.directive('helloworld',  function(){
	
	var helloworld = {};
	
	helloworld.restrict = 'E';                         // Restrict this diretive to be only a HTML Element
	helloworld.template = "<h2>Hello World</h2>"       // A Template is a string or HTML file given and renders as HTML
	
	return helloworld;
});

