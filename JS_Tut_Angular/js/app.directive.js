var app = angular.module('app');
/*
The `tutSection` directive holds the information for a section in this tutorial (being HTML).

title:       This is the title of the section
id:          The id of this element which maps to the accordian
htmlsource:  The HTML content of this section
in:          Used to show this content first (will almost always be used for the first element)
*parent:     This is what the parent element is, do NOT fillout this value as it's found automatically.
*/

// This is a custome made HTML element
app.directive('tutsection',  function($templateCache, $route){
	return {
		scope: {
			title: "@",
			id: "@",
			parent: "@",
			htmlsource: "@",
			in: "@"
		},
		restrict: 'E',
        replace: true,
        transclude: true,
		link: function(scope, ele, attrs) {
	   		// Get the parent of this element, so it knows what accordian it's in.
	   		scope.parent = ele.parent().attr('id');
		},
		templateUrl: function(ele,attrs) {
			return "section.html";
		}
	};
});

(function (ng) {
  'use strict';

  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });

}(angular));