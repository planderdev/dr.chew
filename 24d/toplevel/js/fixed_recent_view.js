$(function(){

	$("#fixed_recent_view_mid").mCustomScrollbar({
    axis:"y",
    theme:"dark"
	});
    
	var windowW = $( window ).width();
    if(windowW>1024){  
    	$('#recent_viwe_bt').css('display','block');
	}

    $('#recent_viwe_bt').click(function(){
    	if($('#fixed_recent_view').hasClass('onState')){
            $('#fixed_recent_view').removeClass('onState');
        	$('#fixed_recent_view').fadeOut(300);
        }else{
            $('#fixed_recent_view').addClass('onState');
            $('#fixed_recent_view').fadeIn(300);
        }
	});  

    $('#fixed_recent_view_close').click(function(){
        $('#fixed_recent_view').removeClass('onState');
        $('#fixed_recent_view').fadeOut(300);
	});
    
    
    
    
});



$( window ).resize( function() {
    
  var windowW = $( window ).width();
  if(windowW<1025){  
    $('#recent_viwe_bt').css('display','none');
	if($('#fixed_recent_view').hasClass('onState')){
		$('#fixed_recent_view').removeClass('onState');
		$('#fixed_recent_view').fadeOut(300);
	}  
  }else{
   $('#recent_viwe_bt').css('display','block');   
  }   
    
});

