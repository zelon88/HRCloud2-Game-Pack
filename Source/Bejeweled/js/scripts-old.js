/** Define variables **/
var jewel_colors = ["blue","green","orange","purple","red","white","yellow"];
var matching_jewels = []; /** Array to hold the total current board matches **/
var matching_jewel_pair = []; /** Array to store the immediate group of matching jewels to be added to the group of total board matches **/
var selected_jewel = "";

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


var populate_board = function() {

	$('.column .jewel-wrap').each(function() {
		if ( $(this).children().length == 0 ) {
			//grab a random jewel color
			shuffleArray(jewel_colors);
			var jewel_color = jewel_colors[0];

			$(this).html('<span class="jewel"></span>'); 
			$(this).children().addClass( jewel_color ).attr('data-color',jewel_color);
		}
	});

}

var unmatch_vertical = function(jewel_column, jewel_order, jewel_color) {
	//This function serves to evaluate and change a jewel color to ensure a vertical 3 pair is broken up
	//console.log('unmatch vertical called..');

	//get color of 1 left
	var jewel_left_column = jewel_column - 1;
	var jewel_left_color = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color'); 
	//get color of 1 right
	var jewel_right_column = jewel_column + 1;
	var jewel_right_color = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color'); 

	//create an array of available colors to use that excludes the colors immidiately surrounding the central offending jewel
	if ( jewel_right_color == jewel_left_color ) {
		var blocked_colors = [jewel_right_color, jewel_color];
	} else {
		var blocked_colors = [jewel_right_color, jewel_left_color, jewel_color];
	}

	var available_colors = $(jewel_colors).not(blocked_colors).get();

	//shuffle the available colors and assign a random one to the central jewel
	shuffleArray(available_colors);
	//console.log(jewel_colors);
	//console.log(blocked_colors);
	//console.log(available_colors);
	var jewel_new_color = shuffleArray(available_colors[0]);
	$(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color',jewel_new_color).removeClass(jewel_color).addClass(jewel_new_color);
	//console.log('jewel located in column '+jewel_column+', row '+jewel_order+'with original color '+jewel_color+'was changed to '+jewel_new_color)
}

var unmatch_horizontal = function(jewel_column, jewel_order, jewel_color) {
	//This function serves to evaluate and change a jewel color to ensure a horizontal 3 pair is broken up
	//console.log('unmatch horizontal called..');

	//get color of 1 up
	var jewel_above_order = jewel_order + 1;
	var jewel_above_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel").attr('data-color'); 
	//get color of 1 down
	var jewel_below_order = jewel_order - 1;
	var jewel_below_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel").attr('data-color'); 

	//create an array of available colors to use that excludes the colors immidiately surrounding the central offending jewel
	if ( jewel_above_color == jewel_below_color ) {
		var blocked_colors = [jewel_above_color, jewel_color];
	} else {
		var blocked_colors = [jewel_above_color, jewel_below_color, jewel_color];
	}

	var available_colors = $(jewel_colors).not(blocked_colors).get();

	//shuffle the available colors and assign a random one to the central jewel
	shuffleArray(available_colors);
	//console.log(jewel_colors);
	//console.log(blocked_colors);
	//console.log(available_colors);
	var jewel_new_color = shuffleArray(available_colors[0]);
	$(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color',jewel_new_color).removeClass(jewel_color).addClass(jewel_new_color);
	//console.log('jewel located in column '+jewel_column+', row '+jewel_order+'with original color '+jewel_color+'was changed to '+jewel_new_color);
}

var clean_up_matches = function () {
	//This function is used prior to game action, to ensure no matches exist on the board at the outset

	//go through each jewel
	$('.column .jewel-wrap .jewel').each(function() {
		//Get current column jewel is in 
		var jewel_column = parseInt( $(this).parent().parent('.column').attr('data-column') );
		//Get current heirarchy of jewel
		var jewel_order = parseInt( $(this).parent('.jewel-wrap').attr('data-order') );
		//identify the color of the current jewel
		var jewel_color = $(this).attr('data-color');

		//console.log('checking jewel in column '+jewel_column+' at location '+jewel_order+', with color of '+jewel_color);

		//check 1 above & below for a match of 3	
		if ( jewel_order >= 1 && jewel_order < 8 ) {
			//above
			var jewel_above_order = jewel_order + 1;
			var jewel_above_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel above current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another below it & the above colors match, check the jewel color below
			if ( jewel_order >= 2 && jewel_color == jewel_above_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel color above it.  Checking below now..');
				//check below next
				var jewel_below_order = jewel_order - 1;
				var jewel_below_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_below_color ) {
					//there's a vertical match of 3, we need to fix it
					//console.log('vertical match of 3 in column '+jewel_column+', rows: '+jewel_above_order+jewel_order+jewel_below_order);
					unmatch_vertical(jewel_column, jewel_order, jewel_color);
				}
			}
		}

		//check 1 left & right for a match of 3	
		if ( jewel_column ) {
			//left
			var jewel_left_column = jewel_column - 1;
			var jewel_left_color = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel left of current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another right of it & the left color matches, check the jewel color to the right
			if ( jewel_column < 8 && jewel_color == jewel_left_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel to left of it.  Checking right now..');
				//check right next
				var jewel_right_column = jewel_column + 1;
				var jewel_right_color = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_right_color ) {
					//there's a horizontal match of 3, we need to fix it
					//console.log('horizontal match of 3 in columns '+jewel_left_column+jewel_column+jewel_right_column+', row: '+jewel_order);
					unmatch_horizontal(jewel_column, jewel_order, jewel_color);
				}
			}
		}

	})

}

