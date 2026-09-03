




$(function () {
    new Swiper('.mainpd1', {
      loop: true,
      effect: 'slide', // 또는 'fade'
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      breakpoints: {
		768: { slidesPerView: 2, },
        1001: { slidesPerView: 3, },
  	  },
      navigation: {
        nextEl: '.mainpd1 .swiper-button-next',
        prevEl: '.mainpd1 .swiper-button-prev'
      },

    });


    new Swiper('.mainpd2', {
      loop: true,
      effect: 'slide', // 또는 'fade'
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      breakpoints: {
		768: { slidesPerView: 2, },
        1001: { slidesPerView: 3, },
  	  },
      navigation: {
        nextEl: '.mainpd1 .swiper-button-next',
        prevEl: '.mainpd1 .swiper-button-prev'
      },

    });





});