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
   	.when("/DataAndFunctions",                                   
	    {
	      templateUrl: "/Data_And_Functions/index.html"
	    })
   	.when("/Branching",                                   
	    {
	      templateUrl: "/Branching/index.html"
	    })
   	.when("/OOP",{
		  templateUrl: "/OOP/index.html"
   		})
  	.otherwise({ templateUrl: "/Preface/index.html" }); 
});	