var check_board_for_matches = function(jewel) {
	console.log('check board for matches called..');
	var matches = false;

	//go through each jewel
	$('.column .jewel-wrap .jewel').each(function() {
		//Get current column jewel is in 
		var jewel_column = parseInt( $(this).parent().parent('.column').attr('data-column') );
		//Get current heirarchy of jewel
		var jewel_order = parseInt( $(this).parent('.jewel-wrap').attr('data-order') );
		//identify the color of the current jewel
		var jewel_color = $(this).attr('data-color');

		//console.log('checking jewel in column '+jewel_column+' at location '+jewel_order+', with color of '+jewel_color);

		//check 1 above & below for a match of 3	
		if ( jewel_order >= 1 && jewel_order < 8 ) {
			//above
			var jewel_above_order = jewel_order + 1;
			var jewel_above_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel above current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another below it & the above colors match, check the jewel color below
			if ( jewel_order >= 2 && jewel_color == jewel_above_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel color above it.  Checking below now..');
				//check below next
				var jewel_below_order = jewel_order - 1;
				var jewel_below_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_below_color ) {
					//there's a vertical match of 3
					console.log('vertical match of 3 in column '+jewel_column+', rows: '+jewel_below_order+jewel_order+jewel_above_order);
					matches = true;
				}
			}
		}

		//check 1 left & right for a match of 3	
		if ( jewel_column ) {
			//left
			var jewel_left_column = jewel_column - 1;
			var jewel_left_color = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel left of current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another right of it & the left color matches, check the jewel color to the right
			if ( jewel_column < 8 && jewel_color == jewel_left_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel to left of it.  Checking right now..');
				//check right next
				var jewel_right_column = jewel_column + 1;
				var jewel_right_color = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_right_color ) {
					//there's a horizontal match of 3
					console.log('horizontal match of 3 in columns '+jewel_left_column+jewel_column+jewel_right_column+', row: '+jewel_order);
					matches = true;
				}
			}
		}

	});

	return matches;

}

