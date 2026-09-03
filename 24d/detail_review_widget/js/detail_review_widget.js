

$(function () {
    

$('#detail_review_widget').css('display','block');   
    
  // 후기 리스트 이미지 비동기 삽입
$('.review_widget_img').each(function () {
  var $thumb = $(this);
  var href = $thumb.attr('href');
  var boardNo = $thumb.data('board');

  var urlParams = new URLSearchParams(href.split('?')[1] || '');
  var bulletinNo = urlParams.get('no') || (href.match(/\/(\d+)(\/)?$/) ? href.match(/\/(\d+)(\/)?$/)[1] : null);

  if (bulletinNo && boardNo) {
    var url = '/exec/front/Board/Get?no=' + bulletinNo + '&board_no=' + boardNo;
    EC$.get(url, function (res) {
      if (!res.failed && res.data.thumbnail_image) {
        var $img = $(res.data.thumbnail_image);
        var imgSrc = $img.attr('src');
        if (imgSrc && /\.(jpg|jpeg|png|gif|webp|heic)(\?.*)?$/i.test(imgSrc)) {
          var selector = '.review_widget_img[href*="/' + boardNo + '/' + bulletinNo + '"]';
          $(selector).each(function () {
            $(this).append($img.clone());
          });
        }
      }
    }, 'json');
  }
});
    
    
    
    
	$('#detail_review_widget_close').on('click', function() {
    	$('#detail_review_widget').css('display','none');    
    });
    
    
	if ($('#detail_review_widget_in .nodata').length) {
    	$('#detail_review_widget').hide();
	}else{
    new Swiper('#detail_review_widget_in', {
      loop: false,
      effect: 'slide', // 또는 'fade'
      direction: 'vertical',
      speed: 1000,
      mousewheel: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      },
      spaceBetween: 5,
      slidesPerView: 1,
      breakpoints: {
		1001: { slidesPerView: 1 },
  	  },
      on: {
        init: function () {
      		$('.swiper-slide-active .review_widget_contents').addClass('chat_effect');
    	},
    	transitionStart: function () {
            
		  const isLast = this.activeIndex === this.slides.length - this.params.slidesPerView;

		  if (isLast) {
		    $('#detail_review_widget').addClass('position_slide');
		  } else {
		    $('#detail_review_widget').removeClass('position_slide');
		  }  
            
            
            $('.swiper-slide-active .review_widget_contents.chat_effect_end').removeClass('chat_effect_end');
            $('.swiper-slide-active .review_widget_contents').addClass('chat_effect');
            $('.swiper-slide-prev .review_widget_contents.chat_effect').addClass('chat_effect_end');
      		$('.swiper-slide-next .review_widget_contents.chat_effect').addClass('chat_effect_end');
    	},
		reachEnd: function () {
        	this.autoplay.stop(); // 마지막 슬라이드에서 autoplay 멈춤
            $('#detail_review_widget').addClass('position_slide');  
            
      	}
  	   }
    });
    }
});