// $scope is the glue between the View and the controller that each item has a reference of without direct linking.
// For example inside `$scope.text` of the controller the View will reference that as just `text` inside the controller directive.
var module = angular.module('app');

module.controller('MessageController', ['$scope', function($scope){
	
	$scope.text = "Hello World!";
	
	$scope.changeMessage = function(newMessage){
		$scope.text = newMessage;
	}
}]);

module.controller('DirectController', ['$scope', function($scope){
	
	$scope.text = "Hello World!";
	
}]);