var Backbone = require('backparse')(require('../config/parseSettings'));
var BlogPostModel = require('../models/BlogPostModel');

module.exports = Backbone.Collection.extend({
	model: BlogPostModel,
	parseClassName: 'Post'
})