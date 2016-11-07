var app = angular.module('app');

app.config(function($routeProvider, $locationProvider){

  $routeProvider
   	.when("/Preface",                                   
	    {
	      templateUrl: "/Preface/index.html"
	    })
  	.when("/TheBasics",                                   
	    {
	      templateUrl: "/The_Basics/index.html"
	    })
  	.otherwise({ templateUrl: "/Preface/index.html" }); 
});	