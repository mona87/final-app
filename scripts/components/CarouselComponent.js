var React = require('react');
var $ = require('jquery')
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');



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
			  markers: null,
			  imgArray: ['mini-image','mini-image2','mini-image3', 'mini-image4', 'mini-image5', 'mini-image6', 'mini-image7', 'mini-image8', 'mini-image9', 'mini-image10'],
			  bigImgArray: [ 'bigImg1','bigImg2', 'bigImg3', 'bigImg4', 'bigImg5', 'bigImg6', 'bigImg7', 'bigImg8', 'bigImg9', 'bigImg10'],
			  imgCounter: 0
			};
		  },
		  handleSelect: function(selectedIndex, selectedDirection) {
		  	var self = this;


		  	if(this.state.counter === 0 && selectedDirection === 'prev'){      
				this.state.counter = this.props.nearby.length-1;
			}		
			else if(this.state.counter === this.props.nearby.length-1 &&  selectedDirection === 'next'){	  		
			  	this.state.counter = 0;
			}
			else if(selectedDirection === 'next')
			{	
				
				self.state.counter++;
					
				// }
				// console.log(this.onSlideEnd);
				// this.slideEnd(selectedIndex, selectedDirection)
			  	  		
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
		  				


		  		console.log('count ',this.state.bigImgArray[this.state.imgCounter]);
		  	if (this.state.index === 0 ){
		  		this.state.index = 1;
		  			 this.state.imgCounter++
		  		this.handleSelect(this.state.index, 'prev');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0;
		  		this.handleSelect(this.state.index, 'prev');
		  	}

		  	  	if(this.state.imgCounter === 0){
		  			
		  			this.state.imgCounter = this.state.bigImgArray.length-1;

		  			console.log('update ', this.state.imgCounter)
		  		}else{
		  			this.state.imgCounter--;
		  		}
		  	
		  },
		  next: function(){

		  	if (this.state.index === 0 ){
		  		
		  	
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'next');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0;
		  		this.handleSelect(this.state.index, 'next');
		  	}
		  	
		  	if(this.state.imgCounter >= this.state.bigImgArray.length-1){
		  			this.state.imgCounter = 0
		  		}else{
		  			this.state.imgCounter++;
		  		}
		  		
		  	
		  },
		  componentDidUpdate: function(){
		 	 // this.initialize();  
		  	google.maps.event.addDomListener(window, 'load', this.initialize());	
		  	this.state.username = localStorage.getItem('username');
			this.state.userId = localStorage.getItem('id');
			this.state.mapId = this.state.mapId; 
		  },
		  slideEnd: function(selectedIndex, selectedDirection){
		  		console.log('animation done');
		  		// this.initialize();
		  		 this.marker();	
		  		 return true
						
		  },
		  initialize: function() {

		  		// console.log('lat ', this.state.lat);
		  		// console.log('lng ', this.state.lng);
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
		  showFav: function(){
		  		// if($(this.refs.list.getDOMNode()).css('display') ==='block'){
		  		// 	$(this.refs.list.getDOMNode()).css('display','none');
		  		var self = this;
		  		// }else{
		  		// 		$(this.refs.list.getDOMNode()).css('display','block');
		  		// }
		  		if($(this.refs.carousel.getDOMNode()).css('display') === 'none'){
						
						// $(this.refs.list.getDOMNode()).css('display','none');
						$(self.refs.list.getDOMNode()).fadeOut('fast', function(){
								$(self.refs.carousel.getDOMNode()).fadeToggle('fast');
						})
					
						console.log('true');
				}
				else{


		  		$(this.refs.carousel.getDOMNode()).fadeToggle('fast', function(){
		  				$(self.refs.list.getDOMNode()).slideToggle('slow', function(){
		  				$('.img1').show();
		  				$('.mapStyle').hide();
		  				});
		  		});
		  	}
		  		
		  		

		  },
		  marker: function(){

		  			if(this.state.markers !== null){
		  				this.state.markers.setMap(null);
		  			}
		  		
		  		  var myLatlng = new google.maps.LatLng(this.state.lat,this.state.lng);
		  		  // console.log(myLatlng);
		  		  // console.log(this.state.lat, this.state.lng);

		  		  var marker = new google.maps.Marker({
				      position: myLatlng,
				      map: this.state.map
				     	     
				  });
				  
				  this.state.map.setCenter(myLatlng);
				  this.state.markers = marker;
				  // console.log('lat ',this.state.lat, 'lng ', this.state.lng)

		  },
		  map: function(e){
		  		e.preventDefault();	
		  		var self = this; 
		  		if($('.mapStyle').css('display') === 'none'){ 	
		  			
		  			$('.img1').fadeToggle('fast', function(){
		  				 $('.mapStyle').fadeIn('fast');
		  				 self.initialize();
		  			});
		  			
		  		}
		  		else{

		  			 $('.mapStyle').fadeToggle('fast', function(){
		  		  	 $('.img1').fadeIn('fast');
		  		  });
		  			 
		  		  
		  		}	 
		  		 
		  		  // $('.mapStyle').show();
		  		  //  console.log('lat ', this.state.lat);
		  		  //   console.log('lng ', this.state.lng);

		  		    
		  		    
		  },
		  list: function(){
		  		$('.img1').show();
		  		$('.mapStyle').hide();
		  },
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
			var counter = 0;
			console.log('props ',this.props.nearby)
			return (
				<div>
			<div ref='carousel' className="row row-color">
				<div className="col-sm-12 ">
				
				  <Carousel  className='carouselMain' onSlideEnd={this.slideEnd}  activeIndex={this.state.index} direction={this.state.direction} >
				   <CarouselItem className="carouselItem ">				  
				   <div className={this.state.bigImgArray[this.state.imgCounter] + ' img1'} ></div>
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
											<div className="details">{place.details}</div>
											<div className="address"><a href={'"http://maps.google.com/?q='+ place.address+'"'} target="_blank">{place.address}</a></div>
											<div className="phone">{place.phone}</div>
											<div className="url"><a href={'"'+place.website+'"'}>{place.website}</a></div>
										</div>
										
								  );								
															
								}
							
								 
							})}
						</div>
					  </div>
				  </CarouselItem>

				 <CarouselItem className="carouselItem ">
				
				   <div className={this.state.bigImgArray[this.state.imgCounter] + ' img1'} alt='900x500'></div>
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
										<div className="details">{place.details}</div>
										<div className="address"><a href={'"http://maps.google.com/?q='+ place.address+'"'} target="_blank">{place.address}</a></div>
										<div className="phone">{place.phone}</div>
										<div className="url"><a href={'"'+place.website+'"'}>{place.website}</a></div>
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
			<div style={hide}  ref='list' className="row list-holder">
			  	  {this.props.nearby.map(function(place, i){
			  	  	 counter++;
			  	  		if(counter >= self.state.imgArray.length-1){
			  	  			counter = 0;
			  	  		}
			  	  	return(
			  	  		  <div key={place._id} ref="slide" className="mini-slide row">
						  	<div  className="mini-holder">
						  		<div className={self.state.imgArray[counter]}></div>
						  		<div className="mini-text">
						  			<div className="mini-rest">{place.restaurant}</div>
						  			<div className="mini-details">{place.details}</div>
						  			<div className="mini-address">{place.address}</div>
						  		</div>
						  	</div>
						  </div>
					  )
					}
				)}
			  	  </div>
			  <div className="row icon-row">
			  	<div onClick={this.prev} className="col-sm-2 mob-btn ">	
			  	  	<span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>			  			  
			  			<i className="fa fa-hand-o-left fa-stack-1x"></i>			
			  		</span>  				  		
			  	</div>
			  	{/*<div onClick={this.showFav} className="col-sm-2 mob-btn ">
			  		 <span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>					  				  		
			  			<i className="fa fa-glass fa-stack-1x"></i>
			  		</span>
			  	</div>*/}
			  	<div onClick={this.map}className="col-sm-2 mob-btn street">		
			  	  	 <span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>		  		
			  			<i className="fa fa-street-view fa-stack-1x"></i>
			  		</span>
			  	</div>
			  	<div onClick={this.showFav} className="col-sm-2 mob-btn ">	
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


