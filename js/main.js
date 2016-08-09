// Note: See http://blog.garstasio.com/you-dont-need-jquery/ and http://youmightnotneedjquery.com/ for JS commands that don't require jQuery
$(document).ready(function(){

  // Rotate header text
  $("#typed").typed({
    strings: ["Startups", "Developers", "Email Marketers", "Ecommerce", "Companies"],
    typeSpeed: 10,
    loop: true
  });

  // Email preview slideshow
  $('#slideshow').slick({
    dots: true,
  });

  // Tomorrow's date
  $("#tomorrow").html(moment().add(1, 'days').format('dddd MMMM Do'));
  console.log(moment().add(1, 'days').format('dddd'));

});
