var React = require('react');

module.exports = React.createClass({
	componentDidMount: function(){
		function initialize() {
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
		  var myLatlng = new google.maps.LatLng(30.198407900000003,-97.7729914);
		  var mapOptions = {
		    zoom: 13,
		    center: myLatlng,
		    mapTypeControlOptions: {
     	    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    		},

		  }
		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		  var image = 'http://tbs-va.com/wp-content/uploads/2013/05/Manhattan-Perfect-cocktail.png'
		  var marker = new google.maps.Marker({
		      position: myLatlng,
		      map: map,
		      title: 'Hello World!',
		     
		  });
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
  		}
			google.maps.event.addDomListener(window, 'load', initialize);	
	},
	render: function(){
		var style={
			height: '100%',
			width: '100%',
			margin: '0',
			padding: '0'
		}
		return(
			<div style = {style} id="map-canvas"></div>
		);
	}

});