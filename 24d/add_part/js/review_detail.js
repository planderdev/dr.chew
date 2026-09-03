$(function(){
  
    const $images = $('#review_detail_left > img'); // 후기 본문 이미지
    const $swiperWrapper = $('#review_detail_swiper .swiper-wrapper');

	if ($images.length > 0) {
  		$images.each(function () {
    		const imgSrc = $(this).attr('src');
    		const slide = `<div class="swiper-slide"><img src="${imgSrc}" alt=""></div>`;
    		$swiperWrapper.append(slide);
  		});
  		// 후기 본문 이미지는 슬라이드로 옮겼으니 제거
  		$images.remove();
	} else {
  		// 이미지가 없을 경우 대체 이미지 슬라이드 추가
  		const fallbackSlide = `<div class="swiper-slide"><img src="/0dzimg/photo_err_img.jpg" alt="이미지가 없습니다"></div>`;
  		$swiperWrapper.append(fallbackSlide);
	}

    // Swiper 실행
    new Swiper('#review_detail_swiper', {
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
		on: {
    			init: function () {
      				const swiper = this;
      				const total = swiper.slides.length;
      				swiper.el.querySelector('.swiper-index').textContent = `1 / ${total}`;
    			},
    			slideChange: function () {
      				const swiper = this;
      				const current = swiper.realIndex + 1;
      				const total = swiper.slides.length;
      				swiper.el.querySelector('.swiper-index').textContent = `${current} / ${total}`;
    			}
  		},
    });
    
    
// 현재 URL에 /skin-skin숫자/ 가 포함되어 있으면 이미지 경로를 동적으로 수정
const match = location.pathname.match(/\/(skin-(?:skin\d+|base))(\/|$)/);
if (match) {
  const skinPath = match ? `/${match[1]}` : '';

  // fallback 이미지 경로 수정 (src가 정확히 해당하는 경우만)
  $('.swiper-slide img[src="/0dzimg/photo_err_img.jpg"]').attr('src', `${skinPath}/0dzimg/photo_err_img.jpg`);

  // 화살표 버튼 이미지 경로 수정
  $('.swiper-button-next img').attr('src', `${skinPath}/0svg/right-arr.svg`);
  $('.swiper-button-prev img').attr('src', `${skinPath}/0svg/left-arr.svg`);
}


    
    
    
	$(document).on('click', '#go_list', function () {
  		$(this).removeAttr('target');
	});
    

	document.querySelectorAll('a[onclick*="BOARD_COMMENT.comment_update"]').forEach(function (el) {
  		const original = el.getAttribute('onclick');
  		if (original.includes('BOARD_COMMENT.comment_update')) {
    		const updated = original.replace('BOARD_COMMENT.comment_update', 'BOARD_COMMENT.comment_update_new');
    		el.setAttribute('onclick', updated);
  		}
	});

    
	$(document).on('click', '.xans-board-commentpaging-4 a', function () {
  		$(this).removeAttr('target');
	});
    
	$('#move_article_bt, #copy_article_bt').each(function () {
  		let onclickAttr = $(this).attr('onclick');
  		if (onclickAttr) {
    		let updated = onclickAttr.replace(
      			/'%2F24d%2Fadd_part%2Freview_detail\.html%3Fno%3D\d+%26board_no%3D\d+'/,
      			"'/24d/add_part/review_detail_return.html'"
    		);
    		$(this).attr('onclick', updated);
  		}
	});

    $('html').css('opacity','1');
    
    

});

    



BOARD_COMMENT.comment_update_new = function (iNo, iCommentNo, e) {
  const $p = EC$(e).parent();
  const $form = EC$('#commentForm');

  const isAlreadyAppended = $form.parent().is($p.parent());
  const isVisible = $form.css('display') === 'block';

  if (isVisible && isAlreadyAppended) {
    // 현재 폼이 이 버튼 옆에 있고, 이미 보이고 있으면 → 숨김 (토글 닫기)
    $form.css('display', 'none');
    return;
  }

  // 기본 로직: 위치 재삽입 + 숨김 처리
  $form.css('display', 'none');
  $p.after($form);

  this.hide_secret_comment_form('commentSecretForm');

  // 비밀댓글 처리
  if (EC$('#comment_secret_link' + iCommentNo).length > 0) {
    this.set_after_filter(BOARD_COMMENT.get_comment_callback);
    this.show_secret_comment_form('commentSecretForm', iCommentNo, true);
    return;
  }

  this.commentGet(iNo, iCommentNo);
};


