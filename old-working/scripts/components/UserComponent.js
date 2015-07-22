var React = require('react');
var Backbone = require('backbone');
var UserModel = require('../models/UserModel');
var UserCollection = require('../collections/UserCollection');
var $ = require('jquery');
var myUserlist = new UserCollection();
var RestaurantModel = require('../models/RestaurantModel');


module.exports = React.createClass({
	getInitialState: function(){
		return{
			myCollection:  [],
			user: 'none',
			restCollection: null
		}
	},
	componentDidMount: function(){
		this.fetchData();				
		// $.get('http://localhost:3000/users', function(userCollection){
		// 	if(this.isMounted()){
		// 		this.setState({
		// 			myCollection: userCollection.users
		// 		});
		// 	}
			
		// }.bind(this))
	},
	render: function(){
		this.cycle();
		var style ={
			marginRight: '5px'
		}
		var style2 = {
			paddingLeft: '20px'
		}
		return(
			<div style= {style2}>	
			<form >
			<h1>User</h1>
			<label>Name</label><br/>
			<input ref="name" type="text"/><br/>
			<label>Password</label><br/>
			<input ref="age" type="text" /><br/>
			<label>User ID</label><br/>
			<input ref="modelId" type="text"/><br/><br/>
			<button style={style} onClick={this.post} >Add</button>
			<button style={style} onClick={this.delete}>Remove</button>
			<button style={style} onClick={this.put}>Update</button>
			<button style={style} onClick={this.search}>Find</button>
			<button style={style} onClick={this.login}>Login</button>
			<button style={style} onClick={this.logout}>Logout</button>
			</form>
			<div>
			<h2>User Search</h2>
			{this.state.user.name}<br/><br/>
			{this.state.user.age}
			{this.state.user.username}<br/><br/>
			{this.state.user.password}
			</div>
			<h2>User List</h2>
			<div>{this.state.myCollection.map(function(user){
					return(
					<div key={user.attributes._id}>
					<h2>{user.attributes.username}</h2>
					<h3>{user.attributes.password}</h3>
					<h2>{user.attributes.name}</h2>
					<h3>{user.attributes.age}</h3>
					<h4>{user.attributes._id}</h4>
					</div>
					)

			}).reverse()}</div>
				<div>
					<label>Restaurant</label><br/>
					<input ref="restaurant" type="text"/><br/>
					<label>details</label><br/>
					<input ref="details" type="text"/><br/>
					<label>address</label><br/>
					<input ref="address"type="text"/><br/>
					<label>phone</label><br/>
					<input ref="phone" type="text"/><br/>
					<label>website</label><br/>
					<input ref="website" type="text"/><br/>
					<label>latitude</label><br/>
					<input ref="latitude" type="text"/><br/>
					<label>longitude</label><br/>
					<input  ref="longitude" type="text"/><br/>
					<button onClick={this.addRest}>Submit</button>
				</div>

			</div>

		);

	},
	login: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var pass = this.refs.age.getDOMNode().value;
		console.log('click')
		$.ajax({
		    url: 'https://calm-forest-6617.herokuapp.com/users',
		    data: {username: name, password: pass},
		    type: 'POST',
		    success: function(result) {
		        console.log(result);
		        // self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	},
	logout: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var pass = this.refs.age.getDOMNode().value;
		console.log('click')
		$.ajax({
		    url: 'https://calm-forest-6617.herokuapp.com/users',
		    data: {},
		    type: 'GET',
		    success: function(result) {
		        console.log(result);
		        // self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	},
	post: function(e){
		e.preventDefault();
		self = this;
		var user = new UserModel({
			username: this.refs.name.getDOMNode().value,
			password: this.refs.age.getDOMNode().value
		})
		user.save().done(
			function(data){
				// console.log('saved')
				self.fetchData();
			},
			function(err){
				console.log(err);
			}
		)
	},
	addRest: function(e){
		var restaurant = this.refs.restaurant.getDOMNode().value;
		var details = this.refs.details.getDOMNode().value;
		var address = this.refs.address.getDOMNode().value;
		var phone = this.refs.phone.getDOMNode().value;
		var website = this.refs.website.getDOMNode().value;
		var latitude = this.refs.latitude.getDOMNode().value;
		var longitude = this.refs.longitude.getDOMNode().value;
		self = this;
		e.preventDefault();
		var restaurant = new RestaurantModel({
			   	restaurant: restaurant,
		    	details: details,
		    	address: address,
		    	phone: phone,
		    	website: website,
		    	latitude: latitude,
		    	longitude: longitude
		})
		restaurant.save().done(
			function(data){
				// console.log('saved')
				// self.fetchData();
				console.log(data);
			},
			function(err){
				console.log(err);
			}
		)
		// $.ajax({
		//     url: 'http://localhost:3000/happyhours',
		//     data: {
		//     	restaurant: restaurant,
		//     	details: details,
		//     	address: address,
		//     	phone: phone,
		//     	website: website,
		//     	latitude: latitude,
		//     	longitude: longitude
		//     },
		//     type: 'POST',
		//     success: function(result) {
		//         console.log(result);
		//         // self.fetchData();
		//     },
		//     error: function(err){
		//     	console.log(err);
		//     }
		// });
	// 	$.ajax({
	// 	    url: 'http://localhost:3000/happyhours',
	// 	    type: 'GET',
	// 	    success: function(result) {
	// 	        console.log(result);

	// 	        for(var i = 0; i < result.length; i++){
	// 	        	console.log(result[i])
	// 	        }
		        
	// 	    },
	// 	    error: function(err){
	// 	    	console.log(err);
	// 	    }
	// 	});
	// console.log('collect ',this.state.restCollection)

	},
	cycle: function(){
			$.ajax({
		    url: 'https://calm-forest-6617.herokuapp.com/happyhours/',
		    type: 'GET',
		    success: function(result) {
		        // console.log(result);

		        for(var i = 0; i < result.happyhours.length; i++){


		    //     	 console.log(result.happyhours.length)

		    //     		var restaurant = new RestaurantModel({
						//    	restaurant: result.happyhours[i].restaurant,
					 //    	details: result.happyhours[i].details,
					 //    	address: result.happyhours[i].address,
					 //    	phone: result.happyhours[i].phone,
					 //    	website: result.happyhours[i].website,
					 //    	latitude: result.happyhours[i].latitude,
					 //    	longitude: result.happyhours[i].longitude
						// })
						// restaurant.save().done(
						// 	function(data){
						// 		// console.log('saved')
						// 		// self.fetchData();
						// 		console.log(data);
						// 	},
						// 	function(err){
						// 		console.log(err);
						// 	}
						// )

		        }
		        
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	console.log('collect ',this.state.restCollection)

	},
	delete: function(e){
		e.preventDefault();
		console.log(this.refs.modelId.getDOMNode().value);
		self = this;

		var id = this.refs.modelId.getDOMNode().value

		$.ajax({
		    url: 'https://calm-forest-6617.herokuapp.com/users',
		    data: {id: id},
		    type: 'DELETE',
		    success: function(result) {
		        console.log(result);
		        self.fetchData();
		    },
		    error: function(err){
		    	console.log(err);
		    }
		});
	
	},
	put: function(e){
		e.preventDefault();
		self = this;
		var name = this.refs.name.getDOMNode().value;
		var id = this.refs.modelId.getDOMNode().value;
		var pass = this.refs.age.getDOMNode().value;

		$.ajax({
			url: 'https://calm-forest-6617.herokuapp.com/users',
			data: {id: id, username: name, password: pass},
			type: 'PUT',
			success: function(result){
				console.log(result)
				self.fetchData();
			},
			error: function(err){
				console.log(err);
			}
		})
	},
	search: function(e){
		e.preventDefault();
		self = this;
		var id = this.refs.modelId.getDOMNode().value
		$.get('https://calm-forest-6617.herokuapp.com/users'+ id, function(data){
			console.log(data);
			self.setState({
				user: data
			})
		})

	},
	fetchData: function(){
		var self = this;
		myUserlist.fetch({
			success: function(user){
				self.setState({
					myCollection: user.models
				})		
			}
		})
	}

})