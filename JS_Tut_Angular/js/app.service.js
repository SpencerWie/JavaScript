var app = angular.module('app');

app.service('Sections', function($http, $route){
	this.get = function(){
		var uri_route = $route.current.loadedTemplateUrl.split('/').slice(0, -1).join('/');
		return $http.get(uri_route+"/sections.json");
	}
})