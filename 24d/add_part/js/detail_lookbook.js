$(function(){


	/* 상세 관련상품 */
	if ($('.xans-product-relation').val() != undefined) {	//관련상품 모듈 있을떄만 실행(없으면 주문서페이지에서 오류) -정환
		var relation_slide = new Swiper('.relation_slide', {
			slidesPerView: 3,
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
				1001: {
					slidesPerView: 4,
					spaceBetween: 10,
				},
			}
		});
	}
    
});