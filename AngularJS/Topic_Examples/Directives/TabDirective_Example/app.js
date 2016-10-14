angular.module('app', [])

.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
	 require: '^tabset', // Makes it a requirement for a tabset controller in the parent on this
    scope: {
		heading: '@' // '@' means it should be a string
	 },
    link: function(scope, elem, attr, tabsetCtrl) {
		 scope.active = false;
		 tabsetCtrl.addTab(scope);
	 }
  }
})

.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'tabset.html',
    bindToController: true, //Binds a controller to this directive
    controllerAs: 'tabset', // Name of controller for directive
    controller: function() {
      var self = this
      self.tabs = []
		
		self.addTab = function(tab) {
			if(self.tabs.length == 0) tab.active = true; // Set first tab to active
			self.tabs.push(tab);
		}
		
		self.select = function(selectedTab) {
			self.tabs.forEach(function(tab){
				tab.active = false;
			});
			selectedTab.active = true;
		}
    }
  }
})