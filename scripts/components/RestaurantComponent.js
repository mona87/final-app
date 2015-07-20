var Backbone = require ('backbone');
var React = require('react');
var RestaurantCollection = require('../collections/RestaurantCollection');
var restaurants = new RestaurantCollection();
var CarouselComponent = require('../components/CarouselComponent');
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');




module.exports = React.createClass ({
	getInitialState: function(){
		
		return{
			places: [],
			lat: this.props.lat,
			lng: this.props.lng,
			nearby:[],
			num: null,
			currentPlace: null,
			dist: []
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
	distance: function(p1Lat, p1Long, p2Lat, p2Long, place){
		 var origin1 = new google.maps.LatLng(p1Lat, p1Long);
		 var destinationA = new google.maps.LatLng(p2Lat, p2Long);
		 var service = new google.maps.DistanceMatrixService();
		 
		 var self = this;
		  // service.getDistanceMatrix(
		  //   {
		  //     origins: [origin1],
		  //     destinations: [destinationA],
		  //     travelMode: google.maps.TravelMode.DRIVING,
		  //     unitSystem: google.maps.UnitSystem.IMPERIAL,
		  //     avoidHighways: false,
		  //     avoidTolls: false
		  //   }, 
		  //   this.callback);
		 	

			var num = google.maps.geometry.spherical.computeDistanceBetween(origin1, destinationA);
		 	// console.log(Math.round( num * 10) / 10);
		 	num *= 0.000621371192;
		 	num = Math.round( num * 10) / 10;
		 	console.log(num)
			 place.distance = num;
			// console.log(place.address +' ' +place.distance)

			return num
		},
		callback: function (response, status) {
			
			if (status != google.maps.DistanceMatrixStatus.OK) {
		    	alert('Error was: ' + status);
		  	}	 
		  	else 
		  	{
			    var origins = response.originAddresses;
			    var destinations = response.destinationAddresses;

			    // console.log('origin ', origins);
			    // console.log(origins+ ' to ' + destinations + ' is ' + response.rows[0].elements[0].distance.text + ' and will take ' + response.rows[0].elements[0].duration.text)
			    // console.log(response.rows[0].elements[0].distance.text);
			    if(response.rows[0].elements[0].distance !== undefined){
			    	var newNum = parseInt(response.rows[0].elements[0].distance.text) 
			    
			    		console.log(destinations +' '+ response.rows[0].elements[0].distance.text)
			    		if(newNum <=5 && newNum !== undefined){
			    				// console.log(response)
			    			
			    			// place.distance = response.rows[0].elements[0].distance.text
			    			// place.duration = response.rows[0].elements[0].duration.text
			    			//   	self.state.nearby.push(self.state.currentPlace);
			    			  	// console.log(newNum)
			    			  	
			    		}	
			    	    			
			     }
		    
  			}
  
  			// return num
  		
		
  		
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
			self.state.currentPlace = place;

		if( self.distance( self.props.lat, self.props.lng, place.latitude, place.longitude, place) <=4){
			self.state.nearby.push(place);
		}
					// 
					// console.log('true')
				
		
			
  			// if(self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) <= 3 ){
  			// 	self.state.nearby.push(place);
  			// }		
  		});

	},
	render: function(){
		self = this;
			this.nearbyPlaces();
		var style ={
			color: 'blue'
		}
			// console.log('dis ' +this.haversine(30.26654,-97.738194, this.state.lat, this.state.lng));
		// this.nearbyPlaces();
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
	componentDidUpdate: function(){
	
	},
	fetchData: function(){
		self = this
		restaurants.fetch({
			success: function(mod, i){
				// console.log(i)
		
				// console.log(i.happyhours)
				self.setState({
					places: i.happyhours
				})
			}
		})
	}

})

