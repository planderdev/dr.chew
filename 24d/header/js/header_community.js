$(document).ready(function () {
    
  let commuTimer;

  $('#header_community').on('mouseenter', function () {
    clearTimeout(commuTimer);
    $('#community_list').stop(true, true).fadeIn(300, function () {
      $(this).css('display', 'flex');
    });
  });

  $('#header_community').on('mouseleave', function () {
    commuTimer = setTimeout(function () {
      $('#community_list').stop(true, true).fadeOut(300);
    }, 100);
  });


});