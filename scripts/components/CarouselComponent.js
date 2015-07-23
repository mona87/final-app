var React = require('react');
var $ = require('jquery')
var Carousel = require('react-bootstrap/lib/Carousel');
var CarouselItem = require('react-bootstrap/lib/CarouselItem');
var TimerMixin = require('react-timer-mixin');


module.exports = React.createClass({
		  mixins: [TimerMixin],
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
			  imgCounter: 0,
			  length: null,
			  hide: 'none',
			  random: 3,
			  random2: 4,
			  timer: 0, 
			  interval: null,
			  bool: false
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
			  	  		
			}
			else if(selectedDirection === 'prev'){		
			  	this.state.counter--;
			}	   
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
		  			 // this.state.imgCounter++
		  		this.handleSelect(this.state.index, 'prev');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0;
		  		this.handleSelect(this.state.index, 'prev');
		  	}		  	
		  },
		  next: function(){
		  	var self = this;
		  	if (this.state.index === 0 ){	  	
		  			 // $(this.refs.bigImg.getDOMNode()).fadeOut('slow');
		  		// 	  $(this.refs.bigImg.getDOMNode()).fadeToggle('slow');	
		  		// $(this.refs.bigImg2.getDOMNode()).fadeToggle('slow');
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'next');
		  	}else if(this.state.index === 1 ){
		  			
		  		 // $(this.refs.bigImg.getDOMNode()).fadeToggle('fast', function(){

		  		 // });	
		  		// $(this.refs.bigImg2.getDOMNode()).fadeToggle('fast');
		  				this.state.index = 0;
		  		this.handleSelect(this.state.index, 'next');
		  		//  $('.item1').fadeOut('fast', function(){
		  		// 	 	self.state.imgCounter++;
		  		// });
		  	}	  	
		  },
		  componentWillMount: function(){
		  	this.random();
		  },
		  shouldComponentUpdate: function(props){

		  		return this.props.nearby
		  },
		  componentDidUpdate: function(){
		 	 // this.initialize(); 

		  	google.maps.event.addDomListener(window, 'load', this.initialize());	
			
			this.state.mapId = this.state.mapId; 
		  },
		  slideEnd: function(selectedIndex, selectedDirection){
		  		// console.log('animation done');
		  		// this.initialize();
		  		 this.marker();							
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
					this.marker();

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
						$(self.refs.list.getDOMNode()).slideUp('slow', function(){
								$(self.refs.carousel.getDOMNode()).fadeToggle('slow');

						})
					
						console.log('true');
				}
				else{


		  		$(this.refs.carousel.getDOMNode()).fadeToggle('fast', function(){
		  				$(self.refs.list.getDOMNode()).slideToggle('slow', function(){
		  				$('.img1').show();
		  				$('.mapStyle').hide();
		  					// self.random();
		  				});
		  		});
		  	}
		  		
		  		

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
				  // console.log('lat ',this.state.lat, 'lng ', this.state.lng)

		  },
		  random: function(){
		  	var randomnumber = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
		  	var randomnumber2 = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
		  	this.setState({
		  		random: randomnumber,
		  		random2:  randomnumber2
		  	})
		  	// console.log('random ', this.state.random);
		  	// 	console.log('random2 ', this.state.random2);
		  },
		  map: function(e){
		  		e.preventDefault();	
		  		var self = this; 
		  			
		  		if($('.mapStyle').css('display') === 'none'){ 	
		  			
		  			$('.img1').fadeToggle('fast', function(){
		  				 $('.mapStyle').fadeIn('fast');
		  				 // self.random();
		  				 self.initialize();
		  			});
		  			
		  		}
		  		else{

		  			 $('.mapStyle').fadeToggle('fast', function(){
		  		  	 $('.img1').fadeIn('fast');
		  		  });
		  			 
		  		  
		  		}	 
	    
		  },
		  list: function(){
		  		$('.img1').show();
		  		$('.mapStyle').hide();
		  },
		  hideMe: function(){
		  	$(this.refs.icons.getDOMNode()).show();
		  	$(this.refs.begin.getDOMNode()).fadeOut('fast');
		  		this.setState({
		  			hide: 'block'
		  		})
		  			$('.carouselMain').fadeIn('slow');
		  },
		  componentDidMount: function(){
				// var self=this;
				// window.addEventListener('load', function(){
				// 	self.state.interval = setInterval(self.timer, 1000);
				// })

			this.setTimeout(this.timer, 5000);
			
		
		  },
		  timer: function(){
	
					this.state.timer++;
					console.log(this.state.timer);


					this.setState({
							timer: this.state.timer
						})
					// if(this.state.timer >= 5){
					// 	clearInterval(this.state.interval)
					
					// }
					// 	this.setState({
					// 		timer: this.state.timer
					// 	})
				
					
		  },
		  render: function() {
		  	
		  		// $('.carouselMain').css('display', this.state.hide)
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
	
			var hideCarousel ={
				display: this.state.hide

			}
			return (
				<div>
				
			
			<div ref='carousel' className="row row-color">
				<div className="col-sm-12 ">
				
				  <Carousel style={hideCarousel} className='carouselMain' onSlideEnd={this.slideEnd}  activeIndex={this.state.index} direction={this.state.direction} >
				   <CarouselItem className="carouselItem item1">				  
				   <div  ref="bigImg"  className={this.state.bigImgArray[this.state.random] + ' img1'} ></div>
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
											<div className="address"><a href={'http://maps.google.com/?q='+ place.destination} target="_blank"><i className="fa fa-map-marker fa-2x"></i></a></div>
											{/*<div className="phone">{place.phone}</div>*/}
											<div className="distance">{place.distance}</div>
											<div className="duration">{place.duration}</div>
										</div>
										
								  );								
															
								}
							
								 
							})}
						</div>
					  </div>
				  </CarouselItem>

				 <CarouselItem className="carouselItem item2 ">
				
				   <div  ref="bigImg2" className={this.state.bigImgArray[this.state.random2] + ' img1'} alt='900x500'></div>
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
										<div className="address"><a href={'http://maps.google.com/?q='+ place.destination} target="_blank"><i className="fa fa-map-marker  fa-2x"></i></a></div>
											<div className="distance">{place.distance}</div>
											<div className="duration">{place.duration}</div>
										
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
						  			<div className="mini-address"><a href={'http://maps.google.com/?q='+ place.destination} target="_blank"><i className="fa fa-map-marker  fa-3x"></i></a></div>
									<div className="mini-distance">{place.distance}</div>
									<div className="mini-duration">{place.duration}</div>
						  		</div>
						  	</div>
						  </div>
					  )
					}
				)}
			  	  </div>
			  // 	  	<div ref="begin" className="locateHolder">
					// 	<div >
					// 		<div className="locateWrapper" >
					// 			 <p className="hometxt" >Find the nearest Happy Hour Specials in Austin,&nbsp;TX.</p>
					// 			<button onClick={this.hideMe} className="locateBtn">Search Now!</button>
					// 		</div>
					// 	</div>
					// </div>
			  <div ref="icons" className="row icon-row">
			  	<div onClick={this.prev} className="col-sm-2 mob-btn ">	
			  	  	<span className="fa-stack fa-2x">	
			  	 		<i className="fa fa-circle-thin fa-stack-2x"></i>			  			  
			  			<i className="fa fa-hand-o-left fa-stack-1x"></i>			
			  		</span>  				  		
			  	</div>
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


