var React = require('react');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backparse')(require('../config/parseSettings'));

module.exports = React.createClass({
	getInitialState: function(){
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
		
				<div className="formHolder">
				<form className="login" onSubmit = {this.submit}>
				<h1>Login</h1>
					<div style={divStyle} ref="error1">{this.state.errors}</div>
					<label> Username</label><br/>
					<input ref="user"  type="text" placeholder="enter username" defaultValue="user123"/><br/>
					<label> Password</label><br/>			
					<input ref="pw" type="password" placeholder="enter password" defaultValue="pass123" /><br/>
					<button>Submit</button>
				</form>
				</div>
			</div>
		

		);
	},
	login: function(e){
		e.preventDefault();
		this.props.router.navigate('login', {trigger: true});
	},
	// signup: function(e){
	// 	e.preventDefault();
	// 	this.props.router.navigate('register', {trigger: true});
	// },
	submit: function (e){
		e.preventDefault();
		var self = this;
		var err = {}
		var username = this.refs.user.getDOMNode().value;
		var password = this.refs.pw.getDOMNode().value;

		if(!username){
			err.username = 'Please enter a username'
		}
		else if (!password){
			err.password = 'Please enter a password'
		}
		this.setState({
			errors: err
		})
		if(_.isEmpty(err)){

			var user = this.props.user;

			user.login(
			{	username: username,
				password: password
			},
			{
				success: function(usermodel){
					// console.log('user logged in');
					// console.log(usermodel);
					localStorage.setItem('id', usermodel.attributes.objectId)
					 localStorage.setItem('username', usermodel.attributes.username)
					// localStorage.setItem('sessionToken', usermodel.attributes.sessionToken)
					self.props.router.navigate('blog', {trigger: true});
				},
				error: function(usermodel, response){
					 console.log('user was not logged in', response.responseJSON.error)
					 self.setState ({
					 	errors: response.responseJSON.error
					 })
				
				}
			});

		}
	

		
	}
})