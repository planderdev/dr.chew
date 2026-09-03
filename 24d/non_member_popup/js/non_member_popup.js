$(function() {
  let nonMemeberPopupClosed = false;
  const $nonmpopup = $('#non_member_popup');

  // body가 #main인 경우 바로 표시
  if ($('body').is('#main')) {
    if ($nonmpopup.length > 0 && $nonmpopup.css('display') === 'none') {
      $nonmpopup.fadeIn(300);
    }
  }

  $(window).on('scroll', function() {
    if (!nonMemeberPopupClosed && $(window).scrollTop() >= 300) {
      if ($nonmpopup.length > 0 && $nonmpopup.css('display') === 'none') {
        $nonmpopup.fadeIn(300);
      }
    }
  });

  $('#non_member_popup_close').on('click', function() {
    $nonmpopup.fadeOut(300);
    nonMemeberPopupClosed = true;
  });
});



