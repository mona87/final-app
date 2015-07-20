var Backbone = require('backbone');
var UserModel = require('../models/UserModel');

module.exports = Backbone.Collection.extend({
	model: UserModel,
	url: 'https://calm-forest-6617.herokuapp.com/users',
	parse: function(res){return res.users}
});