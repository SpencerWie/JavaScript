var module = angular.module('app');

module.controller('MyController', ['$scope', function($scope){
	$scope.helloworld = function(){
		console.log("Controller - Hello World");
	}
}]);