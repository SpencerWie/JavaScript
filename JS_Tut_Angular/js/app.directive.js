var app = angular.module('app');
/*
The `tutSection` directive holds the information for a section in this tutorial (being HTML).
*/

// This is a custome made HTML element
app.directive('tutsection',  function(){
	return {
		/*scope: {
			htmlSource: '='                     // A one-time read of the `htmlSource` attribute to get the templateUrl
		},*/
		restrict: 'E',                         // Needs to be an HTML element
		link: function(scope, element, attrs) {
		   // some ode
		},
		templateUrl: function(ele,attrs) {
			return attrs.htmlsource;            // A Template is a string or HTML file given and renders as HTML
		}
	};
});
