$(function(){
    
    
const product_new = new Swiper('.product_new_swipe', {
  speed : 700,
  loop : false,
  /*
  navigation: {
    nextEl: '.product_new_swipe .swiper-button-next',
    prevEl: '.product_new_swipe .swiper-button-prev',
  },
  */
  autoplay: {     
          delay: 5000,
          disableOnInteraction: false, // false-스와이프 후 자동 재생
  },
  pagination: {
    el: '.product_new_swipe .swiper-pagination',
    type: 'bullets',
    clickable:true,
  },
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 15,
  breakpoints: {
    1000: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 12
    },
    787: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 10
    }
  }
 
}); 

    
    
})