
EC$(function($) {
    var filter = "win16|win32|win64|mac|macintel";
    var device = "pc";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
			device = "mobile";
		}
    }

    /**
     * 상품상세, 상품 확대보기(팝업) - 소비자가 할인표시 */
    var oPriceInfoEl = $('#ec-product-price-info');
    if (oPriceInfoEl.length > 0) {
        var salePriceEl = $('#span_product_price_text');
        percentageCul(oPriceInfoEl, salePriceEl);
    }

    /**
    * 상품목록/메인진열 - 소비자가 할인표시*/
	function sale_percent() {
		var mainEl = $("#contents");
		if (mainEl.length > 0) {
		  var productListEl = $('.xans-product-listmain, .xans-product-listrecommend, .xans-product-listnew, .xans-product-listnormal, .xans-search-result');
			for (var i = 0; i < productListEl.length; i++) {
				var prdListEl = productListEl.eq(i).find('.prdList > li');
				for (var j = 0; j < prdListEl.length; j++) {
					var priceEl = prdListEl.eq(j).find('.description'),
						salePriceEl = priceEl.parent().find('.thumbnail');
					if (device == "mobile") {
						salePriceEl = priceEl.parent().find('.thumbnail');
					}
					percentageCul(priceEl, salePriceEl);

				}
			}
            specClass();
            reorderSpecItems();
		}
	}

    function percentageCul(target, salePriceEl) {
		var iCustomPrice = parseInt(target.attr('ec-data-custom').replace(/,/g, "")); // 검색페이지에서 쉼표 삭제
		var iPrice = parseInt(target.attr('ec-data-price').replace(/,/g, "")); // 검색페이지에서 쉼표 삭제
        var sDisplayAmount = 'p', // p:할인율, w:할인금액
            iOfftoFixed = 0, // 할인율 소수점자릿수
            sSaleText = '',
            regexp = /B(?=(d{3})+(?!d))/g;

        if (iCustomPrice > 0 && iPrice > 0 && iPrice != iCustomPrice) {
            if (sDisplayAmount == 'p') {
                sSaleText = (((iCustomPrice - iPrice) / iCustomPrice) * 100).toFixed(iOfftoFixed) + '%';
            } else if (sDisplayAmount == 'w') {
                sSaleText = parseInt(iCustomPrice - iPrice).toString().replace(regexp, ',') + '원 OFF';
            }
            
            target.find('.sale_box').remove();
        	salePriceEl.find('.sale_box').remove();
            	
            var specLi = target.find('.spec').first();;
			if (specLi.length > 0) {
            	specLi.append("<li class='sale_box'>" + sSaleText + "</li>");
			}else{
                salePriceEl.append("<div class='sale_box'>" + sSaleText + "</div>");
            }
        }
    }

    
    function specClass(){
		$('.ec-base-product .spec li strong span:contains("상품명")').parents('.ec-base-product .spec li').addClass('spec_name');
		$('.ec-base-product .spec li strong span:contains("판매가")').parents('.ec-base-product .spec li').addClass('spec_price');
		$('.ec-base-product .spec li strong span:contains("소비자가")').parents('.ec-base-product .spec li').addClass('spec_consumer');
		$('.ec-base-product .spec li strong span:contains("상품요약정보")').parents('.ec-base-product .spec li').addClass('spec_info');
        $('.ec-base-product .spec li strong span:contains("상품요약설명")').parents('.ec-base-product .spec li').addClass('spec_info');
        $('.ec-base-product .spec li strong span:contains("상품 요약설명")').parents('.ec-base-product .spec li').addClass('spec_info');
		$('.ec-base-product .spec li strong span:contains("상품간략설명")').parents('.ec-base-product .spec li').addClass('spen_simple');             
	};

    
	function reorderSpecItems() {
    	$('.ec-base-product .spec').each(function () {
	        const $spec = $(this);

	        const $info = $spec.find('li.spec_info').first();           // 1번째
	        const $consumer = $spec.find('li.spec_consumer').first();   // 2번째
	        const $price = $spec.find('li.spec_price').first();         // 3번째
	        const $saleBox = $spec.find('li.sale_box').first();   // 4번째

	        // 순서대로 맨 앞으로 prepend (역순으로 처리)
	        if ($saleBox.length) $saleBox.prependTo($spec);
	        if ($price.length) $price.prependTo($spec);
	        if ($consumer.length) $consumer.prependTo($spec);
	        if ($info.length) $info.prependTo($spec);
	    });
	}

    



    
    
    
function salePeriod() {
  $('.discountPeriod .layerDiscountPeriod .content p:nth-child(3)').each(function () {
    const $endText = $(this);
    const dateRange = $endText.text().trim();
    const match = dateRange.match(/~\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/);

    // 기본적으로 감춤
    $(this).closest('li').css('display', 'none');

    if (match) {
      const endDateStr = match[1];
      const endDate = new Date(endDateStr.replace(/-/g, '/')); // Safari 호환용

      const $record = $endText.closest('li[id^="anchorBoxId_"]');
      const $thumbnail = $record.find('.thumbnail');
      let $countdownEl = $thumbnail.find('.sale_countdown');

      if ($countdownEl.length === 0) {
        $countdownEl = $('<div class="sale_countdown"></div>');
        $thumbnail.append($countdownEl);
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

      // 카운트다운 표시를 위해 다시 보이게
      $record.css('display', '');

      // 초기 실행
      updateCountdown();
      // 반복 업데이트
      setInterval(updateCountdown, 1000);
    }
  });
}

    
    

    
    
	/* 상품 할인율 실행 */
	setTimeout(function(){
		sale_percent();
        salePeriod();
	}, 300);

	/* [더보기] 버튼 클릭시 상품로딩되고 0.6초후 재계산 */
	jQuery(".btnMore").click( function( ){
		setTimeout(function(){
			sale_percent();
            salePeriod();
		}, 600);
	});
    
    
    
    
    
    
});