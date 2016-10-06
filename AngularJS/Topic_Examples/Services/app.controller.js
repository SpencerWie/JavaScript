angular.module('app').controller('ListController', ['messages', function(messages){
	var self = this;
	
	self.messages = messages.list;
	self.newMessage = 'Hello';
	
	self.addMessage = function(message){
		messages.add(message);
		self.newMessage = '';
	}
	
	self.removeMessage = function(id){
		messages.remove(id);
	}
	
}]);