// Create Service called "messages"
angular.module('app').factory('messages', function(){
	var messages = {};
	
	messages.list = [];
	
	function Message(message){
		return {
			id: messages.list.length,
			text: message
		};
	}
	
	messages.list.push(Message('Foo'));
	messages.list.push(Message('Bar'));
	
	messages.add = function(newMessage){
		// Add new item to end of list
		this.list.push(Message(newMessage));
	}
	
	messages.remove = function(id){
		// Remove item at index "id" from list
		this.list.splice(id, 1);
		// Update id's of next items in list
		for(var i = id; i < this.list.length; i++) this.list[i].id--;
	}
	
	return messages;
});

