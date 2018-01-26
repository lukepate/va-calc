$(function() {

	var mono = [],
		upperL = 0,
		upperR = 0,
		lowerL = 0,
		lowerR = 0,
		upperAll = [],
		lowerAll = [],
		upper = false,
		lower = false;

	//Clicks body part buttons
	$("#ul, #ur, #ll, #lr").click(function(){
		$(this).toggleClass('on');
	});

      //Clicks value buttons
    $(".valbtn").click(function(){

		if(!$("#ul").hasClass('on') && !$("#ur").hasClass('on') && !$("#ll").hasClass('on') && !$("#lr").hasClass('on')){
			//Push value into mono - no bilat
			mono.push($(this).val());
		}else{
			if($("#ul").hasClass('on')){
				//Push value into upperAll, +1 to upperL
				upperAll.push($(this).val());
				upperL++;
			}

			if($("#ur").hasClass('on')){
				//Push value into upperAll, +1 to upperR
				upperAll.push($(this).val());
				upperR++;
			}

			if($("#ll").hasClass('on')){
				//Push value into lowerAll, +1 to lowerL
				lowerAll.push($(this).val());
				lowerL++;
			}

			if($("#lr").hasClass('on')){
				//Push value into lowerAll, +1 to lowerR
				lowerAll.push($(this).val());
				lowerR++;
			}
	}

        $("#ul").removeClass('on');
      	$("#ur").removeClass('on');
      	$("#ll").removeClass('on');
		$("#lr").removeClass('on');

		var rating = 0;
		
		// Make Booleans for Bilats true if there is match
		if(upperL > 0 && upperR > 0){
			upper = true;
		}
		if(lowerL > 0 && lowerR > 0){
			lower = true;
		}

		// Sort all arrays storing ratings in descending order
		mono.sort(function(a,b){return b-a});
		upperAll.sort(function(a,b){return b-a});
		lowerAll.sort(function(a,b){return b-a});

		// Calculate total rating and push to UI
		rating = calcRating(mono, upperAll, lowerAll, upper, lower);
		updateDisplay(rating);
	});

	// Clear button function
	$(".btn-default").click(function(event ){
		event.isDefaultPrevented()
		mono = [],
		upperL = 0,
		upperR = 0,
		lowerL = 0,
		lowerR = 0,
		upperAll = [],
		lowerAll = [],
		upper = false,
		lower = false;

		$("#rating").val("0");
		$("label[for = testing]").text(0);
		$("#ul, #ur, #ll, #lr").removeClass('on');

      	var rating = 0;
      	updateDisplay(rating);
    });

});

	// Calculate the total rating
	function calcRating(mono, upperAll, lowerAll, upper, lower){
		var totalRating = 0;

		// Used to combine all ratings if there are some extra bilat ratings without matches
		var tempRatings = mono;

		// Check if we have bilaterals to calculate
		if(upper == true && lower == true)
		{
			// Decide which bilaterals to do first
			if(upperAll[0] > lowerAll[0] || upperAll[0] === lowerAll[0]){
				var bilatsAll = upperAll.concat(lowerAll);
				bilatsAll.sort(function(a,b){return b-a});
				totalRating = calcBilats(bilatsAll, totalRating);
			}else{
				var bilatsAll = upperAll.concat(lowerAll);
				bilatsAll.sort(function(a,b){return b-a});
				totalRating = calcBilats(bilatsAll, totalRating);
			}
		}
		if(upper == true && lower == false){
			totalRating = calcBilats(upperAll, totalRating);
		}
		if(upper == false && lower == true){
			totalRating = calcBilats(lowerAll, totalRating);
		}

		// If there are bilaterals but never match, add to tempRatings and calc as if mono numbers
		if(upperAll.length > 0 && upper == false){
			tempRatings = tempRatings.concat(upperAll);
		}
		if(lowerAll.length > 0 && lower == false){
			tempRatings = tempRatings.concat(lowerAll);
		}
		
		tempRatings.sort(function(a,b){return b-a});
		totalRating = monoCalc(tempRatings, totalRating);

		return totalRating;
	}
	
	// Used to calculate bilateral ratings
	function calcBilats(bilats, currentRate){
		var rating = currentRate;
		
		rating = monoCalc(bilats, rating);

		var diff = rating - currentRate;
		var diff = (diff * .1).toFixed(1);
		rating = (parseFloat(rating) + parseFloat(diff)).toFixed(0);

		return rating;
	
	}

	// Used to calculate total ratings that do not include bilats
	function monoCalc(mono, currentRate){
		var rating = currentRate;
		var e = 0;
		var x = 0;


		while(x<mono.length){
			if (rating == 0){
				rating = mono[x];
			}else{
				e = 100 - rating;
				var multiplier = mono[x] / 100;
				e = e * multiplier;
				rating = (parseFloat(rating) + parseFloat(e)).toFixed(0);
			}
			x++;
		}
		return rating;
	}

  function updateDisplay(rating){
	  //Cap rating at 100
	  if(rating>100){
		  rating = 100;
	  }
      var rate = rating + "%"
      $("p.rating").text(rate);
  }
