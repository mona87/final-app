var React = require('react');
var $ = require('jquery')
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var MapComponent = require('./MapComponent');


module.exports = React.createClass({
		  getInitialState: function() {
			return {
			  index: 0,
			  direction: null,
			  counter: 0,
			  counter2: 0,
			  userId: null,
			  username: null,
			  restaurantId: null,
			  currentIcon: null,
			  currentIcon2: null,
			  favArray: [],
			  iconArray: [],
			  lat: null,
			  lng: null,
			  mapStyle: 'mapStyle',
			  visible: null,
			  map: null,
			  markers: null
			};
		  },
		  handleSelect: function(selectedIndex, selectedDirection) {

		  	if(this.state.counter === 0 && selectedDirection === 'prev'){      
				this.state.counter = this.props.nearby.length-1;
			}		
			else if(this.state.counter === this.props.nearby.length-1 &&  selectedDirection === 'next'){	  		
			  	this.state.counter = 0;
			}
			else if(selectedDirection === 'next' )
			{	
				this.slideEnd(selectedIndex, selectedDirection)
			  	 this.state.counter++;		
			}
			else if(selectedDirection === 'prev'){		
			  	this.state.counter--;
			}	
				// 
				// console.log('counter ',this.state.counter )
				// console.log('index',this.state.index )	   
				this.setState({
				  index: selectedIndex,
				  direction: selectedDirection
				});

				// this.slideEnd(selectedIndex, selectedDirection)
		  },
		  prev: function(){

		  	if (this.state.index === 0 ){
		  		this.state.index = 1;
		  		this.handleSelect(this.state.index, 'prev');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0;
		  		this.handleSelect(this.state.index, 'prev');
		  	}
		  	
		  },
		  next: function(){

		  	if (this.state.index === 0 ){
		  		this.slideEnd();
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'next');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0;
		  		this.handleSelect(this.state.index, 'next');
		  	}
		  		
		  	
		  },
		  componentDidUpdate: function(){
		 	 // this.initialize();  
		  	google.maps.event.addDomListener(window, 'load', this.initialize());	
		  	this.state.username = localStorage.getItem('username');
			this.state.userId = localStorage.getItem('id');
			this.state.mapId = this.state.mapId; 
			// console.log(this.state.favArray)
			// var heart = this.state.currentIcon;
			// var heart2 = this.state.currentIcon2;
			// 	// console.log('heart ', heart)
			// $.ajax({
			// 		url: 'http://localhost:3000/users/' + this.state.userId,
			// 		type: 'GET',
			// 		success: function(result){
			// 			console.log(result.favorite)

			// 			for(var i = 0; i < result.favorite.length; i++){		  	
			// 	  			if((result.favorite[i]+ 'heart') === heart){
			// 	  			 // document.getElementById(heart).style.display='block';
			//   				}
			//   				if((result.favorite[i]+ 'heart2') === heart2){
			//   						 // document.getElementById(heart2).style.display='block';
			//   				}
		 //  				}	
			// 		},
			// 		error: function(err){
			// 			console.log(err);
			// 		}
			// })
		  },
		  slideEnd: function(selectedIndex, selectedDirection){
		  		console.log('animation done');
		  		// this.initialize();

		  		 this.marker();	
		  },
		  updateInfo: function(){

		  },
		  componentDidMount: function(){
			
					
		  },
		  initialize: function() {

		  		console.log('lat ', this.state.lat);
		  		console.log('lng ', this.state.lng);
				var styles = [
					  {
					    featureType: "all",
					    stylers: [
					     { hue: "#ff0000",
					     saturation: -67 },
					    ]
					  },{
					    featureType: "road.arterial",
					    elementType: "geometry",
					    stylers: [
					      { hue: "#ff0000" },
					     
					    ]
					  },{
					    featureType: "poi.business",
					    elementType: "labels",
					    stylers: [
					      { visibility: "off" }
					    ]
					  }
					];

				  var styledMap = new google.maps.StyledMapType(styles,
		    			{name: "Styled Map"});
				  var myLatlng = new google.maps.LatLng(this.state.lat,this.state.lng);

				  var mapOptions = {
				    zoom: 13,
				    center: myLatlng,
				    mapTypeControlOptions: {
		     	    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		    		},

				  }
	
				   var map = new google.maps.Map(document.querySelector(".map-canvas"), mapOptions);
				  
				  	var map2 = new google.maps.Map(document.querySelector(".map-canvas2"), mapOptions);

				  	if(this.state.index === 0){
				  		 this.state.map = map;
				  	}
				  	else{
				  		 this.state.map = map2;
				  	}

				  var image = 'http://tbs-va.com/wp-content/uploads/2013/05/Manhattan-Perfect-cocktail.png'
				  // var marker = new google.maps.Marker({
				  //     position: myLatlng,
				  //     map: map
				     
				     
				  // });
					this.marker();
				  // var marker2 = new google.maps.Marker({
				  //     position: myLatlng,
				  //     map: map2
				    
				     
				  // });
					
					map.mapTypes.set('map_style', styledMap);
		  			map.setMapTypeId('map_style');
		  			map2.mapTypes.set('map_style', styledMap);
		  			map2.setMapTypeId('map_style');

		  },
		  createMap: function(){

		  },
		  marker: function(){

		  			if(this.state.markers !== null){
		  				this.state.markers.setMap(null);
		  			}
		  		
		  		  var myLatlng = new google.maps.LatLng(this.state.lat,this.state.lng);

		  		  var marker = new google.maps.Marker({
				      position: myLatlng,
				      map: this.state.map
				     	     
				  });
				  
				   this.state.map.setCenter(myLatlng);
				  this.state.markers = marker;
				  console.log('lat ',this.state.lat, 'lng ', this.state.lng)

		  },
		  map: function(e){
		  		e.preventDefault();	  		 
		  		  $('.img1').hide();
		  		  $('.mapStyle').show();
		  		   console.log('lat ', this.state.lat);
		  		    console.log('lng ', this.state.lng);

		  		    this.initialize();
		  		    
		  },
		  list: function(){
		  		$('.img1').show();
		  		$('.mapStyle').hide();
		  },
		  // add: function(e){
		  // 		e.preventDefault();
		  // 		// e.currentTarget.style.display = 'none';
		  // 		 console.log('user ', this.state.username);
		  // 		  console.log('fav ', this.state.restaurantId);
		  // 		    console.log('currentIcon ', this.state.currentIcon);
		  // 		    var heart = this.state.currentIcon;
		  // 		     document.getElementById(heart).style.display='block';
		  // 		 $.ajax({
				// 	url: 'http://localhost:3000/users',
				// 	data: {username: this.state.username, id:this.state.userId , favorite: this.state.restaurantId},
				// 	type: 'PUT',
				// 	success: function(result){
				// 		console.log(result)
				// 		// self.fetchData();
				// 	},
				// 	error: function(err){
				// 		console.log(err);
				// 	}
				// })
		  // },
		  render: function() {
		  	
		   var self = this;
		   var style ={
			color: 'blue'
			}
			var hide = {
				display: 'none'
			}
			var style={
				height: '100%',
				width: '100%',
				margin: '0',
				padding: '0'
			}
			console.log(this.props)
			return (
				<div>
			<div className="row row-color">
				<div className="col-sm-12 ">
				
				  <Carousel onSlideEnd={this.slideEnd}  activeIndex={this.state.index} direction={this.state.direction} >
				   <CarouselItem className="carouselItem ">				  
				    <div className="imgHolder img1"></div>
					 <div id="mapHolder" className={this.state.mapStyle}><div style = {style}  className="map-canvas"></div></div>
						<div className="textWrapper" >
							<div className="textHolder" >
								
							{this.props.nearby.map(function(place, i){
								
									
								if(i === self.state.counter){
									// self.state.currentIcon = place._id + 'heart';
									// self.state.restaurantId = place._id;
								
									 self.state.lat = place.latitude;
									self.state.lng = place.longitude;
									
								  return(
							  
									  	<div key={place._id}>						
									  		<i id={place._id+ 'heart'} className="fa fa-heart fa-2x "></i>					  		
										  	<h1 className="rest-name">{place.restaurant}</h1>				  
											<div>{place.details}</div>
											<div>{place.numbers}</div>
											<div>{place.address}</div>
											<div>{place.phone}</div>
											<div><a href={'"'+place.website+'"'}>{place.website}</a></div>
										</div>
										
								  );								
															
								}
							
								 
							})}
						</div>
					  </div>
				  </CarouselItem>

				 <CarouselItem className="carouselItem ">
				
				   <div className="imgHolder2 img1" alt='900x500'></div>
					  <div id="mapHolder2" className={this.state.mapStyle}><div style = {style}  className="map-canvas2"></div></div>
				
					  <div className="textWrapper">
					  	<div className="textHolder" >
							  {this.props.nearby.map(function(place, i){
							  	
								if(i === self.state.counter){
									// self.state.currentIcon2 = place._id + 'heart2';
									// self.state.restaurantId = place._id;
								  return(
								  	<div key={place._id}>
									  	<i id={place._id+ 'heart2'} className="fa fa-heart fa-2x "></i>	
									  	<div ><h1 className="rest-name">{place.restaurant}</h1>
										<div>{place.details}</div>
										<div>{place.numbers}</div>
										<div>{place.address}</div>
										<div>{place.phone}</div>
										<div><a href={'"'+place.website+'"'}>{place.website}</a></div>
										</div>
									</div>
									
								  );
								}
							})}
					 	</div>
				 	 </div>
				  	</CarouselItem>
				  </Carousel>
				  </div>
			  </div>
			  <div className="row icon-row">
			  	<div onClick={this.prev} className="col-sm-2 mob-btn ">	
			  	  	<span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>			  			  
			  			<i className="fa fa-hand-o-left fa-stack-1x"></i>			
			  		</span>  				  		
			  	</div>
			  	<div onClick={this.add} className="col-sm-2 mob-btn ">
			  		 <span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>					  				  		
			  			<i className="fa fa-glass fa-stack-1x"></i>
			  		</span>
			  	</div>
			  	<div onClick={this.map}className="col-sm-2 mob-btn ">		
			  	  	 <span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>		  		
			  			<i className="fa fa-street-view fa-stack-1x"></i>
			  		</span>
			  	</div>
			  	<div onClick={this.list}className="col-sm-2 mob-btn ">	
			  	  	<span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>			  		
			  			<i className="fa fa-list-alt fa-stack-1x"></i>
			  		</span>
			  	</div>
			  	 <div onClick={this.next}  className="col-sm-2 mob-btn ">	
			  	 	<span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>	  
			  			<i className="fa fa-hand-o-right fa-stack-1x"></i>		
			  		</span>	 
			  	</div>	
			  </div>
			  </div>
			);
		  }
		});


