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
// .html5Mode(...), luckily html5Mode handles this and adds the # for non-compaitble browers.
//
// Problems with html5Mode:
//
// One problem with html5Mode is that if a page is refreshed or directly linked to it will just load the normal page
// instead of doing so through the application. Which can cause problesm with ngView, hence I would reccommend using `/#/`
// To fix this you will need to resolve these items through server-side re-routing.

var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

	// If supprted we can use the `locationProvider` this remove the starting `#` prefix of the url files. 
	// See section `Problems with html5Mode` above.
  //$locationProvider.html5Mode({enabled: true, requireBase: false});

  $routeProvider
  	.when("/",                                    // On "/" load app.html and give a controller "AppCtrl_index"
	    {
	      templateUrl: "app.html",
	      controller: "AppCtrl_index",
	      controllerAs: "ctrl"
	    })
  	.when('/foo',                                 // On "/foo" load foo.html and give a controller "AppCtrl_foo"
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
	  	})
  	.when('/:first/:last',{                      // We can also user variables (:varName) as well.
	      templateUrl: "app.html",
	      controller: "AppCtrl_params",
	      controllerAs: "ctrl"
  		})
  	.otherwise({ templateUrl: "page404.html" }); // .otherwise(param) moves any unknown url links redircts to this page.
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

app.controller('AppCtrl_params', function($routeParams){
	this.message = "Hello " + $routeParams.first + " " + $routeParams.last;
});