$(function(){
    
    var bodyW = $('#gtlayout').width(),
        bodySelector = document.querySelector('#gtlayout'),
     	infoArea = document.querySelector('.infoArea'),
    	info_H = $('.infoArea').height(),
        info_offsetTop = $('.infoArea').offset().top;
    
    
    $('#infoArea_height').css('height',info_H);
    
    const observerBody = new ResizeObserver(entries => {
  		for (let entry of entries) {
    		const {width, height} = entry.contentRect;
            bodyW = width;
  		}
	});
    
    observerBody.observe(bodySelector);
    
    
 /*   
	const observerInfoArea = new ResizeObserver(entries => {
  		for (let entry of entries) {
    		const {width, height} = entry.contentRect;
            $('#infoArea_height').css('height',height);  // 인포아레아 빈공간대체하는 div의 높이를 인포아레아 높이가 변할때마다 동일하게 맞춤
  		}
	});
    
    observerInfoArea.observe(infoArea);
 */   
    
    
	$("#fixed_buy_option_scroll").mCustomScrollbar({
    axis:"y",
    theme:"dark"
	});
    
    
    

    
    
	$( window ).resize( function() {

  		if(bodyW<1025){  
            $('#fixed_buy_option').css('display','none');
    		$('#fixed_buy_option').removeClass('on_buy_option');
            $('#fixed_buy_option_in .infoArea').appendTo('.detailArea');
        	$(".detailArea #infoArea_height").css('display','none');
  		} 

	});
    
    
    
    
    
    $( '#fixed_buy_option_bt' ).click( function() {
        if($('#fixed_buy_option').hasClass('on_buy_option')){
            $('#fixed_buy_option').removeClass('on_buy_option');
        }else{
            $('#fixed_buy_option').addClass('on_buy_option');
        }
	});
    
    
    
    

  	$(window).scroll(function() {
        
        if( bodyW >1024 ){
			var now_scrollTop = $(document).scrollTop();

            
            if( $(".detailArea .infoArea").length == 1 ){
                info_H = $('.infoArea').height();
                info_offsetTop = $('.infoArea').offset().top;
                $('#infoArea_height').css('height',info_H);
            }
  
            
    		if( now_scrollTop > info_H + info_offsetTop ){
        
        		$(".xans-product-detail .infoArea").appendTo("#fixed_buy_option_infoArea");
        		$('#fixed_buy_option').css('display','inline-block');
        		$(".detailArea #infoArea_height").css('display','inline-block');
        
    		}else if( now_scrollTop < info_H + info_offsetTop ){
        
        		$('#fixed_buy_option').css('display','none');
        		$('#fixed_buy_option').removeClass('on_buy_option');
        		$('#fixed_buy_option_in .infoArea').appendTo('.detailArea');
        		$(".detailArea #infoArea_height").css('display','none');
        
    		}
        }
       
  	});

    
    
    // 옵션 a태그에 #none 삭제하여 화면 이동않게
    $(document).on("mouseover",".infoArea .xans-product-option ul li a",function(){
			if($(this).attr('href') == '#none'){
                $(this).removeAttr('href');
            }
    });

    
    
    
});






