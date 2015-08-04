var React = require('react');
var moment = require('moment');

module.exports = React.createClass({

	render: function(){
		// console.log(this.props.posts);
		var posts = this.props.posts.map(function(postModel){
			return(
				<div  key={postModel.cid}>		
				<div className="posts" >
				<div><h2>{postModel.get('title')}</h2></div>
				<p><a href={'#category/' + postModel.get('category')}>{postModel.get('category')}</a> | {moment(postModel.get('createdAt')).format('dddd, MMMM Do YYYY')}</p>
				<div><p>{postModel.get('body')}</p></div>
				</div>
				</div>
			);
		})
		return(
		
		
			<div className="postHolder">
				<div className="category"><h1>{this.props.category}</h1></div>
				<div>{posts}</div>
			</div>
		
		)
	}

});