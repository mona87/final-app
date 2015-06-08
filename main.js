$(document).ready(function() {
	
	buildTemp = _.template($('.chat-info').html());
	var input;
	var user = $('#usernamebox').val('username');
	var room = '';
	var chatroom = '';
	var chatscreen = '#general-box';
	var url = 'http://fathomless-caverns-2838.herokuapp.com/messages';
	$('.active').hide();
	$('.leader').hide();
	$('#cats-box').hide();
	$('#slacking-box').hide();
	getMsg();


	$('.chatrooms').click(function(e){

		$('.screen').hide();
		var className = $(e.target).attr('id');

		if(className === 'general'){
			url = 'http://fathomless-caverns-2838.herokuapp.com/messages/'
			room = '';
		}
		else{
			url = 'http://fathomless-caverns-2838.herokuapp.com/messages/' + className;
			room = className;
		}

		chatscreen = '#'+className+'-box';
		console.log(chatscreen);
		className = '.'+$(e.target).attr('id');
		$(className).show();
		getMsg();
		

	})

	$('#formbox').submit(function(e){
		e.preventDefault();

	 	sendchat();
		getMsg();

		
	});	

	//switchs the info in side box
	$('.side-links').click(function(e){

		$('.infobox').hide();
		$(e.target).show();
		var className = '.'+$(e.target).attr('id');
		$(className).show();
		console.log(className);
	


	})

	//leaderboard 
	function getScores(){
			$.get('http://fathomless-caverns-2838.herokuapp.com/messages/leaderboard', function(scores){
				var string = '';
				$('#leaderbox').html('');
				for(var prop in scores){
					string = '<div class="leadname" id="'+prop+'">'+prop +'</div><div class="leadnum"> '+scores[prop]+'</div>';
					$('#leaderbox').append(string);
				}				
			},
			'JSON');
	}
	//active user
	function getActiveUsers(){
		console.log('active');
		 $.get('http://fathomless-caverns-2838.herokuapp.com/messages/active_users', function(activeUsers){
		 		var string ='';
		 		$('#activeUsr').html('');
		 			for(var i =0; i <activeUsers.length; i++){
		 				string = '<div id="'+activeUsers[i]+'">'+' '+activeUsers[i]+'</div>';
		 				$('#activeUsr').append(string);
		 			}	
		 },
		 'JSON');
	}
	//active chat
	function getActiveChat(){
			$.get('http://fathomless-caverns-2838.herokuapp.com/messages/active_chatroom', function(activeChat){
				var string = '';
				 $('#activeChat').html('');
				 var array = [];
				for(var prop in activeChat){
					string = '<div class="chatname" id="'+prop+'">'+prop +' </div>'+'<div class="chatnum">'+activeChat[prop]+'</div>';
					array.unshift(string);
					
				}			
				for(var i = 0; i < array.length; i++){
					$('#activeChat').append(array[i]);
				}	
			},
			'JSON');
	}

	//post message
	function sendchat(){
		$input = $('#inputbox').val();
		user = $('#usernamebox').val();

		$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry: $input, room_name: room}, 'JSON' );
		$('#inputbox').val('');	
	}
	//gets chat msgs
	function getMsg(){
		getScores();
		getActiveUsers();
	 	getActiveChat()
		// console.log('chatscreen ' +chatscreen);
		$.get(url,chatMessages, 'JSON' );
		// console.log('getmsg url: '+url);
		function chatMessages(data){
		var addMsgs =  '';

			data.reverse();
			for(var i=0; i<data.length; i++){
				var msg = data[i];
				var time = moment(msg.created_at).format("h:mm a");
				addMsgs += buildTemp(msg);

			}
				if (data.length>messagenumber && messagenumber>0){
					beep();
				}
				if (data.length>messagenumber){
					messagenumber=data.length;
					$(chatscreen).html(addMsgs);

					function getHeight(){
						$(chatscreen).scrollTop($(chatscreen).prop('scrollHeight'))
					}

					setTimeout(getHeight,500 );
					// $('#chatbox').emoticonize();
					$(chatscreen).profanityFilter({
	    				customSwears: ['booty','boobie','ass','weiner','crap','shit','fuck']
					});
					chatbot(data[data.length-1]);
				
				}
		}


	}
	function beep() {
	    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
	    snd.play();
}
	function chatbot(message){
		if (message.entry === 'hello'){
			$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry:'how are you?', room_name: room }, 'JSON' );
			
		}
		else if (message.entry === 'hi'){
			$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry:'whats up?', room_name: room }, 'JSON' );
		}
		else if (message.entry === 'bye'){
			$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry:'peace out!', room_name: room }, 'JSON' );
		}
		else if (message.entry === 'idk'){
			$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry:'i dont know', room_name: room }, 'JSON' );
		}
		else if (message.entry === 'k'){
			$.post('http://fathomless-caverns-2838.herokuapp.com/messages/new', {username: user, entry:'okay', room_name: room }, 'JSON' );
		}
		
	}



	var messagenumber = 0;
	 // setInterval(getMsg, 1000);
	 // setInterval(getScores, 1000);
	 // setInterval(getActiveUsers, 1000);
	 	getActiveUsers();
	 	getActiveChat()
});

