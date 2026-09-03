$(function(){
    
    
const product_best = new Swiper('.product_best_swipe', {
  speed : 700,
  loop : false,
  /*
  navigation: {
    nextEl: '.product_best_swipe .swiper-button-next',
    prevEl: '.product_best_swipe .swiper-button-prev',
  },
  */
  autoplay: {     
          delay: 5000,
          disableOnInteraction: false, // false-스와이프 후 자동 재생
  },
  pagination: {
    el: '.product_best_swipe .swiper-pagination',
    type: 'bullets',
    clickable:true,
  },
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween:0,
  breakpoints: {
    1000: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 0
    },
    787: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 0
    }
  }
 
}); 
    
    
})