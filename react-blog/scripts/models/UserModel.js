var Backbone = require('backparse')(require('../config/parseSettings'));


module.exports = Backbone.Model.extend({
    defaults: {
        username: '',
        password: '',
        email: ''
    },
    parseClassName: '_User',
    idAttribute: 'objectId',
    isUser: true
});
