// Routing in AngularJS (ng-view)
//
// ng-view: Displays and is used to switch between views in out single page appplication
// Routing in angular needs to be included 'angular-route.js' as its not include in base angular 
// 
// $locationProvider
//
// In normal angular we cannot use direct "/" url paths and rather need "#/" in order
// to not force apage reload, when using `$locationProvider.html5Mode` we can remove
// the uneeded hash prefix.
//
// More notes: Using html5Mode with hasbang fallback
// 
// When using the "pertty URL mode" we need a fallback for broswers that don't support
// .html5Mode(...), luckily html5Mode handles this and adds the # for non-compaitble browers

var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

	// If supprted we can use the `locationProvider` to remove the starting # prefix of the url files
  $locationProvider.html5Mode({enabled: true, requireBase: false});

  $routeProvider
  	.when("/",        // On "/" load app.html and give a controller "AppCtrl_index"
	    {
	      templateUrl: "app.html",
	      controller: "AppCtrl_index",
	      controllerAs: "ctrl"
	    })
  	.when('/foo',     // On "/foo" load foo.html and give a controller "AppCtrl_foo"
	  	{
	      templateUrl: "foo.html",
	      controller: "AppCtrl_foo",
	      controllerAs: "ctrl"
	  	})
  	.when('/bar',
	  	{
	      templateUrl: "bar.html",
	      controller: "AppCtrl_bar",
	      controllerAs: "ctrl"
	  	});
});	


app.controller('AppCtrl_index', function(){
	this.message = "Hello World!";
});

app.controller('AppCtrl_foo', function(){
	this.message = "Foo!";
});

app.controller('AppCtrl_bar', function(){
	this.message = "Bar!";
});