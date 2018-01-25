$(function() {

	var mono   = [],
	upperL = [],
	upperR = [],
	lowerL = [],
	lowerR = [],
	obj = [];
	var bilateralFixed;
  var biEmpty = "";
  var upper = false;
  var lower = false;

	function Person(limb, value, part){
		this.limb = limb;
		this.value = value;
		this.part = part;
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
				var limbObj = new Person("ul",$(this).val(), "upper");
				obj.push(limbObj);
				upperL.push($(this).val());
			}

			if($("#ur").hasClass('on')){
				var limbObj = new Person("ur",$(this).val(), "upper");
				obj.push(limbObj);
				upperR.push($(this).val());
			}

			if($("#ll").hasClass('on')){
				var limbObj = new Person("ll",$(this).val(), "lower");
				obj.push(limbObj);
				lowerL.push($(this).val());
			}

			if($("#lr").hasClass('on')){
				var limbObj = new Person("lr",$(this).val(), "lower");
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
			if(upper === false || lower === false){
			for(var x = i+1; x <obj.length;x++){
				if(obj[i].limb == "ul" && obj[x].limb == "ur" || obj[i].limb == "ur" && obj[x].limb == "ul"){
					var matches = [obj[i].value, obj[x].value];
					rating = bilat_calc(matches);
					var limbObj = new Person("m",rating);
					obj.push(limbObj);
					obj[x].value = 0;
					obj[i].value = 0;
					upper = true; 
				}
				if(obj[i].limb == "ll" && obj[x].limb == "lr" || obj[i].limb == "lr" && obj[x].limb == "ll"){
					var matches = [obj[i].value, obj[x].value];
					for(var y = x+1; y<obj.length;y++){
						if(obj[y].part == "lower"){
							matches.push(obj[y].value);
						}
					}
					rating = bilat_calc(matches);
					var limbObj = new Person("m",rating);
					obj.push(limbObj);
					obj[x].value = 0;
					obj[i].value = 0;
					lower = true;
				}
			}
		} else{
			var matches = [obj[i].value, obj[x].value];
					rating = bilat_calc_force(matches);
					var limbObj = new Person("m",rating);
					obj.push(limbObj);
					obj[x].value = 0;
					obj[i].value = 0;

		}
		}

		var master = [];
		for(var i = 0;i<obj.length;i++){
			master.push(obj[i].value);
		}

		rating = monoCalc(master);
		updateDisplay(rating);
	});

		$(".btn-default").click(function(event ){
      		event.isDefaultPrevented()
			mono=[];
			upperL=[];
			lowerL=[];
			upperR=[];
			lowerR=[];
			master = [];
			obj = [];
			  bilateralFixed;
			  lower = false;
			  upper = false;

			$("#rating").val("0");
			$("label[for = testing]").text(0);
			$("#ul, #ur, #ll, #lr").removeClass('on');

      var rating = 0;
      updateDisplay(rating);
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
		return disability;
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
	  console.log('effi applied' + efficiency)
      x++;
    }

	disability = 100 - efficiency;
	var bilateral = disability*.1;
	disability = disability + (bilateral);
    return disability;
	}

	function bilat_calc_force(rating_array){
		var efficiency = 100;
		var x = 0;
		rating_array.sort(function(a,b){return b-a});

		efficiency = efficiency - efficiency*rating_array[x]*.01;
		console.log('effi applied' + efficiency)
		
		disability = 100 - efficiency;
		var bilateral = disability*.1;
		disability = disability + (bilateral);
		return disability;

	}

	function search(nameKey, myArray){
		for (var i=0; i < myArray.length; i++) {
			if (myArray[i].name === nameKey) {
				return myArray[i];
			}
		}
	}
