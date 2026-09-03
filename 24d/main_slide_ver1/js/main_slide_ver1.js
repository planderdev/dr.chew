



$(function () {
    new Swiper('#main_slide_ver1_in', {
      loop: true,
      effect: 'slide', // 또는 'fade'
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '#main_slide_ver1_navigation .swiper-button-next',
        prevEl: '#main_slide_ver1_navigation .swiper-button-prev'
      },
	  on: {
	    init: function () {
  			const realSlides = Array.from(this.slidesEl.children)
        	.filter((el) => el.hasAttribute('data-swiper-slide-index')) // loop 복제 포함
    		.map((el) => el.getAttribute('data-swiper-slide-index'));

  			const uniqueSlides = [...new Set(realSlides)]; // 중복 제거 → 고유 슬라이드 수
  			const total = uniqueSlides.length;

  			$('#main_slide_ver1_navigation .total').text(total);
  			$('#main_slide_ver1_navigation .current').text(this.realIndex + 1);
        },
	    slideChange: function () {
  			$('#main_slide_ver1_navigation .current').text(this.realIndex + 1);
		}
	  }
    });
});