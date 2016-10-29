angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when('/', {
      controller: 'TestCtrl as test',
      templateUrl: 'test.html'
    })
    .otherwise('/');
  })
  
  .controller('TestCtrl', function(){
	  this.user = {name: 'Spencer'};
  });

