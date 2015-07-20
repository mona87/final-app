var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		restaurant: '',
		details: '',
		address: '',
		phone: '',
		website: '',
		latitude: '',
		longitude: ''
	},
	urlRoot: 'https://calm-forest-6617.herokuapp.com/happyhours',
	idAttribute: '_id'
})