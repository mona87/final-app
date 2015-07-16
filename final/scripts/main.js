var React = require ('react');
var Backbone = require('backbone');
var UserComponent = require('./components/UserComponent');
var MapComponent = require('./components/MapComponent');
var LocationComponent = require('./components/LocationComponent');
var CarouselComponent = require('./components/CarouselComponent');
var UserCollection = require('./collections/UserCollection');
var users = new UserCollection();
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var LoginComponent = require('./components/LoginComponent');
var FavList = require('./components/FavListComponent')
var User = require('./components/User');
var MapCarousel = require('./components/MapCarousel');

var el = document.getElementById('container');

var App = Backbone.Router.extend({
	routes:{
		'':  	'home',
		'user/:user': 'user',
		'fav': 'fav',
		'login': 'login',
		'maps': 'maps'
	},

	home: function(){
		console.log('home');
		React.render(
				<UserComponent/>,
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
	 fav: function(){
	 	console.log('favorite');
		 React.render(
		 	<div>
		 	<User/>
		 	<FavList router={myRouter}/>
		 	</div>, el);

	 },
	 login: function(){
	 	React.render(
	 		<div>
	 		<User/>
	 		<LoginComponent router={myRouter}/>
	 		</div>,el
	 	);
	 },
	 maps: function(){
	 	console.log('map')
	 	React.render(
	 		<div>
	 			<User/>
	 			<MapCarousel router={myRouter}/>
	 		</div>, el
	 	)
	 }
});

var myRouter = new App();
Backbone.history.start();