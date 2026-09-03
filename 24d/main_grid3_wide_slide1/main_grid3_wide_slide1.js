$(function(){
    
const main_grid3_wide_slide1 = new Swiper('.main_grid3_wide_slide1', {
  speed : 700,
  loop: false,
  allowTouchMove: true,
  pagination: {
    el: '.main_grid3_wide_slide1 .swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  slidesPerView: 3,
  spaceBetween: 0,
  breakpoints: {
    1024: {
      allowTouchMove: true,
      slidesPerView: 3,
      spaceBetween: 0,

    }
  }

 
});
    

    
    
    
    
})