var Backbone = require('backparse')(require('../config/parseSettings'));
var React = require('react');
var BlogPostModel = require('../models/BlogPostModel');

module.exports = React.createClass({
	render: function(){
		var divStyle = {
			color: 'red'
		}
		// console.log('user id '+  );
		return(
			<div className="postHolder">
			<form className="blogpost" onSubmit = {this.addPost}>

				<h1>New Post</h1>
				<div style={divStyle} ref="error"></div>

				<label>Category</label><br/>
				<select ref="cat" >
					<option value="1"> -- select an option -- </option>
					<option >Animals</option>
					<option>Movies</option>
					<option>Sports</option>
				</select><br/>
				<label>Title</label><br/>
				<input ref="title" type="text"></input><br/>
				<label>Body</label><br/>
				<textarea ref="body"></textarea><br/>
				
				<button>Submit</button>
			</form>
			</div>
		);
		
	},
	addPost: function(e){
		e.preventDefault();
		self = this;
		var post = new BlogPostModel();
		post.set({
			title: this.refs.title.getDOMNode().value,
			body: this.refs.body.getDOMNode().value,
			category: this.refs.cat.getDOMNode().value,
			userID: this.props.user

		})
		// console.log(this.refs.cat.getDOMNode().value);

		if(post.isValid()){
			// console.log('valid')
			this.refs.error.getDOMNode().innerHTML = "";

			post.save({null},
					{ success: function(post){
						// console.log(post);
						// console.log('post added');
						self.props.router.navigate('blog', {trigger: true});
					},
					error: function(UserModel, response){
						// console.log(response)
					}
				}
			)
		}
		else{
			// console.log(post.validationError);
			this.refs.error.getDOMNode().innerHTML = post.validationError;
		}

	}
});