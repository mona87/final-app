var React = require ('react');
var Backbone = require('backbone');
var UserComponent = require('./components/UserComponent');
var LocationComponent = require('./components/LocationComponent');
var CarouselComponent = require('./components/CarouselComponent');
var UserCollection = require('./collections/UserCollection');
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var LoginComponent = require('./components/LoginComponent');
var User = require('./components/User');


var el = document.getElementById('container');

var App = Backbone.Router.extend({
	routes:{
		'':  	'home',
		'user/:user': 'user',
		'login': 'login'
		
	},

	home: function(){
		console.log('home');
		React.render(
				<div>
				<User/>
				<LoginComponent router={myRouter} />
				</div>,
				el
		)
	
	},
	user: function(user){
	 	React.render(
	 		<div>
	 		<User/>
	 	 	<LocationComponent router={myRouter} />
	 	 	</div>,
	 		el	 	
	 	)
	 },
	 login: function(){
	 	React.render(
	 		<div>
	 		<User/>
	 		<LoginComponent router={myRouter}/>
	 		</div>,el
	 	);
	 },
	
});

var myRouter = new App();
Backbone.history.start();