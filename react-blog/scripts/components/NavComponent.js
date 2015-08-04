var React = require('react');


module.exports = React.createClass({
	getInitialState: function(){
		return{
			username: this.props.user.attributes.username,
			session: this.props.user.attributes.sessionToken
		}
	},
	render: function(){
		var username = this.state.username;
		var style = {
			display: 'none'
		}
		// console.log('username ' +username)
		return(
			<div>
				<div className="nav">
					<div>
						<div className="welcome" ref="welcome">
							Hello {username.toString()}!
						</div>
						<div className="links">
						<div  className="logout" ref="logout" onClick={this.logout}><a href="#login">Log Out</a></div>					
						<div ref="addpost"><a href="#post">New Post</a></div>
						<div ref="blog"><a href="#blog">Blog</a></div>
						</div>
					</div>
				</div>

				<div >
				<img className="bg" src="http://travelshows.com/files/Home%20Page%20Backgrounds/fiji.jpg"/>
				</div>
			</div>
		);
	},
	logout: function(e){
		e.preventDefault();
		var user = this.props.user;
		// console.log(user);	
		// user.logout({
		// 	success: function(user){
		// 		// console.log('logged out');
		// 	},
		// 	error: function(user, response){
		// 		// console.log(response)
		// 	}
		// });	
		this.props.router.navigate('login', {trigger: true});

	},

})