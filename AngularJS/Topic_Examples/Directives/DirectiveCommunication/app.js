var app = angular.module('app', []);

app.directive('country', function(){
	return {
		restrict: 'E',
		controller: function() {
			this.makeAnnouncement = function(message) {
				console.log("Country says: " + message);
			}
		}
	};
});

app.directive("state", function () {
  return {
    restrict: "E",
    controller: function () {
      this.makeLaw = function (law) {
        console.log("Law: " + law);
      };
    }
  };
});

app.directive("city", function () {
  return {
    restrict: "E",
    require: ["^country","^state"],
    link: function (scope, ele, attrs, ctrls) {
      ctrls[0].makeAnnouncement("This city rocks");
      ctrls[1].makeLaw("Jump higher");
    }
  };
});