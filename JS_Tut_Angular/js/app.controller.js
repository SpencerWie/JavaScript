var app = angular.module('app');
/*
The `tutSection` directive holds the information for a section in this tutorial (being HTML).
*/

app.controller('sectionCtrl', ['$scope','Sections',  function($scope, Sections){

	this.loadSections = function(){
	    Sections.get()
	      .then(function(res) {
	        $scope.data = res.data;
	        console.log($scope.data);
	      })
	};

	this.loadSections();
}]);
