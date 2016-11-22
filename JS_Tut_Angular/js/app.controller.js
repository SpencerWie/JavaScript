var app = angular.module('app');
/*
The `tutSection` directive holds the information for a section in this tutorial (being HTML).
*/

app.controller('sectionCtrl', ['$scope','Sections',  function($scope, Sections){

	this.loadSections = function(){
	    Sections.get()
	      .then(function(res) {
	        $scope.data = res.data;
	      })
	};

	this.loadSections();

}]);

app.controller('pageCtrl', ['$scope',  function($scope){

	$scope.getScript = function(script){
		$.getScript(script);
	}
	
}]);