var check_pair_for_more_matches = function(jewel_first, jewel_last, direction) {
	//This function takes a given 3/4 pair (via the 2 endpoint jewels), 
	//and checks either side to see if there are more matching jewels

	//jewel_first = leftmost jewel in the 3/4 horizontal pair OR bottom-most jewel in the 3/4 vertical pair
	//jewel_last = rightmost jewel in the 3/4 horizontal pair OR topmost jewel in the 3/4 vertical pair

	//Variables
	var jewel_color = $(jewel_first).attr('data-color');

	var jewel_first_column = parseInt( $(jewel_first).parent().parent('.column').attr('data-column') );
	var jewel_first_order = parseInt( $(jewel_first).parent('.jewel-wrap').attr('data-order') );

	var jewel_last_column = parseInt( $(jewel_last).parent().parent('.column').attr('data-column') );
	var jewel_last_order = parseInt( $(jewel_last).parent('.jewel-wrap').attr('data-order') );

	console.log('"check for more matching jewels" function called..');
	console.log('matching jewels color is'+jewel_color);

	if ( direction == "vertical" ) {
		//if the search is vertical, check the endpoints for any additional matching jewels
		var jewel_above_column = jewel_last_column;
		var jewel_above_order = ( jewel_last_order + 1);
		var jewel_above = $(".column[data-column='"+jewel_above_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel");
		var jewel_above_color = $(".column[data-column='"+jewel_above_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel").attr('data-color');

		var jewel_below_column = jewel_first_column;
		var jewel_below_order = ( jewel_first_order - 1);
		var jewel_below = $(".column[data-column='"+jewel_below_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel");
		var jewel_below_color = $(".column[data-column='"+jewel_below_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel").attr('data-color');

		console.log( 'matching jewel range is column '+jewel_first_column+', rows'+jewel_first_order+'-'+jewel_last_order);
		console.log( 'jewel above the match is '+jewel_above_color );
		console.log( 'jewel below the match is '+jewel_below_color )

		if ( jewel_color == jewel_above_color ) {
			return jewel_above;
		} else if ( jewel_color == jewel_below_color ) {
			return jewel_below_color;
		} else {
			return false;
		}

	} else if ( direction == "horizontal") {
		//if the search is horizontal, check the endpoints for any additional matching jewels
		var jewel_left_column = (jewel_first_column - 1);
		var jewel_left_order = jewel_first_order;
		var jewel_left = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_left_order+"'] .jewel");
		var jewel_left_color = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_left_order+"'] .jewel").attr('data-color');

		var jewel_right_column = (jewel_last_column + 1);
		var jewel_right_order = jewel_last_order;
		var jewel_right = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_right_order+"'] .jewel");
		var jewel_right_color = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_right_order+"'] .jewel").attr('data-color');

		console.log( 'matching jewel range is colums '+jewel_first_column+'-'+jewel_last_column+', row'+jewel_first_order);
		console.log( 'jewel left of the match is '+jewel_left_color );
		console.log( 'jewel right of the match is '+jewel_right_color )

		if ( jewel_color == jewel_left_color ) {
			return jewel_left;
		} else if ( jewel_color == jewel_right_color ) {
			return jewel_right;
		} else {
			return false;
		}
	}

}

