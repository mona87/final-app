var Backbone = require ('backbone');

module.exports = Backbone.Model.extend({
	defaults:{
		name: '',
		age: '',
		_id: ''
	},
	urlRoot: 'https://calm-forest-6617.herokuapp.com/users',
	idAttribtue: '_id'
})