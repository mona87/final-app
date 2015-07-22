var React = require('react');
var $ = require('jquery');
var CarouselComponent = require('./CarouselComponent');

// var store = localStorage.getItem('username')
// console.log('store ', localStorage.getItem('username'))
// if(store !== 'mona'){
	
// 	window.location.href = '/#login';
// }
// else{

module.exports = React.createClass({
	getInitialState: function(){
			// console.log(localStorage.getItem('username'));
		return{
			username: null,
			id: null
		}
	},
	render: function(){
		this.update();
		var style = {
			display: 'none'
		}
		return(
			<div>
				<div className="row">
					<div className="col-sm-12 header">
						<h1 >Happy Hour</h1>	
						<a className="mylinks" href="https://www.linkedin.com/pub/ramona-bellamy/bb/160/289" target="_blank"><i className="fa fa-linkedin fa-2x"></i></a>
						<a className="mylinks" href="https://twitter.com/mona_dev87" target="_blank"><i className="fa fa-twitter fa-2x"></i></a>
						<a className="mylinks" href="https://github.com/mona87/my-final-project" target="_blank"><i className="fa fa-github-alt fa-2x"></i></a>
					</div>
					
				</div>		
			</div>
		);
	},
	componentDidMount: function(){

	},
	update: function(){
		this.state.username = localStorage.getItem('username');
		this.state.id = localStorage.getItem('id');
	},
	slide: function(e){
		e.preventDefault();
		console.log(this.getDOMNode());
		$(this.refs.slider.getDOMNode()).slideToggle('fast');
	}



});