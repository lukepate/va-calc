$(function() {
    console.log( "ready!" );
			var master = [],
					mono   = [],
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

				if(!$("#ul").hasClass('on') && !$("#ur").hasClass('on') && !$("#ll").hasClass('on') && !$("#lr").hasClass('on')){
					mono.push($(this).val());
				}else{
					if($("#ul").hasClass('on')){
						upperL.push($(this).val());
      		}

      		if($("#ur").hasClass('on')){
						upperR.push($(this).val());
      		}

      		if($("#ll").hasClass('on')){
						lowerL.push($(this).val());
      		}

          if($("#lr").hasClass('on')){
						lowerR.push($(this).val());
          }
				}
      		
          $("#ul").removeClass('on');
      		$("#ur").removeClass('on');
      		$("#ll").removeClass('on');
					$("#lr").removeClass('on');

					var rating = 0;
					var upper = [];
					var lower = [];
					upper = upperL.concat(upperR);
					lower = lowerL.concat(lowerR)

					if(upperL.length>0 && upperR.length>0){
						var upper_totals = bilat_calc(upper);
						master.push(upper_totals);
						upperL = [];
						upperR = [];
					}else	if(lowerL.length>0 && lowerR.length>0){
						var lower_totals = bilat_calc(lower);
						master.push(lower_totals);
						lowerL = [];
						lowerR = [];
					}else{

					}
					
					console.log("master: " + master);
					console.log("mono  : " + mono);
					console.log("upperL: " + upperL);
					console.log("upperR: " + upperR);
					console.log("lowerL: " + lowerL);
					console.log("lowerR: " + lowerR);
					rating = monoCalc(master);
					console.log("rating: " + rating);
					updateDisplay(rating);

					console.log("====================================================");
        });

        	$(".btn-default").click(function(){
						master=[];
						mono=[];
        		upperL=[];
        		lowerL=[];
        		upperR=[];
        		lowerR=[];
        		$("#rating").val("0");
        		$("label[for = testing]").text(0);
        		$("#ul, #ur, #ll, #lr").removeClass('on');

            var rating = 0;
            updateDisplay(rating)

        	});

});

	function monoCalc(mono){
		var efficiency = 100;
		var x = 0;

		mono.sort(function(a,b){return b-a});
		while(x<mono.length){
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
