$(function(){


    
    
    
    
    
	$('#category_pc_btn_box').click(function(){
    	$('body').addClass('expand');
	});
	$('#category_mob_btn_box').click(function(){
    	$('body').addClass('expand');
	});
    $('#layoutDimmed').click(function(){
    	$('body').removeClass('expand');
	});
    $('#aside .btnClose').click(function(){
    	$('body').removeClass('expand');
	});
    

    
    
    

  let mypageTimer;

  $('#header_mypage_bt').on('mouseenter', function () {
    clearTimeout(mypageTimer);
    $('#header_mypage_list').stop(true, true).fadeIn(300, function () {
      $(this).css('display', 'flex');
    });
  });

  $('#header_mypage_bt').on('mouseleave', function () {
    mypageTimer = setTimeout(function () {
      $('#header_mypage_list').stop(true, true).fadeOut(300);
    }, 100);
  });
    
    
    
    
    
    
    
	$('#header_search_bt').click(function(){
            if($('#header_search_area').hasClass('notOn') && $('#top_line_box').hasClass('onScroll')){
                //$('header').addClass('header_index');
                $('#top_line_box').addClass('onSearch');
                $('#header_search_area').addClass('onScroll');
            	$('#header_search_area').addClass('onSearch');
                $('#header_search_area').removeClass('notOn');
                //$('#search_mask').fadeIn(300);
            }else if($('#header_search_area').hasClass('notOn')){
                //$('header').addClass('header_index');
				$('#top_line_box').addClass('onSearch');
            	$('#header_search_area').addClass('onSearch');
                $('#header_search_area').removeClass('notOn');
                //$('#search_mask').fadeIn(300); 
            }else{
                //$('header').removeClass('header_index');
                $('#top_line_box').removeClass('onSearch');
                $('#header_search_area').removeClass('onScroll');
                $('#header_search_area').removeClass('onSearch');
                $('#header_search_area').addClass('notOn');
                //$('#search_mask').fadeOut(300);
            }
	});
    
	$('#search_mask').click(function(){
        	$('header').removeClass('header_index');
			$('#top_line_box').removeClass('onSearch');
        	$('#header_search_area').removeClass('onScroll');
			$('#header_search_area').removeClass('onSearch');
			$('#header_search_area').addClass('notOn');
        	//$('#search_mask').fadeOut(300);
	});
    
	$('.btnSearchClose').click(function(){
        	$('header').removeClass('header_index');
			$('#top_line_box').removeClass('onSearch');
        	$('#header_search_area').removeClass('onScroll');
			$('#header_search_area').removeClass('onSearch');
			$('#header_search_area').addClass('notOn');
        	//$('#search_mask').fadeOut(300);
	});

    
    $('#header_search_area #keyword').attr("placeholder","검색어 입력 후 'ENTER'");
    
/*    
	$('#header_search_area .btnDelete').click(function(){
		$('#header_search_area #keyword').val('');
	});
*/    
    
	$('.header_login_bt').click(function(){
        	$('.login_popup').fadeIn(300).css('display','flex');
        	$('#login_popup_mask').fadeIn(300);
	});
	$('#login_popup_mask').click(function(){
        	$('.login_popup').fadeOut(300);
        	$('#login_popup_mask').fadeOut(300);
	});
	$('#login_popup_close').click(function(){
        	$('.login_popup').fadeOut(300);
        	$('#login_popup_mask').fadeOut(300);
	});
    

});



function updateHeaderOnScroll() {
  if ($(document).scrollTop() > 0) {
    //$("#header_line").removeClass("onScroll");
    //$("#header_line_scroll_area").removeClass("onScroll");
    $("#top_line_box").addClass("onScroll");
    $("#top_line_box_scroll_area").addClass("onScroll");
    $('#header_search_area').addClass('onScroll');
  } else {
    $("#top_line_box").removeClass("onScroll");
    $("#top_line_box_scroll_area").removeClass("onScroll");
    $('#header_search_area').removeClass('onScroll');
  }
}

// 이벤트 바인딩
window.addEventListener('scroll', updateHeaderOnScroll);
window.addEventListener('resize', updateHeaderOnScroll);
window.addEventListener('load', updateHeaderOnScroll);








