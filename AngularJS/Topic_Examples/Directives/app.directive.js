var module = angular.module('app');

/*
Directive Information:

---Restrictions ---
	'E' => Element
	'A' => Attribute (Default)
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

// An attribute directive
module.directive('helloA',  function(){
	return {
		restrict: "A",
		link: function(){ console.log("Hello World!"); }
	}
});

// Attribute directive with more functionality
module.directive('helloHover',  function(){
	return {
		link: function(scope, element, attrs) {        // link function(*scope, *element, *attributes [of elemenet])
			element.bind("mouseenter", function(){
				element.addClass(attrs.hovering);      // Add class based on the variable of the elements attribute "hovering" => "hoverGreen"
			});
			element.bind("mouseleave", function(){
				element.removeClass(attrs.hovering);
			});
		}
	}
});

// Directive Working with controller
module.directive('dirCtrl', function(){
	return {
		link: function(scope, element, attrs){
			element.bind("click", function(){
				scope.$apply("helloworld()");          // Call the helloworld() function, which exist in scope from our controller
			});
		}
	}
});
