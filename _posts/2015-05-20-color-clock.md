---
title: Color Clock
layout: post
---
<p>This is the first homwework where I get to use javascript to maniupulate the DOM. It uses the setInterval function to update the Date object every second and displays the result through a string. My goal was to create the 'rainbow effect' so I originally used the rgb property to changed the background-color. Unfortunately, rgb contains all possible values including whites, grays and blacks. After an hour of failed attempts and convoluted conditional statements, I think, "There's gotta be a better way to do this." 
<p>Thankfully google is my friend and I discovered this awesomely new css property called <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()">hsl()</a> which takes a hue, saturation, and opacity. (Why haven't I been using this?!) The hue represents the rainbow in a circle with the values ranging from 0 to 360: red=0=360, green=120, and blue=240. Basically, my code got a whole lot easier. The final solution has the counter tranversing through the values and resets after 360. Winnning.
</p>

<div data-height="294" data-theme-id="15312" data-slug-hash="RPGGey" data-default-tab="js" data-user="inspire" class='codepen'><pre><code>
var clock = document.getElementById(&#39;clock&#39;);
//console.log(clock);
var hue= 0;

function update ()
{
	var clock = document.getElementById(&#39;clock&#39;);	
	var time = new Date();
	var seconds = time.getSeconds();
	var hours = time.getHours();
	var minutes = time.getMinutes();

	hue+= 3;
	if(hue &gt; 360){
		hue = 0;
	}
	//changes hue
	document.body.style.backgroundColor= &#39;hsl(&#39;+hue+&#39;, 100%, 50%)&#39;;
	console.log(document.body.style.backgroundColor);


	//adds 0 to seconds/mins/hours below 10
	if(seconds &lt; 10){
		seconds = &#39;0&#39; + seconds;
	}
	if( minutes &lt; 10){

		minutes = &#39;0&#39; + minutes;
	}
	if(hours &lt; 10){

		hours = &#39;0&#39; + hours;
	}
	clock.innerHTML = hours+&#39;:&#39; + minutes+ &#39;:&#39; + seconds;

}

setInterval(update, 1000);</code></pre>
<p>See the Pen <a href='http://codepen.io/inspire/pen/RPGGey/'>Color Clock</a> by mona (<a href='http://codepen.io/inspire'>@inspire</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div><script async src="//assets.codepen.io/assets/embed/ei.js"></script>