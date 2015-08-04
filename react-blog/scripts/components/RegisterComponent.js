var React = require('react');
var UserModel = require('../models/UserModel');
var validator = require('validator');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			errors: {}
		}		
	},
	render: function(){
		var divStyle = {
			color: 'red'
		}
		return(
			<div>
				<div className="nav">
					<div className="links">
					<div className="logout" ref="login" onClick={this.login}><a href="#login">Log In</a></div>
					{/*<div ref="signup" onClick={this.signup}><a href="#register" >Sign Up</a></div>*/}
					</div>
				</div>
				<div>
						<img className="bg" src="http://travelshows.com/files/Home%20Page%20Backgrounds/fiji.jpg"/>
				</div>
				<div className="postHolder">
					<form className="register" onSubmit = {this.submit}>
						<h1>Sign Up</h1>
						<div style={divStyle}>{this.state.errors.parseError}</div>
						<div style={divStyle}>{this.state.errors.user}</div>
						<label>Username</label><br/>
						<input ref="user" type="text" placeholder="enter username"/><br/>	
						<div style={divStyle}>{this.state.errors.email}</div>
						<label>Email</label><br/>
						<input ref="email" type="text" placeholder="enter email"/><br/>			
						<div style={divStyle}>{this.state.errors.password}</div>
						<label>Password</label><br/>
						<input  ref="pass" type="password" placeholder="enter password"/><br/>
						
						<div style={divStyle}>{this.state.errors.password2}</div>
						<label>Confirm Password</label><br/>
						<input  ref="pass2" type="password" placeholder="enter password"/><br/>
						
						<button>Submit</button>
					</form>
				</div>

			</div>
		)
	},
	login: function(e){
		e.preventDefault();
		this.props.router.navigate('login', {trigger: true});
	},
	signup: function(e){
		e.preventDefault();
		this.props.router.navigate('register', {trigger: true});
	},
	submit: function(e){
		e.preventDefault();

		var err = {};
		var self = this;

	

		var email = this.refs.email.getDOMNode().value;
		var password = this.refs.pass.getDOMNode().value;
		var password2 = this.refs.pass2.getDOMNode().value;
		var user = this.refs.user.getDOMNode().value;

		if(!user){
			err.user = "Please enter a username"
		}
		else if(!email){
			err.email = "Please enter an email address";
		}
		else if(!validator.isEmail(email)){
			err.email = "The email looks wrong";
		}
		else if(!password){
			err.password = 'Please enter a password';
		}
		else if(!password2){
			err.password2 = 'Please confirm your password';
		}
		else if(password !== password2){
			err.password2 = 'Passwords do not match'
		}
		this.setState({
				errors: err
		})
		if(_.isEmpty(err)){
				console.log(this.props.user);
				var user = this.props.user
				 user.set({
					username: this.refs.user.getDOMNode().value,
					password: this.refs.pass.getDOMNode().value,
					email: this.refs.email.getDOMNode().value
				});

				user.save( 
					{null},
					{	success: function(UserModel){
					 		console.log('user was added')
					 	 	self.props.router.navigate('postlist', {trigger: true});
						},
					 	error: function(UserModel, response){
					 		console.log('user was not added', response.responseJSON)

					 			err.parseError = response.responseJSON.error
					 			self.setState({
									errors: err
								})
				 		}
			 		}
				);
			}
		
		
		
	}
		
})