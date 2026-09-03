$(function(){
  

    var popArr = [];
      
    
    function movePopup(num) {
        var siteWidth = $( window ).width(),
            popRight = $('#popup_'+num).offset().left + $('#popup_'+num).outerWidth(),
            popWidth = $('#popup_'+num).width(),
            popiframeWidth = $('#popup_'+num+' iframe').width();
        
        $('#popup_'+num).css('z-index','501');
        
        if(popWidth<popiframeWidth){
            $('#popup_'+num).css('width',popiframeWidth+'px');
        }
        
        if(siteWidth < popRight){
            $('#popup_'+num).css('left','auto');
            $('#popup_'+num).css('right','0px');
            $('#popup_'+num).css('margin-right','20px');
        }
	}
    
    
	for (var i = 0; i < 9999; i++) {
      popArr[i] = 0;  
        
      if($('#popup_'+i).length) {
       popArr[i] = 1;
	  }  
        
      if(popArr[i] == 1 ){
      	movePopup(i);
      }
    }
    
    
	$(window).resize(function(){ 
		for (var i = 1; i < 11; i++) {
      		if(popArr[i] == 1 ){
      			movePopup(i);
      		}
    	}
	});
    
    
    
    


function icon_box_transform() {
  $('.ec-base-product .prdList .icon__box').each(function () {
    const $spans = $(this).children('span');
    const visibleSpans = $spans.filter(':visible');

    const count = visibleSpans.length;

    if (count === 1) {
      visibleSpans.eq(0).css('transform', 'translate(-50%, -50%)');
    } else if (count === 2) {
      visibleSpans.eq(0).css('transform', 'translate(-120%, -50%)');
      visibleSpans.eq(1).css('transform', 'translate(20%, -50%)');
    } else {
    }
  });
}

// 가장 늦게 실행되도록 설정
$(window).on('load', function () {
  requestAnimationFrame(function () {
    setTimeout(icon_box_transform, 300);
  });
});


    
    
    

$('.ec-base-product .discountPeriod').click(function() {
  $('.discountPeriod').removeClass('tipOn');
  $(this).addClass('tipOn');
});
    
$(document).on('click', '.ec-base-product .discountPeriod .btnClose', function() {
  $(this).closest('.discountPeriod').removeClass('tipOn');
});
    
    
    
    
// 요소 나타나는 효과 gt.css 에서 속도 효과 조절 scroll-reveal  
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      observer.unobserve(entry.target); // 한 번만 실행하려면
    }
  });
});

document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});
document.querySelectorAll('.scroll-color').forEach(el => {
  observer.observe(el);
});

    
    
// 품절 상태 확인    
$('li.xans-record-').each(function () {
  if ($(this).find('img[alt="품절"]').length) {
    $(this).addClass('soldout');
  }
});   

    
    
    
});