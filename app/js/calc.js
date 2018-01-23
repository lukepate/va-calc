$(function() {
    console.log( "ready!" );
    	var mono = [],
    	    upperL = [],
    	    upperR = [],
    	    lowerL = [],
	        lowerR = [];

      //Clicks body part buttons
      $("#ul, #ur, #ll, #lr").click(function(){
          $(this).toggleClass('on');
      });

      //Clicks value buttons
      $(".valbtn").click(function(){

      		if($("#ul").hasClass('on')){
      			upperL.push($(this).val());
            console.log(upperL, 'upperL')
      		}

      		if($("#ur").hasClass('on')){
      			upperR.push($(this).val());
            console.log(upperR, 'upperR')
      		}

      		if($("#ll").hasClass('on')){
      			lowerL.push($(this).val());
            console.log(lowerL, 'lowerL')
      		}

          if($("#lr").hasClass('on')){
            lowerR.push($(this).val());
            console.log(lowerR, 'lowerR')
          }

          if(!$("#ul").hasClass('on') && !$("#ur").hasClass('on') && !$("#ll").hasClass('on') && !$("#lr").hasClass('on')){
            mono.push($(this).val());
            console.log(mono, 'mono')

          }

          $("#ul").removeClass('on');
      		$("#ur").removeClass('on');
      		$("#ll").removeClass('on');
      		$("#lr").removeClass('on');
          console.log(mono, 'mono')
          var rating = monoCalc(mono, upperL, lowerL, upperR, lowerR);
          // console.log(rating, 'rating')
          updateDisplay(rating)

        });

        	$(".btn-default").click(function(){
        		mono=[];
        		upperL=[];
        		lowerL=[];
        		upperR=[];
        		lowerR=[];
        		$("#rating").val("0");
        		$("label[for = testing]").text(0);
        		$("#ul, #ur, #ll, #lr").removeClass('on');

            var rating = 0;
            console.log(rating, 'rating')
            updateDisplay(rating)

        	});

});


	function monoCalc(mono, upperL, lowerL, upperR, lowerR){
		var efficiency = 100;
		var x = 0;
		var upper = upperL.concat(upperR);
		var lower = lowerL.concat(lowerR);

		upper.sort(function(a,b){return b-a});
		lower.sort(function(a,b){return b-a});

		if(upperL.length>0 && upperR.length>0){
			var upper_totals = bilat_calc(upper);
			mono.push(upper_totals);
		}else{
			mono = mono.concat(upperL,upperR);
		}

		if(lowerL.length>0 && lowerR.length>0){
			var lower_totals = bilat_calc(lower);
			mono.push(lower_totals);
		}else{
			mono = mono.concat(lowerL,lowerR);
		}

		mono.sort(function(a,b){return b-a});
		while(x<mono.length){
      console.log(x)
			efficiency = efficiency - efficiency*mono[x]*.01;
			x++;
		}

		disability = 100 - efficiency;
		return Math.round(disability);
	}


  function updateDisplay(rating){
      var rate = rating + "%"
      $("p.rating").text(rate);
  }


  function bilat_calc(rating_array){
    var efficiency = 100;
    var x = 0;

    rating_array.sort(function(a,b){return b-a});

    while(x<rating_array.length){
      efficiency = efficiency - efficiency*rating_array[x]*.01;
      x++;
    }

    disability = 100 - efficiency;
    disability = disability + (disability*.1);
    return Math.round(disability);
  }
