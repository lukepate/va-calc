$(function() {
    console.log( "ready!" );
			var mono   = [],
    	    upperL = [],
    	    upperR = [],
    	    lowerL = [],
					lowerR = [],
					obj = [];
					function Person(limb, value){
						this.limb = limb;
						this.value = value;
					}

      //Clicks body part buttons
      $("#ul, #ur, #ll, #lr").click(function(){
          $(this).toggleClass('on');
      });

      //Clicks value buttons
      $(".valbtn").click(function(){

				if(!$("#ul").hasClass('on') && !$("#ur").hasClass('on') && !$("#ll").hasClass('on') && !$("#lr").hasClass('on')){
					var limbObj = new Person("m",$(this).val());
					obj.push(limbObj);
					mono.push($(this).val());
				}else{
					if($("#ul").hasClass('on')){
						var limbObj = new Person("ul",$(this).val());
						obj.push(limbObj);
						upperL.push($(this).val());
      		}

      		if($("#ur").hasClass('on')){
						var limbObj = new Person("ur",$(this).val());
						obj.push(limbObj);
						upperR.push($(this).val());
      		}

      		if($("#ll").hasClass('on')){
						var limbObj = new Person("ll",$(this).val());
						obj.push(limbObj);
						lowerL.push($(this).val());
      		}

          if($("#lr").hasClass('on')){
						var limbObj = new Person("lr",$(this).val());
						obj.push(limbObj);
						lowerR.push($(this).val());
          }
				}

          $("#ul").removeClass('on');
      		$("#ur").removeClass('on');
      		$("#ll").removeClass('on');
					$("#lr").removeClass('on');

					var rating = 0;				


					for(var i = 0;i<obj.length;i++){
						console.log(obj[i].limb + ": " + obj[i].value);
						for(var x = i+1; x <obj.length;x++){
							if(obj[i].limb == "ul" && obj[x].limb == "ur" || obj[i].limb == "ur" && obj[x].limb == "ul"){
								console.log("W0w");
								var matches = [obj[i].value, obj[x].value];
								rating = bilat_calc(matches);
								var limbObj = new Person("m",rating);
								obj.push(limbObj);
								obj.splice(obj[x],1);
								obj.splice(obj[i],1);
							}
							if(obj[i].limb == "ll" && obj[x].limb == "lr" || obj[i].limb == "lr" && obj[x].limb == "ll"){
								console.log("W0w");
								var matches = [obj[i].value, obj[x].value];
								rating = bilat_calc(matches);
								var limbObj = new Person("m",rating);
								obj.push(limbObj);
								obj.splice(obj[x],1);
								obj.splice(obj[i],1);
							}
						}
					}
					var master = [];
					for(var i = 0;i<obj.length;i++){
						master.push(obj[i].value);
						console.log(obj[i].limb + ": " + obj[i].value);
					}

					rating = monoCalc(master);

				console.log("mono  : " + mono);
				console.log("upperL: " + upperL);
				console.log("upperR: " + upperR);
				console.log("lowerL: " + lowerL);
				console.log("lowerR: " + lowerR);
				
				console.log("rating: " + rating);
				updateDisplay(rating);
					

					console.log("====================================================");
        });

        	$(".btn-default").click(function(){
						mono=[];
        		upperL=[];
        		lowerL=[];
        		upperR=[];
						lowerR=[];
						master = [];
						obj = [];
        		$("#rating").val("0");
        		$("label[for = testing]").text(0);
        		$("#ul, #ur, #ll, #lr").removeClass('on');

            var rating = 0;
            updateDisplay(rating);

        	});

});

	function monoCalc(mono, upperL, upperR, lowerL, lowerR){
		var efficiency = 100;
		var x = 0;

		// var upper = [];
		// var lower = [];
		// upper = upperL.concat(upperR);
		// lower = lowerL.concat(lowerR)

		// if(upperL.length>0 && upperR.length>0){
		// 	var upper_totals = bilat_calc(upper);
		// 	mono.push(upper_totals);
		// 	upperL = [];
		// 	upperR = [];
		// }else	if(lowerL.length>0 && lowerR.length>0){
		// 	var lower_totals = bilat_calc(lower);
		// 	mono.push(lower_totals);
		// 	lowerL = [];
		// 	lowerR = [];
		// }else{
		// 	mono.push(upper,lower)
		// }

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
	
	function limbCheck(limbs){
		limbs.sort();
		for(var i=0; i<limbs.length; i++){
			if(limbs[i]=== limbs[i+1]){
				return true;
			}
		}
	}
