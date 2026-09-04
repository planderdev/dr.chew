$(function(){
    
    if ($(document).scrollTop() > 0) {
        showScrollButton("#top_go");
    }
    
    if ($(document).scrollTop() < $(document).height()- $(window).height()) {
        showScrollButton("#bottom_go");
    } 
    
});

function showScrollButton(selector) {
    $(selector).stop(true, true).css("display", "flex").fadeTo(300, 1);
}

function hideScrollButton(selector) {
    $(selector).stop(true, true).fadeOut(300);
}


$(window).scroll(function() {
    
    if ($(document).scrollTop() > 0) {
        showScrollButton("#top_go");
    } 
    
    if ($(document).scrollTop() == 0) {
        hideScrollButton("#top_go");
    } 
    
    if ($(document).scrollTop() < $(document).height()- $(window).height()) {
        showScrollButton("#bottom_go");
    } 
    
    if ($(document).scrollTop() == $(document).height()- $(window).height()) {
        hideScrollButton("#bottom_go");
    } 

});



$('#top_go').click(function(){
	$('html, body').animate({scrollTop:0}, '300');  
});

$('#bottom_go').click(function(){
    var bottomScrollV = $(document).height()- $(window).height();
	$('html, body').animate({scrollTop:bottomScrollV}, '300');  
    
});