var destroy_matching_jewels = function() {
	//This function examines the board, 
	//removes matching jewels from the board, 
	//and brings empty spaces to the top of each column

	//go through each jewel
	$('.column .jewel-wrap .jewel').each(function() {

		//Get current column jewel is in 
		var jewel_column = parseInt( $(this).parent().parent('.column').attr('data-column') );
		//Get current heirarchy of jewel
		var jewel_order = parseInt( $(this).parent('.jewel-wrap').attr('data-order') );
		//identify the color of the current jewel
		var jewel_color = $(this).attr('data-color');

		//console.log('checking jewel in column '+jewel_column+' at location '+jewel_order+', with color of '+jewel_color);

		//check 1 above & below for a match of 3	
		if ( jewel_order >= 1 && jewel_order < 8 ) {
			//above
			var jewel_above_order = jewel_order + 1;
			var jewel_above = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel");
			var jewel_above_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_above_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel above current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another below it & the above colors match, check the jewel color below
			if ( jewel_order >= 2 && jewel_color == jewel_above_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel color above it.  Checking below now..');
				//check below next
				var jewel_below_order = jewel_order - 1;
				var jewel_below = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel");
				var jewel_below_color = $(".column[data-column='"+jewel_column+"'] .jewel-wrap[data-order='"+jewel_below_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_below_color ) {
					//there's a vertical match of 3

					//check if the current 3 pair is a part of a larger 4 vertical pair
					if ( check_pair_for_more_matches(jewel_below, jewel_above, "vertical") == false ) {
						//only a 3 pair exists in this group, add it to the temparary array
						matching_jewel_pair.push( jewel_below, $(this), jewel_above );

					} else {
						//this 3 pair is a part of a larger 4 vertical pair
						var fourth_jewel = check_pair_for_more_matches(jewel_below, jewel_above, "vertical");
						console.log('vertical pair is at least 4 pair with addition of '+fourth_jewel);
						//figure out if 4th jewel is above or below original 3 pair
						var fourth_jewel_order = parseInt( fourth_jewel.parent('.tile').attr('data-order') );
						if ( fourth_jewel_order < jewel_order ) {
							//4th member of pair is below original three
							//Next, check if the 4 pair is a part of a larger 5 pair
							if ( check_pair_for_more_matches(fourth_jewel, jewel_above, "vertical") == false ) {
								//only a 4 pair exists in this group, add it to the temparary array
								matching_jewel_pair.push( fourth_jewel, jewel_above, $(this), jewel_above );
							} else {
								//a 5 pair exists in this group!
								var fifth_jewel = check_pair_for_more_matches(fourth_jewel, jewel_above, "vertical");
								matching_jewel_pair.push( fourth_jewel, jewel_below, $(this), jewel_above, fifth_jewel );
							}
						} else {
							//4th member of pair is above original three
							//Next, check if the 4 pair is a part of a larger 5 pair
							check_pair_for_more_matches(jewel_below, fourth_jewel, "vertical");
							if ( check_pair_for_more_matches(jewel_below, fourth_jewel, "vertical") == false ) {
								//only a 4 pair exists in this group, add it to the temparary array
								matching_jewel_pair.push( fourth_jewel, jewel_below, $(this), jewel_above );
							} else {
								//a 5 pair exists in this group!
								var fifth_jewel = check_pair_for_more_matches(fourth_jewel, jewel_above, "vertical");
								matching_jewel_pair.push( fourth_jewel, jewel_below, $(this), jewel_above, fifth_jewel );
							}
						}
						

					}
					
				}
			}
		} // finished checking vertical

		//check 1 left & right for a match of 3	
		if ( jewel_column ) {
			//left
			var jewel_left_column = jewel_column - 1;
			var jewel_left_color = $(".column[data-column='"+jewel_left_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');
			//console.log('1 jewel left of current jewel with color of '+jewel_color+' in column '+jewel_column+', row '+jewel_order+' has color of '+jewel_above_color);
			//if current jewel has another right of it & the left color matches, check the jewel color to the right
			if ( jewel_column < 8 && jewel_color == jewel_left_color ) {
				//console.log('current jewel in column '+jewel_column+',row '+jewel_order+' has matching jewel to left of it.  Checking right now..');
				//check right next
				var jewel_right_column = jewel_column + 1;
				var jewel_right_color = $(".column[data-column='"+jewel_right_column+"'] .jewel-wrap[data-order='"+jewel_order+"'] .jewel").attr('data-color');

				if ( jewel_color == jewel_right_color ) {
					//there's a horizontal match of 3
					//console.log('horizontal match of 3 in columns '+jewel_left_column+jewel_column+jewel_right_column+', row: '+jewel_order);
					
				}
			}
		} // finished checking horizontal
	});
	// Add all found matches to the global matches array
	$.each(matching_jewel_pair, function(index, value) {
		matching_jewels.push(matching_jewel_pair[index]);
	});
	//clear out the temporary pairs array
	matching_jewel_pair = [];
	//destroy the global matches
	$.each(matching_jewels, function(index, value) {
		matching_jewels[index].remove();
	});

	//After jewels have been destroyed, run a function to replace empty remaining spaces wih new jewels

}

var swap_jewels = function(jewel_one, jewel_two, direction) {
	//This function takes two given jewels and swaps their positions
	console.log('swap jewels function called..');

	//Identify initial jewel properties
	var jewel_initial_column = parseInt( $(jewel_one).parent().parent('.column').attr('data-column') );
	var jewel_initial_order = parseInt( $(jewel_one).parent('.jewel-wrap').attr('data-order') );
	var jewel_initial_color = $(jewel_one).attr('data-color');

	//Identify 2nd jewel properties
	var jewel_second_column = parseInt( $(jewel_two).parent().parent('.column').attr('data-column') );
	var jewel_second_order = parseInt( $(jewel_two).parent('.jewel-wrap').attr('data-order') );
	var jewel_second_color = $(jewel_two).attr('data-color');

	var jewel_height = $(jewel_one).parent('.tile').outerHeight();

	//perform the animation of the moves
	if ( direction == "above" ) {
		
		console.log('direction to swap is from above..');

		//set the event listener for this direction
		$('.game-board').one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', jewel_two, function() {
			
    		// after animation complete, move them in the dom, for real
    		console.log('jewels have finished animating!');
    		var jewel_one_original_parent = $(jewel_one).parent();
    		var jewel_two_original_parent = $(jewel_two).parent();
    		$(jewel_one).appendTo( $(jewel_two_original_parent) ).transition({ y: '0px' }, 0, 'snap');
    		$(jewel_two).appendTo( $(jewel_one_original_parent) ).transition({ y: '0px' }, 0, 'snap');

    		//check the board for 3 or 4 pairs, following the swap
			//if matches return true, manipulate the swapped pairs dom elements (swap them, for real)
			//if matches return false, swap back to original places
			if ( check_board_for_matches() == true ) {
				//run a function to clear matches, and drop in new random elements in their place
				console.log('matches exist after swap!');
				destroy_matching_jewels();
			} else {
				//no matches, swap them back
				console.log('no matches..swap back.');
				//$(jewel_two).off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
				$(jewel_one).transition({ y: jewel_height+'px' }, 500, 'snap');
				$(jewel_two).transition({ y: '-'+jewel_height+'px' }, 500, 'snap');
				
				$(jewel_two).one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
					$(jewel_one).appendTo( $(jewel_one_original_parent) ).transition({ y: '0px' }, 0);
    				$(jewel_two).appendTo( $(jewel_two_original_parent) ).transition({ y: '0px' }, 0);
				});
			}
		});
		
		//move initial jewel up 1 & second jewel down 1
		$(jewel_one).transition({ y: '-'+jewel_height+'px' }, 500, 'snap');
		$(jewel_two).transition({ y: jewel_height+'px' }, 500, 'snap');

	} else if ( direction == "below" ) {


	} else if ( direction == "left ") {
		//move initial jewel left 1 & second jewel right 1

	} else if ( direction == "right" ) {
		//move initial jewel right 1 & second jewel left 1

	}
}

