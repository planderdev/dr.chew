$(function() {
  let memeberPopupClosed = false;
  const $popup = $('#member_popup');

  // body가 #main인 경우 바로 표시
  if ($('body').is('#main')) {
    if ($popup.length > 0 && $popup.css('display') === 'none') {
      $popup.fadeIn(300);
    }
  }

  $(window).on('scroll', function() {
    if (!memeberPopupClosed && $(window).scrollTop() >= 300) {
      if ($popup.length > 0 && $popup.css('display') === 'none') {
        $popup.fadeIn(300);
      }
    }
  });

  $('#member_popup_close').on('click', function() {
    $popup.fadeOut(300);
    memeberPopupClosed = true;
  });
});
