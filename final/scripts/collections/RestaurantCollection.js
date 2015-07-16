var Backbone = require('backbone');
var RestaurantModel = require('../models/RestaurantModel');

module.exports = Backbone.Collection.extend({
	model: RestaurantModel,
	url: 'https://calm-forest-6617.herokuapp.com/happyhours',
	parse: function(res){return res.happyhours}
})