$(function(){
    
    if ($(document).scrollTop() > 0) {
    	$("#top_go").fadeIn(300);
    }
    
    if ($(document).scrollTop() < $(document).height()- $(window).height()) {
        $("#bottom_go").fadeIn(300);
    } 
    
});


$(window).scroll(function() {
    
    if ($(document).scrollTop() > 0) {
    	$("#top_go").fadeIn(300);
    } 
    
    if ($(document).scrollTop() == 0) {
    	$("#top_go").fadeOut(300);
    } 
    
    if ($(document).scrollTop() < $(document).height()- $(window).height()) {
        $("#bottom_go").fadeIn(300);
    } 
    
    if ($(document).scrollTop() == $(document).height()- $(window).height()) {
        $("#bottom_go").fadeOut(300);
    } 

});



$('#top_go').click(function(){
	$('html, body').animate({scrollTop:0}, '300');  
});

$('#bottom_go').click(function(){
    var bottomScrollV = $(document).height()- $(window).height();
	$('html, body').animate({scrollTop:bottomScrollV}, '300');  
    
});
