$(function() {
    console.log( "ready!" );
});



    $('.number-pad').click(function() {
      var val = $(this).attr("data-value");
      var rate = val + "%"
        $("p.rating").text(rate);

    });
