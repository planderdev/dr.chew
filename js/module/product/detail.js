function removePagingArea(oTarget)
{
    if ($(oTarget).length < 1 && (oTarget != '#prdReview' || oTarget != '#prdQna')) return;

    if ($(oTarget).css('display') == 'block') {
        if (oTarget == '#prdReview') {
            var record = $('.xans-record-', '.xans-product-review').first();
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-reviewpaging').remove();
             }
         } else if (oTarget == '#prdQnA') {
            var record = $('.xans-record-', '.xans-product-qna').first();
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-qnapaging').remove();
            }
         }
     }
}

$(function() {

    $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').off().on('click', function() {
        try {
            var id = $(this).attr('id').replace(/Clone/g, '');
            if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
            else return false;
        } catch(e) {
            return false;
        }
    });

    function productDetailOrigin(){
        var imgChk = $('#prdDetailContent').find('img').length;
        if(imgChk <= 0){
            $('#prdDetailBtn').remove();
        }
    }
    productDetailOrigin();

    // Add Image
    var oTarget = $('.xans-product-mobileimage ul li');
    var oAppend = oTarget.first().children('p').clone();

    oTarget.slice(1).each(function() {
        // $(this).children().wrap(function() {
        //     return '<p class="thumbnail">' + $(this).html() + oAppend.html() + '</p>';
        // });
        this.innerHTML = '<p class="thumbnail">' + oAppend.html() + this.innerHTML + '</p>';
        if ($(this).children('p').children('img').length > 1) {
            $(this).children('p').children('img').first().remove();
        }
    });
});


