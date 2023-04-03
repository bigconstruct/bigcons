  
$(window).on('load',function(){
    $(".loader").fadeOut(2500);
});

 $('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});

AOS.init({
       offset: 120,
       once: true,
   });

   function show(){
       document.getElementById("side-menu").classList.toggle("show");
   }
   function showw(){
    document.getElementById("dd").classList.toggle("show");
}
   function button_onclick() {
    document.getElementById("btn").style.visibility = "hidden";
}

var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };