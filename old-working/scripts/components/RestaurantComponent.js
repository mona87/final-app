var Backbone = require ('backbone');
var React = require('react');
var RestaurantCollection = require('../collections/RestaurantCollection');
var restaurants = new RestaurantCollection();
var CarouselComponent = require('../components/CarouselComponent');
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');




module.exports = React.createClass ({
	getInitialState: function(places){

		return{
			places: [],
			lat: this.props.lat,
			lng: this.props.lng,
			nearby: [],
			num: null,
			currentPlace: null,
			dist: [],
			array: []
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
	distance: function(p1Lat, p1Long, p2Lat, p2Long, place, counter){
		 var origin1 = new google.maps.LatLng(p1Lat, p1Long);
		 var destinationA = new google.maps.LatLng(p2Lat, p2Long);
		 var service = new google.maps.DistanceMatrixService();
		 var result = [];
		 var self = this;
		 var counter2 = counter;
	
		  service.getDistanceMatrix(
		    {
		      origins: [origin1],
		      destinations: [destinationA],
		      travelMode: google.maps.TravelMode.DRIVING,
		      unitSystem: google.maps.UnitSystem.IMPERIAL,
		      avoidHighways: false,
		      avoidTolls: false
		    }, 
		    function(response, status, self){
		   
		    	if (status != google.maps.DistanceMatrixStatus.OK) {
		    			alert('Error was: ' + status);
				  	}	
				else{
			  		if(response !== null && response.rows[0].elements[0].distance !== undefined){
			  			place.origin = response.originAddresses[0];
			  			place.destination = response.destinationAddresses[0];
				    	place.distance = response.rows[0].elements[0].distance.text + 'les';
				    	place.duration = response.rows[0].elements[0].duration.text + ' away';
				    	var num = parseFloat(place.distance);
					    	if(num < 5){
					    		addRender(place);
					    	}  
	    				}
				 	}
				 	if(counter === place.arrayLength-1){
				 		
				 	}
				 	
		    
		    		// console.log(response.rows[0].elements[0].distance.text)
		    } );

		  	function addRender(place){
		  		
		  		self.state.nearby.push(place)
		  		// console.log(self.state.nearby);
		  		// self.render(self.state.nearby)

		  		self.check(self.state.nearby)
		  	}
		 		
		 			
		 	
			// var num = google.maps.geometry.spherical.computeDistanceBetween(origin1, destinationA);
		 // 	// console.log(Math.round( num * 10) / 10);
		 // 	num *= 0.000621371192;
		 // 	num = Math.round( num * 10) / 10;
		 // 	 console.log(num)
			//  place.distance = num;
			// // console.log(place.address +' ' +place.distance)

			// return num
		},
		
	check: function(places){
			if(places !== undefined){
				this.state.nearby = places;	
		}
			console.log(this.state.nearby)
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
		this.state.places.map(function(place, i){
			self.state.currentPlace = place;
			place.index = i;
			place.arrayLength = self.state.places.length;

		if( self.distance( self.props.lat, self.props.lng, place.latitude, place.longitude, place, i) <=4){
			self.state.nearby.push(place);
		}
					// 
					// console.log('true')
				
		
			
  			// if(self.haversine(place.latitude,place.longitude, self.props.lat, self.props.lng) <= 3 ){
  			// 	self.state.nearby.push(place);
  			// }		
  		});

	},
	render: function(places){
		// console.log(places)
		self = this;
		var style ={
			color: 'blue'
		}
			this.nearbyPlaces();	

			// console.log('dis ' +this.haversine(30.26654,-97.738194, this.state.lat, this.state.lng));
		// this.nearbyPlaces();
		// console.log(Boolean(this.state.nearby))
		// console.log('places ', this.state.places)
		// console.log('nearby ', this.state.nearby)
		// console.log(this.props)
		return(
			<div>

				<CarouselComponent callback={this.nearbyPlaces} lat={this.props.lat} lng={this.props.lng}  router={this.props.router} places={this.state.places} nearby={this.state.nearby} counter={0} haversine={this.haversine}/>
				
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

