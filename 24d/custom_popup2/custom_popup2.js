

$(function(){
    
if(!($.cookie('custom_popup2')=='day_no')){
	$('#custom_popup2').css('display','inline-block');
    $('#custom_popup2_mask').fadeIn(200);
    $('#fixed_custom_popup2').css('display','none');
}

    
    
var custom_popup2 = new Swiper('#custom_popup2_wrap', {
  speed : 700,
  loop: true,
  autoplay: {     
          delay: 4000,
          disableOnInteraction: false, // false-스와이프 후 자동 재생
        },
  slidesPerView: 1,
  loopedSlides: 5,
  pagination: {
	el: '#custom_popup2_wrap .swiper-pagination',
	clickable: true
   },
  /* centermode 일때 페이징 오류잡는 소스
  on: {
  	init: function () {
      	$('#custom_popup2_wrap .swiper-pagination span:first-child').addClass('now_load');
  	},
    slideChangeTransitionStart: function () {
      // 현재 active index에 맞춰 pagination 수동 업데이트
      const bullets = document.querySelectorAll('#custom_popup2_wrap .swiper-pagination span');
      bullets.forEach((b, i) => {
        b.classList.toggle('swiper-pagination-bullet-active', i === this.realIndex);
      });
    },
    slideChange: function () {
  		const firstBullet = document.querySelector('#custom_popup2_wrap .swiper-pagination span:first-child');

  		if (firstBullet && firstBullet.classList.contains('now_load')) {
    		firstBullet.classList.remove('now_load');
  		} else {
    		const bullets = document.querySelectorAll('#custom_popup2_wrap .swiper-pagination span');
    		bullets.forEach((b) => b.classList.remove('swiper-pagination-bullet-active'));
  		}
    }
  }
  */
});
    

  $('#custom_popup2_checktext').on('click', function () {
    $.cookie('custom_popup2', 'day_no', { expires: 1 });
    $('#custom_popup2').css('display','none');
    $('#custom_popup2_mask').css('display','none');
  });
    
$( '#custom_popup2_close' ).click( function() {
    
	$('#custom_popup2').css('display','none');
    $('#custom_popup2_mask').css('display','none');
    $('#fixed_custom_popup2').css('display','block');
  
}); 
    
$( '#custom_popup2_mask' ).click( function() {
    
	$('#custom_popup2').css('display','none');
    $('#custom_popup2_mask').css('display','none');
    $('#fixed_custom_popup2').css('display','block');
  
});   
    
  $('#fixed_custom_popup2_close').on('click', function () {
    $('#fixed_custom_popup2').css('display','none');
  });
    
  $('#fixed_custom_popup2_in > div:nth-child(2)').on('click', function () {
	$('#custom_popup2').css('display','inline-block');
    $('#custom_popup2_mask').fadeIn(200);
    $('#fixed_custom_popup2').css('display','none');
  }); 
    
    
})