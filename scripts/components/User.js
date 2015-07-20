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
					<h1 >Happy Hour!</h1>	
					<span style={style} className="user" onClick={this.slide}  className="user" >Welcome {this.state.username}!</span>		
				</div>
				<div className="row">
				<div className="col-sm-12">
					<div ref="slider" className="slider"></div>
				</div>
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