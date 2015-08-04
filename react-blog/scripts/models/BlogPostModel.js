var Backbone = require('backparse')(require('../config/parseSettings'));

module.exports = Backbone.Model.extend({
	defaults: {
		title: '',
		body: '',
		category: ''
	},
	parseClassName: 'Post',
	idAttribute: 'objectId',
	validate: function(attr){
		if(!attr.title){
			return 'A title is required'
		}
		else if(!attr.body){
			return 'A body is required'
		}
		else if(attr.category === '1'){
			return 'A category is required'
		}
	}

})