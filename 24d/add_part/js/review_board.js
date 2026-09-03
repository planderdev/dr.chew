$(function(){
  
    var now_url = $(location).attr('href');
    
    if( now_url.includes('board_no=4') || now_url.includes('/4/') ){
        $('#normal_list').remove();
        $('#review_list').css('display','block');
     }else{
        $('#review_list').remove();
        $('#normal_list').css('display','block'); 
     }
    
    
	$('#review_list #search_date').val('all');
    $('#review_list #search_key').val('product');

    
    
	$(".product_and_point_left").each(function(){
        var this_ck_href = $(this).attr('href');
        if( this_ck_href.includes('/$1/$2/') ){
        $(this).removeAttr('href');
        }
	});
    

$('.thumb_a').each(function () {
  const $thumb = $(this);
  const href = $thumb.attr('href') || '';
  const boardNo = $thumb.data('board');

  // href에서 no와 board_no 추출
  const urlParams = new URLSearchParams(href.split('?')[1] || '');
  const bulletinNo = urlParams.get('no');
  const boardNoFromHref = urlParams.get('board_no');

  // boardNo 우선 순위: data-board > href 내부
  const finalBoardNo = boardNo || boardNoFromHref;

  if (bulletinNo && finalBoardNo) {
    const url = '/exec/front/Board/Get?no=' + bulletinNo + '&board_no=' + finalBoardNo;

    EC$.get(url, function (res) {
      if (!res.failed && res.data.thumbnail_image) {
        const $img = $(res.data.thumbnail_image);
        const imgSrc = $img.attr('src');

        if (imgSrc && /\.(jpg|jpeg|png|gif|webp|heic)(\?.*)?$/i.test(imgSrc)) {
          // 이미 있는 <img>가 있다면 src만 교체, 없으면 삽입
          const $existingImg = $thumb.find('img');
          if ($existingImg.length > 0) {
            $existingImg.attr('src', imgSrc);
          } else {
            $thumb.append($img.clone());
          }
        }
      }
    }, 'json');
  }
});

    

let $currentTr = null;
    
$('#review_list .thumb a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var iframeSrc = $this.attr('href'); // 변환 없이 그대로 사용
    var $popup = $('#detail_review_popup');
    var $popupIn = $('#detail_review_popup_in');
    var $popupInfo = $('#detail_review_popup_info');

    // 현재 tr 저장
    $currentTr = $this.closest('tr');
    
  	// 버튼 삽입 (중복 생성 방지)
  	if ($('#view-prev').length === 0 && $('#view-next').length === 0) {
        const match = location.pathname.match(/\/(skin-(?:skin\d+|base))(\/|$)/);
        const skinPath = match ? `/${match[1]}` : '';
		if (match) {
			$popupIn.append(`
        		<img id="view-prev" src="${skinPath}/0svg/left-arr.svg">
        		<img id="view-next" src="${skinPath}/0svg/right-arr.svg">
		    `	);
		}else{
    		$popupIn.append(`
        		<img id="view-prev" src="/0svg/left-arr.svg" >
        		<img id="view-next" src="/0svg/right-arr.svg" >
		    `	);
        }
  	}


    
  	const $prevTr = $currentTr.prevAll('tr.xans-record-').first();
  	const $nextTr = $currentTr.nextAll('tr.xans-record-').first();
    
  	$('#view-prev').toggleClass('not', $prevTr.length === 0);
  	$('#view-next').toggleClass('not', $nextTr.length === 0);

    
    // iframe 삽입
    $popupInfo.html(
        `<iframe src="${iframeSrc}" width="100%" frameborder="0" id="review_iframe"></iframe>`
    );

    // 팝업 표시
    $popup.addClass('review_on');

    // iframe onload 이후 감시 시작
	$('#review_iframe').on('load', function () {
    	const iframe = document.getElementById('review_iframe');
    	if (!iframe || !iframe.contentDocument) return;

    	try {
        	const links = iframe.contentDocument.querySelectorAll('a[href]');

        	links.forEach(link => {
            	const href = link.getAttribute('href').trim();
            	const hasOnClick = link.hasAttribute('onclick');

            	if (
                	href &&
                	href !== 'javascript:;' &&
                	href !== '#none' &&
                	!hasOnClick
            	) {
                	link.setAttribute('target', '_blank');
            	}
        	});
    	} catch (e) {
        	console.error('iframe 링크 처리 중 오류 발생:', e);
    	}
	});

  
});

    
// 이전 버튼
$(document).on('click', '#view-prev', function () {
  if (!$currentTr) return;
  const $prevTr = $currentTr.prevAll('tr.xans-record-').first();
  const $prevThumb = $prevTr.find('.thumb a.thumb_a');
  if ($prevThumb.length) $prevThumb.trigger('click');
});

// 다음 버튼
$(document).on('click', '#view-next', function () {
  if (!$currentTr) return;
  const $nextTr = $currentTr.nextAll('tr.xans-record-').first();
  const $nextThumb = $nextTr.find('.thumb a.thumb_a');
  if ($nextThumb.length) $nextThumb.trigger('click');
}); 
    
    

    
    
	$('#detail_review_popup_mask').on('click', function() {
    	$('#detail_review_popup').removeClass('review_on');    
        $('#detail_review_popup_info').empty();
    });
    
	$('#detail_review_popup_close').on('click', function() {
    	$('#detail_review_popup').removeClass('review_on');    
        $('#detail_review_popup_info').empty();
    });
    

  window.addEventListener('message', function(event) {
    const iframe = document.getElementById('review_iframe');
    if (event.data === 'closeIframe') {
      if (iframe) {
        $('#detail_review_popup_close').click();
        location.reload();
      }
    }else if(event.data === 'closeIframenoreload') {
      if (iframe) {
        $('#detail_review_popup_close').click();
      }
    }else if(event.data === 'reviewlogin') {
      if (iframe) {
        $('#detail_review_popup_close').click();
        $('#header_login_bt').click();
      }
    }
  });
    
    
});












