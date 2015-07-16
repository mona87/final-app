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
			  counter2: 1,
			  userId: null,
			  username: null,
			  restaurantId: null,
			  currentIcon: null,
			  favArray: [],
			  iconArray: []
			};
		  },
		  handleSelect: function(selectedIndex, selectedDirection) {

		  	console.log('length ', this.props.nearby.length)
			  if(this.state.counter === 0 && selectedDirection === 'prev'){      
				 this.state.counter = this.props.nearby.length-1;
			  }
		
			  else if(this.state.counter2 >= this.props.nearby.length-1 &&  selectedDirection === 'next'){
			  		if(this.state.index % 2 !==0){
			  		 	this.state.counter2 = 0;
			  		 	this.state.counter2 = 1;
			  		 }
			  }
			  else if(this.state.counter >= this.props.nearby.length-1 &&  selectedDirection === 'next'){
			
			  		 if(this.state.index % 2 ===0){
			  		 	this.state.counter = this.props.nearby.length-1;	
			  		 	
			  		 }
			  }
			  else if(selectedDirection === 'next')
			  {
			  	if(this.state.index % 2 !==0){
			  			this.state.counter2 = this.state.counter2+2;
			  	}
			  	else{
			  		this.state.counter = this.state.counter+2;
			  	}
			  }
			  else if(selectedDirection === 'prev'){
			  
				if(this.state.index % 2 !==0){
			  			this.state.counter2--;
			  	}
			  	else{
			  		this.state.counter--;
			  	}
		
			  }
				console.log('counter ',this.state.counter )
				console.log('counter2 ',this.state.counter2 )	   
				this.setState({
				  index: selectedIndex,
				  direction: selectedDirection
				});
		  },
		  prev: function(){
		  	if (this.state.index === 0 ){
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'prev');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0
		  		this.handleSelect(this.state.index, 'prev');
		  	}
		  	
		  },
		  next: function(){
		  	if (this.state.index === 0 ){
		  		this.state.index = 1
		  		this.handleSelect(this.state.index, 'next');
		  	}else if(this.state.index === 1 ){
		  		this.state.index = 0
		  		this.handleSelect(this.state.index, 'next');
		  	}
		  	
		  },
		  componentDidUpdate: function(){
		  	this.state.username = localStorage.getItem('username');
			this.state.userId = localStorage.getItem('id');
			var self = this;
			console.log(this.state.favArray)
			var heart = this.state.currentIcon;
				console.log('heart ', heart)
			$.ajax({
					url: 'http://localhost:3000/users/' + this.state.userId,
					type: 'GET',
					success: function(result){
						console.log(result.favorite)
						self.state.favArray = result.favorite;
						for(var i = 0; i < result.favorite.length; i++){		  	
				  			if((result.favorite[i]+ 'heart') === heart){
				  			 document.getElementById(heart).style.display='block';
			  				}
		  				}	
					},
					error: function(err){
						console.log(err);
					}
			})
		  },
		  getFav: function(){
		  		$.ajax({
					url: 'http://localhost:3000/happyhours',
					type: 'GET',
					success: function(result){
						console.log(result.favorite)
						for(var i = 0; i < result.favorite.length; i++){		  	
				  			
		  				}	
					},
					error: function(err){
						console.log(err);
					}
			})
		  },
		  navigate: function(){
		  		console.log(this.props);
		  		this.state.username = localStorage.getItem('username');
		  		 this.props.router.navigate('/user/'+this.state.username, {trigger: true});
		  },
		  add: function(e){
		  		e.preventDefault();
		  		// e.currentTarget.style.display = 'none';
		  		 console.log('user ', this.state.username);
		  		  console.log('fav ', this.state.restaurantId);
		  		    console.log('currentIcon ', this.state.currentIcon);
		  		    var heart = this.state.currentIcon;
		  		     document.getElementById(heart).style.display='block';
		  		 $.ajax({
					url: 'http://localhost:3000/users',
					data: {username: this.state.username, id:this.state.userId , favorite: this.state.restaurantId},
					type: 'PUT',
					success: function(result){
						console.log(result)
						// self.fetchData();
					},
					error: function(err){
						console.log(err);
					}
				})
		  },
		  render: function() {
		  	
		   var self = this;
		   var style ={
			color: 'blue'
			}
			console.log(this.state.favArray);
			return (
				<div>
			<div className="row row-color">
				<div className="col-sm-12 ">
				
				  <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				   <CarouselItem className="carouselItem ">
				  
					   <div className="imgHolder" alt='900x500'></div>
					<div className="textWrapper" >
							<div className="textHolder" >
								
							{this.state.favArray.map(function(place, i){
							
								if(i === self.state.counter){
									self.state.currentIcon = place._id + 'heart';
									self.state.restaurantId = place._id;
									
									
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
				
				   <div className="imgHolder2" alt='900x500'></div>
			
				
					  <div className="textWrapper">
							  {this.state.favArray.map(function(place, i){
							  	
								if(i === self.state.counter2){
								  return(
								  	<div className="textHolder" key={place._id}>
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
				  	</CarouselItem>
				  </Carousel>
				  </div>
			  </div>
			  <div className="row icon-row">
			  	<div onClick={this.prev} className="col-sm-2 mob-btn ">			  			  
			  		<i className="fa fa-hand-o-left fa-3x"></i>			  				  		
			  	</div>
			  	<div onClick={this.add} className="col-sm-2 mob-btn ">				  				  		
			  		<i className="fa fa-glass fa-3x"></i>
			  	</div>
			  	<div className="col-sm-2 mob-btn ">			  		
			  		<i className="fa fa-street-view fa-3x"></i>
			  	</div>
			  	<div onClick={this.navigate} className="col-sm-2 mob-btn ">			  		
			  		<i className="fa fa-list-alt fa-3x"></i>
			  	</div>
			  	 <div onClick={this.next}  className="col-sm-2 mob-btn ">		  
			  		<i className="fa fa-hand-o-right fa-3x "></i>			 
			  	</div>	
			  </div>
			  </div>
			);
		  }
		});


