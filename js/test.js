window.game_counter = 1;
window.nb_of_balls = 10;
window.level = 1;

$(document).ready(function(){

	// launch game
	$(document).on( 'click' ,'#launch', function(){
		$('.forever').css('animation-iteration-count', 'infinite').css('-webkit-animation-iteration-count', 'infinite');
		$('#launch').remove();
		window.test = setInterval(function()
	{
		var x = parseInt($("#square").css('left'));
		var y = parseInt($("#square").css('top'));
		var element_coordinates = [x, x+15, y+2, y+15];

		for (var i=1; i<=nb_of_balls; i++)
		{
			var coordinates = $('#ball'+i).offset();
			window.range = [coordinates.left, coordinates.left + parseInt($('#ball'+i).css('width')),coordinates.top, coordinates.top + parseInt($('#ball'+i).css('height'))];
			if (isCollide(element_coordinates, range))
			{
			game_counter ++;
			$('#square').css({
					top: '330px',
					left: '20px' 
				});

				$('#attempt').html('Attempt: '+game_counter+'</br> Try Again !!!!');
			}
		}
	}, 20);
	});

	// new level
	$(document).on('click', '.level', function(){
		level++;
		// select the level of your choice
		level = $(this).attr('value');
		$('.balls').css('display', 'none');
		// 
		$('.forever').css('animation-iteration-count', '0').css('-webkit-animation-iteration-count', '0');
		$('#square').css(
		{
            top: "330px",
            left: "20px",
            display: "block"
		});
		// displaying the text
		$('#level').remove();
		$('#button-bar').html('<div class="button" id="launch">Start</div>');
		$('h1').html('Level'+level);
		$('h4').html('Attempt: '+game_counter);
		

		$('.ball_1').css('display', 'block');
		if (level == 2 || level == 3 || level == 4 || level == 5)
		{
			$('.ball_2').css('display', 'block');
			nb_of_balls = 12;
			if(level == 3 || level == 5)
				{
					console.log(level);
					$('.ball_3').css('display', 'block');
					nb_of_balls = 13;
				}
			if(level == 4 || level == 5)
				{
					$('.ball_4').css('display', 'block');
					nb_of_balls = 15;
				}
		}
	});



// start area coordinates 
var coordinates_start = $('#start').offset();
window.range_start = [coordinates_start.left, coordinates_start.left + parseInt($('#start').css('width')),coordinates_start.top, coordinates_start.top + parseInt($('#start').css('height'))];

// middle area coordinates
var coordinates_middle = $('#middle').offset();
window.range_middle = [coordinates_middle.left, coordinates_middle.left + parseInt($('#middle').css('width')),coordinates_middle.top, coordinates_middle.top + parseInt($('#middle').css('height'))];

// finish area coordinates
var coordinates_finish = $('#finish').offset();
window.range_finish = [coordinates_finish.left, coordinates_finish.left + parseInt($('#finish').css('width')),coordinates_finish.top, coordinates_finish.top + parseInt($('#finish').css('height'))];


// Move
	$(document).keydown(function(data)
	{			
	// params
		var x = parseInt($("#square").css('left'));
		var y = parseInt($("#square").css('top'));
		var top = y;
	    var left = x;
		var key = []; // Or you could call it "key"
		onkeydown = onkeyup = function(e)
		{
			e = e || event; // to deal with IE
			key[e.keyCode] = e.type == 'keydown';
				if(key[38])
				{
					// yellow square coordinates
					var element_coordinates = [x, x+15, y-8, y+8];
					// checking if it is in the game area
					if(checkIfInGame(element_coordinates, range_start, range_middle, range_finish))
					{
						
					direction = "top";
					top = y -16;
					}
				}
					else if(key[40]){
					// yellow square coordinates
					var element_coordinates = [x, x+15, y+8, y+24];

					// checking if it is in the game area
					if(checkIfInGame(element_coordinates, range_start, range_middle, range_finish))
					{
					direction = "down";
					top = y + 16;
					}
				}
					else if(key[37]){
					// yellow square coordinates
					var element_coordinates = [x-8, x+8, y, y+16];

					// checking if it is in the game area
					if(checkIfInGame(element_coordinates, range_start, range_middle, range_finish))
					{
					direction = "left";
					left = x - 16;
					}
				}
					else if(key[39]){
					// yellow square coordinates
					var element_coordinates = [x, x+16, y, y+16];
					// checking if it is in the game area
					if(checkIfInGame(element_coordinates, range_start, range_middle, range_finish))
					{
					direction = "right";
					left = x + 16;
					}
				}
				 $("#square").css({
			            top: top+"px",
			            left: left+"px"
				});
		}
	});

});



function checkIfInGame(coordinates_object, range_start, range_middle, range_finish)
{	
	var counter = 0;

	// start
	if (coordinates_object[0] >= range_start[0] && coordinates_object[0] <= range_start[1])
	{	
		if(coordinates_object[2] >= range_start[2] && coordinates_object[3] <= range_start[3])
		{
		counter ++;
		}
	}
	// middle
	if (coordinates_object[0] >= range_middle[0] && coordinates_object[1] <= range_middle[1])
	{
		if(coordinates_object[2] >= range_middle[2] && coordinates_object[3] <= range_middle[3])
		{
		counter ++;
		}
	}
	// finish
	if (coordinates_object[1] >= range_finish[0] && coordinates_object[1] <= range_finish[1])
	{	
		if(coordinates_object[2] >= range_finish[2] && coordinates_object[3] <= range_finish[3])
		{
			counter ++;
			$('.ball_1').css('display', 'none');
			$('.ball_2').css('display', 'none');
			$('.ball_3').css('display', 'none');
			$('.ball_4').css('display', 'none');
			$('#square').css('display', 'none');
			if(level == 5)
				{
					$('#attempt').html('Congratulation you have finished the game in '+game_counter+' !!!');
					game_counter = 1;
				}
			else
			{
			next_level = parseInt(level)+1; 
			$('#attempt').html('Level '+level+' Completed in ' +game_counter+ ' attempts !!!');
			$('#button-bar').html('<div class="button level" value='+next_level+'>Level '+next_level+'</div>');
			}
			clearInterval(test);
		}
		
	}
	if (counter > 0)
	{
	return true;
	}
	else
	{
	return false;
	}
} 

function isCollide(a, b) {
    return!(
        (a[3] < b[2]) ||
        (a[2] > b[3]) ||
        (a[1] < b[0]) ||
        (a[0] > b[1])
    );
}

