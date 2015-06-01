---
title: jQuery Photo Album
comments: true
tags: jquery javascript photo album IronYard
layout: post
---


I'm proud of this project. It's like my baby. :) I knew right off the bat I wasn't going to code in 36 img tags into my javascript. Partly because I'm lazy, but mainly because I wanted to be efficient. Even though I'm all about writing code from scratch, I used the infamous bootstrap for layout and added my own custom css for flavor. Then I posted all my images on the tiny pizza server, used the $.get() to retrieve the data, and then parse the information with arrays. 

One of my biggest issues was getting the height and width of the parent div to match the image's width and height. Did my research and found this nifty trick all done in css:

<strong>.some_element {
 		width: 50%;
		height: 0;
		padding-bottom: 50%;
	}
</strong> 

Not exactly sure why this works, but I'm glad it does.

So now here's my responsive photo album filled with nothing but cute cuddley animals. Cheers!


<p data-height="400" data-theme-id="15312" data-slug-hash="OVWKNb" data-default-tab="result" data-user="inspire" class='codepen'>See the Pen <a href='http://codepen.io/inspire/pen/OVWKNb/'>jQuery Photo Album</a> by mona (<a href='http://codepen.io/inspire'>@inspire</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

