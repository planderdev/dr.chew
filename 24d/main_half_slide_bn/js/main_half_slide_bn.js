



$(function () {
    new Swiper('#main_half_slide_bn_right', {
      loop: true,
      effect: 'slide', // 또는 'fade'
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el: '#main_half_slide_bn_right .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '#main_half_slide_bn_right .swiper-button-next',
        prevEl: '#main_half_slide_bn_right .swiper-button-prev'
      },
    });
});