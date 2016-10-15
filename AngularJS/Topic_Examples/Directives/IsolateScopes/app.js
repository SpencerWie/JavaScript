// Isolate Scope is having an item "isolate" it's scope, in otherwords not share a scope with 
// other workers.

var app = angular.module('app', []);

// Without a "scope" all of the workers will share a single 'task' variable rather than
// have seperate ones.
app.directive("worker", function(){
	return {
		restrict: 'E',
		scope: {
			done: '&'
		}, // This will isolate the scope to only this directive
		require: "^WorkerCtrl",
		template:"<p><input type='text' ng-model='task'> {{task}}"+
					"<div class='button' ng-click='done({task: task})'</p>"
	};
});

app.controller("WorkerCtrl", function($scope){
	$scope.logTask = function(task) {
		console.log(task + " has been completed.");
	};
});