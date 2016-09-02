$(document).ready(function() {
  var selector = "[id^=carousel-]"
  $(selector).carousel({
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
    $(selector).carousel(parseInt($(this).attr("data-slide-to")));
    $(".myCarousel-target.active").removeClass("active");
    $(this).addClass("active");
  });

  $(".livepreview").livePreview({
      trigger: 'hover',
      viewWidth: 300,
      viewHeight: 200,
      targetWidth: 1000,
      targetHeight: 800,
      scale: '0.5',
      offset: 50,
      position: 'left'
  });
});