jQuery(document).ready(function() {

	/* 상세 관련상품 */
	if (jQuery('.xans-product-relation').val() != undefined) {	//관련상품 모듈 있을떄만 실행(없으면 주문서페이지에서 오류) -정환
		var relation_slide = new Swiper('.relation_slide', {
			slidesPerView: 2,
			spaceBetween: 20,
			observer: true,
			observeParents: true,
			watchOverflow: 'true', // 스와이프가 한개일때 버튼 라인 비활성
			speed:700,
			navigation: {
				nextEl: '.swiper-next-relation',
				prevEl: '.swiper-prev-relation',
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
				draggable: true,
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			breakpoints: {
				768: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
			}
		});
	}

    // 상품상세 탭 이벤트
    $('#tabProduct a').click(function(e){
        var oTarget = $(this).attr('href');
        $(this).parent('li').addClass('selected').siblings().removeClass('selected');
        var domWidth = $(document).width();
        if(domWidth < 1024){	// 모바일에서만 실행
			$('#tabProduct a').each(function(){
				var oSiblings = $(this).attr('href');
				if (oTarget != oSiblings) {
					$(oSiblings).hide();
				} else {
					$(oTarget).show();
				}
			});
		}
        removePagingArea(oTarget);
        if(e) e.preventDefault();
    });

});





//썸네일 슬라이드
$(function () {
    $('#slide_thumbnail li').css('display', 'list-item');
    $('#slide_thumbnail li').addClass('swiper-slide');
    $('#slide_thumbnail_dot li').css('display', 'list-item');
    $('#slide_thumbnail_dot li').addClass('swiper-slide');
    $('#slide_thumbnail_dot li:first-child').css('border','1px solid var(--line-strong)');
    
	const thumbDotSwiper = new Swiper('#slide_thumbnail_dot', {
  		spaceBetween: 10,
  		slidesPerView: 8,
  		watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
        loop: false,
        on: {
      	  init: function () {
      		  $('#slide_thumbnail_dot li').css('opacity', '1');
      	  },
        },
		breakpoints: {
			1000: {
				slidesPerView: 5,
			},
		}
	});
     
    const thumbSwiper = new Swiper('#slide_thumbnail', {
      loop: false,
      effect: 'slide', // 또는 'fade'
      speed: 1000,
      navigation: {
        nextEl: '#slide_thumbnail .swiper-button-next',
        prevEl: '#slide_thumbnail .swiper-button-prev'
      },
      slidesPerView:1,
	  thumbs: {
	  	swiper: thumbDotSwiper,
	  },
    });
    
    thumbSwiper.on('slideChange', function () {
  		const realIndex = thumbSwiper.realIndex;
		$('#slide_thumbnail_dot .swiper-slide').css('border','0 solid var(--line-strong)');
		$('#slide_thumbnail_dot .swiper-slide').eq(realIndex).css('border','1px solid var(--line-strong)');
  		thumbDotSwiper.slideTo(realIndex);
	});
    

});



function getProductDetailRowType(title) {
  const normalizedTitle = title.replace(/\s+/g, '');

  if (normalizedTitle === '상품명') return 'name';
  if (normalizedTitle.indexOf('영문상품명') > -1) return 'en';
  if (
    normalizedTitle.indexOf('상품요약정보') > -1 ||
    normalizedTitle.indexOf('상품요약설명') > -1 ||
    normalizedTitle.indexOf('상품간략설명') > -1
  ) return 'summary';
  if (normalizedTitle.indexOf('할인판매가') > -1) return 'sale';
  if (normalizedTitle.indexOf('판매가') > -1) return 'price';

  return 'default';
}

function normalizeProductDetailInfo() {
  const rowClassNames = 'detail-meta-row--name detail-meta-row--en detail-meta-row--summary detail-meta-row--price detail-meta-row--sale detail-meta-row--default';

  $('.infoArea .xans-product-detaildesign').each(function () {
    const $design = $(this);
    const $rows = $design.find('> table > tbody > tr');

    $rows.each(function () {
      const $row = $(this);
      const $title = $row.children('th').first();
      const $content = $row.children('td').first();

      if (!$title.length) return;

      const rowType = getProductDetailRowType($.trim($title.text()));

      $row.addClass('detail-meta-row').removeClass(rowClassNames).addClass(`detail-meta-row--${rowType}`);
      $title.addClass('detail-meta-title');
      $content.addClass('detail-meta-content');

      if (['en', 'summary', 'price', 'sale'].indexOf(rowType) > -1) {
        $title.addClass('displaynone');
      }
    });

    const hasSale = $rows.filter('.detail-meta-row--sale').filter(function () {
      const saleText = $.trim($(this).find('.detail-meta-content, td').first().text());
      return saleText.length > 0 && !$(this).hasClass('displaynone');
    }).length > 0;

    $design.toggleClass('detail-has-sale', hasSale);
  });
}

// th 삭제 td 한줄처리
function fixHiddenTh() {
  $('.infoArea .xans-product-detaildesign th.displaynone').each(function () {
    const $th = $(this);
    const $tr = $th.closest('tr');
    $th.remove();
    $tr.find('td').attr('colspan', 2).addClass('detail-meta-content--full');
  });
}

$(function() {

  normalizeProductDetailInfo();
  fixHiddenTh();

  const infoArea = document.querySelector('.infoArea');
  if (!infoArea) return;

  const observer = new MutationObserver(function () {
    normalizeProductDetailInfo();
    fixHiddenTh();
  });

  observer.observe(infoArea, {
    childList: true,
    subtree: true
  });
    
});




//상품상세 스크롤고정


function updateTab_pcPosition() {
  const tab_pc = document.getElementById('tabProduct_PC');
  const tabArea_pc = document.getElementById('tabProduct_area_PC');
    
  if (!tab_pc || !tabArea_pc) return;
    
  const tabRect = tab_pc.getBoundingClientRect();
  const tabTop = tabRect.top + window.scrollY;
  const scrollTop = window.scrollY;
  const additional = document.querySelector('.xans-product-additional');

  // 탭 고정 조건 (원래 위치에서 top:0px 되었을 때)
  if (!tab_pc.classList.contains('fixed') && scrollTop >= tabTop - 0) {
    tab_pc.classList.add('fixed');
    tabArea_pc.style.display = 'block';
    tabArea_pc.style.height = `${tab_pc.offsetHeight}px`;
      
  }

  // 원래 자리로 돌아왔을 때 fixed 제거
  if (tab_pc.classList.contains('fixed')) {
    const areaRect = tabArea_pc.getBoundingClientRect();
      
      
	if (additional) {
      const additionalWidth = window.getComputedStyle(additional).width;
      tab_pc.style.width = additionalWidth;
    }
      
    if (areaRect.top >= 50) {
      tab_pc.classList.remove('fixed');
      tabArea_pc.style.display = 'none';
        
      tab_pc.style.width = '';
    }
  }
}

window.addEventListener('scroll', updateTab_pcPosition);
window.addEventListener('resize', updateTab_pcPosition);
window.addEventListener('load', updateTab_pcPosition);






//상품상세 스크롤고정


function updateTabPosition() {
  const tab = document.getElementById('tabProduct');
  const tabArea = document.getElementById('tabProduct_area');
    
  if (!tab || !tabArea) return;
    
  const tabRect = tab.getBoundingClientRect();
  const tabTop = tabRect.top + window.scrollY;
  const scrollTop = window.scrollY;

  // 탭 고정 조건 (원래 위치에서 top:50px 되었을 때)
  if (!tab.classList.contains('fixed') && scrollTop >= tabTop - 40) {
    tab.classList.add('fixed');
    tabArea.style.display = 'block';
    tabArea.style.height = `${tab.offsetHeight}px`;
  }

  // 원래 자리로 돌아왔을 때 fixed 제거
  if (tab.classList.contains('fixed')) {
    const areaRect = tabArea.getBoundingClientRect();
    if (areaRect.top >= 50) {
      tab.classList.remove('fixed');
      tabArea.style.display = 'none';
    }
  }
}

window.addEventListener('scroll', updateTabPosition);
window.addEventListener('resize', updateTabPosition);
window.addEventListener('load', updateTabPosition);





//리사이즈 시 탭내용 다시 노출
function showSectionsIfWide() {
  if (window.innerWidth >= 1000) {
    ['#prdDetail', '#prdReview', '#prdQnA', '#prdInfo'].forEach(selector => {
      const el = document.querySelector(selector);
      if (el && el.style.display === 'none') {
        el.style.display = ''; // 또는 'block' 등 원래 상태로
      }
    });
  }
}

// 처음 로딩 시 실행
window.addEventListener('load', showSectionsIfWide);

// 창 리사이즈 시에도 감지
window.addEventListener('resize', showSectionsIfWide);

$(function() {
    function displayClass(){
		normalizeProductDetailInfo();
        fixHiddenTh();
	};
	displayClass();
    
    
$('.detail_tab a[href^="#"]').on('click', function (e) {
  const targetId = $(this).attr('href');
  const $target = $(targetId);

  if ($target.length) {
    e.preventDefault();

    // 보정값 적용
    const offset = $target.offset().top - 100; // 예: 고정 헤더가 100px인 경우

    $('html, body').animate({ scrollTop: offset }, 400);
  }
});
    
    
    
});




  $('.xans-record- .period').each(function () {
    const $endText = $(this);
    const dateRange = $endText.text().trim();
    const match = dateRange.match(/~\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/);
      
	$(this).closest('tr.xans-record-').css('display','none');
      
    if (match) {
      const endDateStr = match[1];
      const endDate = new Date(endDateStr.replace(/-/g, '/')); // Safari 호환성 위해 '/' 사용

      const $targetArea = $('.detailArea').find('#slide_thumbnail');
      let $countdownEl = $('.infoArea_in').find('.sale_countdown_detail');
        
	  if ($countdownEl.length === 0) {
      	$countdownEl = $('<div class="sale_countdown_detail"></div>');
      	$targetArea.append($countdownEl);
      }
        
      function updateCountdown() {
        const now = new Date();
        let diff = Math.max(0, endDate - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const pad = (n) => String(n).padStart(2, '0');
        const countdownStr = `${days}일 ${pad(hours)}:${pad(minutes)}:${pad(seconds)} 종료`;

        $countdownEl.html(countdownStr);
      }

      // 최초 실행
      updateCountdown();
      // 개별로 인터벌 실행
      setInterval(updateCountdown, 1000);
    }
  }); 





function updateDeliveryGauge() {
  // em 또는 .price 중 존재하는 걸 선택
  let priceText = $('#totalPrice .total em').text().trim();
  if (!priceText) {
    priceText = $('#totalPrice .total .price').text().trim();
  }

  const totalPrice = parseInt(priceText.replace(/[^\d]/g, ''), 10);
  const $gauge = $('#delivery_gauge');

  if (isNaN(totalPrice)) {
    $gauge.css('display', 'none');
    return;
  }

  const deliveryText = $('.delv_price_B').text().trim();
  const match = deliveryText.match(/(\d{1,3}(?:,\d{3})*)(?:원)?\s*\(?(?:(\d{1,3}(?:,\d{3})*)(?:원)? 이상 구매 시 무료)?/);

  let goalPrice = 0;
  if (match && match[2]) {
    goalPrice = parseInt(match[2].replace(/,/g, ''), 10);
  } else {
    $gauge.css('display', 'none');
    return;
  }

  const percent = Math.min(100, Math.floor((totalPrice / goalPrice) * 100));
  const remain = Math.max(0, goalPrice - totalPrice);

  $gauge.find('.gauge-bar').css('width', percent + '%');
  $gauge.find('.gauge-label.right').text(`${goalPrice.toLocaleString()}원`);

  const msg = remain > 0
    ? `<p>${remain.toLocaleString()}원</p>만 더 담으면 <p>무료배송!</p>😊`
    : `<span>무료배송</span>이 적용되었습니다!`;
  $gauge.find('.gauge-message').html(msg);

  $gauge.css('display', 'flex');
}
// 초기 실행
updateDeliveryGauge();

// 감시 설정
const targetNode = document.querySelector('#totalPrice');
if (targetNode) {
  const observer = new MutationObserver(updateDeliveryGauge);
  observer.observe(targetNode, { childList: true, subtree: true });
}
