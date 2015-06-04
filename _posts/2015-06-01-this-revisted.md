---
title: $(This) Revisited
comments: true
tags: jquery javascript IronYard
layout: post
---


I learned today that e.target and $(this)(or this or $this) are not the same thing. And here's a small code snippit to prove it. 

		```
		<div class="parent">
			<div class="child">Child</div>
		</div>
		```
		```javascript
		$('.parent').click(function(e){
			console.log('this ' + $(this).attr('class'));
			console.log('e.target ' + $(e.target).attr('class'));
		});
		```

Originally, I assumed if you have a function with a click event, you can use e.target and $(this) interchangebly. But $(this) fails in the above example because $(this) will always return the object containing the function. In this case it's the parent element. However, e.target gives you the element that was clicked. So if I clicked the child element: e.target = 'div.child'. If I clicked the parent element: e.target = 'div.parent'. Mind blown.




