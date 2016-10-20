angular.module('app', ['ngAnimate'])

.controller('TestCtrl', function(){
  this.showBoxes = [false, false];

  this.toggle = function(index) {
  	if( index < this.showBoxes.length && index > -1 )
  		this.showBoxes[index] = !this.showBoxes[index];
  }
});