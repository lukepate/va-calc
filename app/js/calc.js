$(function() {
    console.log( "ready!" );
    	var mono = [];
    	var upperL = [];
    	var upperR = [];
    	var lowerL = [];
	    var lowerR = [];

      $("#ul, #ur, #ll, #lr").click(function(){
          $(this).toggleClass('on');
      });

      

});


$('.number-pad').click(function() {
  var val = $(this).attr("data-value");
  var rate = val + "%"
    $("p.rating").text(rate);

});
