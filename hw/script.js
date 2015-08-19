$(document).ready(function(){

	var list =[];

	//adds new item to list	
	$('.add-btn').on('click', function(e){
		list.push($('.item').val());	
		render();
	});

	//adds JSON to list
	$('.load-btn').on('click', function(){
		var json = $('.json').val();
		//validates input is in JSON format or throws error
		try{	
			json = JSON.parse(json);
			list = list.concat(json);
			render();
		}
		catch(e){
			$('.error').html('Not valid JSON');
			json = null;
		}
	});

	//removes item from list
	$('.display').on('click', 'span', function(e){
		 $(this).parent().remove();
		 list = [];
		 render();
	});

	//renders out an updated list
	function render(){
			$('.error').html('');
			$('.json').val('');
			$('.item').val('');
			var str = '';
			
			//tranverse through the list array to add new items from JSON or Add inputs
			if(list.length>0){
				$(list).each(function(index, object){
					str += '<div class="list-item"><div class="index">' +(index+1)+'.</div><div class="item-val">'+object+'</div> <span class="del"> delete </span></div>';	
				});
			}
			else {
				//transverse through the DOM to find all list-items, re-populate the array,update index, and save it as a string
				$('.list-item').each(function(index, object){

					list.push($(this).find('.item-val').text());
					$(this).find('.index').html((index +1)+'.');
					str += '<div class="list-item">'+ $(this).html() + '</div>';
				});
			}
			$('.display').html(str);
			$('.JSON-list').html(JSON.stringify(list, null, 4));
	}

});
