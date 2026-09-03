$(function(){

    var cart_right = $(window).width()-document.querySelector('#header_cart_bt').getBoundingClientRect().right-26;
    $('#header_cart_area').css('right',cart_right);

});





$( window ).resize( function() {

    var cart_right = $(window).width()-document.querySelector('#header_cart_bt').getBoundingClientRect().right-26;
    $('#header_cart_area').css('right',cart_right);
    
});