var compare_selected_jewels = function(jewel) {
	//This function is called when a player clicks on a jewel & compares 2 selections for proximity to each other

	if ( selected_jewel != "" ) {
		//one click has been registered, check to see if second element is directly above, below, left, or right of first element
		

		//Identify initial jewel properties
		var jewel_initial_column = parseInt( $(selected_jewel).parent().parent('.column').attr('data-column') );
		var jewel_initial_order = parseInt( $(selected_jewel).parent('.jewel-wrap').attr('data-order') );
		var jewel_initial_color = $(selected_jewel).attr('data-color');

		//Identify 2nd jewel properties
		var jewel_second_column = parseInt( $(jewel).parent().parent('.column').attr('data-column') );
		var jewel_second_order = parseInt( $(jewel).parent('.jewel-wrap').attr('data-order') );
		var jewel_second_color = $(jewel).attr('data-color');

		console.log('this is the 2nd jewel clicked in a series.  It is located in column '+jewel_second_column+', row'+jewel_second_order+', and has color '+jewel_second_color);

		if ( jewel_initial_column == jewel_second_column && jewel_initial_order == (jewel_second_order - 1) ) {
			//second selected jewel is directly above the original selected jewel
			//console.log('selected jewel is directly above initial selection');
			swap_jewels(selected_jewel, jewel, "above");

		} else if ( jewel_initial_column == jewel_second_column && jewel_initial_order == (jewel_second_order + 1) ) {
			//second selected jewel is directly below the original selected jewel
			//console.log('selected jewel is directly below initial selection');
			swap_jewels(selected_jewel, jewel, "below");
		} else if ( jewel_initial_order == jewel_second_order && jewel_initial_column == (jewel_second_column + 1) ) {
			//second selected jewel is directly to the left of the original selected jewel
			//console.log('selected jewel is directly to the left of the initial selection');
			swap_jewels(selected_jewel, jewel, "left");
		} else if ( jewel_initial_order == jewel_second_order && jewel_initial_column == (jewel_second_column - 1) ) {
			//second selected jewel is directly to the right of the original selected jewel
			//console.log('selected jewel is directly to the right of initial selection');
			swap_jewels(selected_jewel, jewel, "right");
		} else {
			console.log('selected jewel was not directly related to the initial selection..resetting selections..');
		}

		$(selected_jewel).css('border','0px none');
		selected_jewel = "";
	} else {
		//this is the first click of a series of two, record the element in the global variable

		selected_jewel = jewel;
		$(jewel).css('border','2px solid #000000');
		console.log('first click has been registered for jewel in column '+$(jewel).parent().parent().attr('data-column')+', row '+$(jewel).parent().attr('data-order'));
	}
}

$(document).ready(function() {

	populate_board();

	clean_up_matches();

	//Start the Game!

	//When user clicks a tile, record it
	$(document).on("click", ".jewel", function(){
		compare_selected_jewels(this);
	});

});