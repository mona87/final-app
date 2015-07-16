var Backbone = require ('backbone');
var React = require('react');
var RestaurantCollection = require('../collections/RestaurantCollection');
var restaurants = new RestaurantCollection();
var MapComponent = require('./MapComponent');
var CarouselComponent = require('../components/CarouselComponent');
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');




module.exports = React.createClass ({
	getInitialState: function(){
		
		return{
			places: [],
			lat: this.props.lat,
			lng: this.props.lng,
			nearby:[]
		}
	},
	componentWillMount: function(){
		var self = this;
		this.fetchData();
		this.nearbyPlaces();
	},

	rad: function(x) 
	{ 
		return x * Math.PI / 180 
	},
	haversine: function(p1Lat, p1Long, p2Lat, p2Long) {

    var R = 3959
    var dLat  = this.rad(p2Lat - p1Lat)
    var dLong = this.rad(p2Long - p1Long)

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.rad(p1Lat)) * Math.cos(this.rad(p2Long)) * Math.sin(dLong/2) * Math.sin(dLong/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    if (isNaN(c)){
    	c = 0
    }
    // console.log(c);
    var d = R * c
    var miles = Math.round(d)
    // var half = Math.round(d)/2
    // var miles = (half * .25) + half
    return miles
	},
	nearbyPlaces: function(){
		var self = this;
		if(this.state.nearby){
			this.state.nearby = []
		}
		this.state.places.map(function(place){
  			if(self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) <= 3 ){
  				self.state.nearby.push(place);
  			}		
  		});

	},
	render: function(){
		self = this;
		var style ={
			color: 'blue'
		}
			// console.log('dis ' +this.haversine(30.26654,-97.738194, this.state.lat, this.state.lng));
		this.nearbyPlaces();
		// console.log(Boolean(this.state.nearby))
		// console.log('places ', this.state.places)
		// console.log('nearby ', this.state.nearby)
		console.log(this.props)
		return(
			<div>
				<CarouselComponent lat={this.props.lat} lng={this.props.lng}  router={this.props.router} places={this.state.places} nearby={this.state.nearby} counter={0} haversine={this.haversine}/>
			</div>
		)
	},
	componentDidiMount: function(){

	},
	fetchData: function(){
		self = this
		restaurants.fetch({
			success: function(mod, i){
				// console.log(i)
				self.setState({
					places: i.happyhours
				})
			}
		})
	}

})

