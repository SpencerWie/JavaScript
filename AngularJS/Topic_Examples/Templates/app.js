angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when('/', {
      controller: 'TestCtrl as test',
      templateUrl: 'test.html' // On call this is palced into a $templateCache for fast reaccess
    })
    .otherwise('/');
  })
  
  .controller('TestCtrl', function($templateCache){
	  this.user = {name: 'Spencer'};
    console.log($templateCache.get('test.html')); // Gets the HTML string from thr cache
  });

angular.module('app').run(function($templateCache){
  // Direct method of placing into cache (although angular already does this automatically)
  $templateCache.put('test.html', $templateCache.get('test.html'));
});
