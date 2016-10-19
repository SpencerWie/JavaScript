// In this example we are using Angular and jqLite to create an element and place it in the scope with Angular.

var app = angular.module("app", [])

app.directive("dumbPassword", function () {
  var validElement = angular.element('<div>{{ model.input }}</div>'); // Creates an element to be used

  var link = function (scope) {
    scope.$watch("model.input", function (value) {                    // .$watch() will wat for the value in the given paramater to be changed, when it is the function will execute.
      validElement.removeClass("correct");
		if(value === "password") {
			validElement.addClass("correct");
      }
    });
  };

  return {
    restrict: "E",
    replace: true,
    templateUrl: "dumbpass.html",
    compile: function (tElem) {
      tElem.append(validElement);

      return link;
    }
  }
});