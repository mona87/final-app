var React = require('react');
var Restaurant = require('./RestaurantComponent');


// var store = localStorage.getItem('username')
// console.log('store ', localStorage.getItem('username'))
// if(store !== 'mona'){
	
// 	window.location.href = '/#login';
// }
// else{


module.exports = React.createClass({
	getDefaultProps: function(){
		return {
			enableHighAccuracy: true, 
		  	maximumAge        : 30000, 
		  	// timeout           : 27000
		}
	},
	getInitialState: function(){
		return {
			lat: null,
			lng: null
		}
	},
	componentWillMount: function(){

		// if(store !== 'mona'){
	
		// 	this.props.router.navigate('/login', {trigger:true});
		// }
		var wpid = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, this.props);
	},
	geoSuccess: function(position){
		  // console.log('my position ', position.coords.latitude, position.coords.longitude);
		 	  this.setState({
		  		lat: position.coords.latitude,
		  		lng: position.coords.longitude
		 	 })
	},
	geoError: function(){
		alert("Sorry, no position available.");
	},
	render: function(){
		return(
			<Restaurant router={this.props.router} lat={this.state.lat} lng={this.state.lng} />

		);
		
	}

})

