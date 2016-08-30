$(document).ready(function() {
  $("#carousel-images").carousel({
    interval: false
  });
  $("#carousel-text").carousel({
    interval: false
  });
  $(".carousel").on("slid", function() {
    var to_slide;
    to_slide = $(".carousel-item.active").attr("data-slide-no");
    $(".myCarousel-target.active").removeClass("active");
    $(".carousel-indicators [data-slide-to=" + to_slide + "]").addClass("active");
  });
  $(".myCarousel-target").on("click", function() {
    $(this).preventDefault();
    $("#carousel-images").carousel(parseInt($(this).attr("data-slide-to")));
    $(".myCarousel-target.active").removeClass("active");
    $(this).addClass("active");
  });
  $('#carousel-images').bind('slide.bs.carousel', function(e) {
    $('#carousel-text').carousel(e.direction === 'left' ? 'next' : 'prev');
  });
});
