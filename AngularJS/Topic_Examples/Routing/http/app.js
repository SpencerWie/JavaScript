angular.module('app', [])

.service('testService', function($http){
	this.get = function(){
		return $http.get("/test.json");
	}
})
.controller('TestCtrl', ['testService', function(testService){
  var self = this;

  self.getMessage = function() {
    testService.get()
      .then(function(res) {
        self.message = res.data.message;
        console.log(self.message);
      })
  }
}]);