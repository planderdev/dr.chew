$(document).ready(function () {
    const $cate1_ul = $('#category_wrap .cate1_ul, #category_all .cate1_ul');
    const $cate1_li_img = $('#category_wrap .category_img li');
    const $cate1_li_list = $cate1_ul.find('.cate1_li');
    const len = $cate1_li_list.length;
    const winW = $(window).width();
/*
    let cate_wrap_w = $('#header_line #category_wrap').outerWidth(true),
        cate_ul_w = $('#header_line #category_wrap .scroll_cate .scroll_cate_ul').outerWidth(true),
        cate1_li_w = 0;

    $('#header_line #category_wrap .scroll_cate .scroll_cate_ul .cate1_li').each(function () {
        cate1_li_w += $(this).width();
    });

    if ($('#header_line #category_wrap .scroll_cate .scroll_cate_ul .cate1_li').length >= 5) {
        $('#header_line #category_wrap .scroll_cate').css('max-width', cate1_li_w);
    }

    if (cate_wrap_w < cate1_li_w) {
        $('#category_wrap .scroll_cate_ul.cate1_ul').addClass('mouseWheelOn');
    } else {
        $('#category_wrap .scroll_cate_ul.cate1_ul').removeClass('mouseWheelOn');
    }

    const scroll_cate_ul = document.querySelector("#header_line #category_wrap .scroll_cate .scroll_cate_ul");
    scroll_cate_ul.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scroll_cate_ul.scrollLeft += evt.deltaY;
    });
*/
    $.ajax({
        url: '/exec/front/Product/SubCategory',
        dataType: 'json',
        success: function (aData) {
            if (!aData) return;

            $.each(aData, function (index, key) {
                const $cate1_li = $cate1_ul.find(`.cate1_li[data-param$="=${key.parent_cate_no}"]`);
                const _index = $cate1_li_list.index($cate1_li);
				
                if ($cate1_li.length) {
                    if (!$cate1_li.hasClass('more_cate')) {
                        $cate1_li.addClass('more_cate');
                        $cate1_li.append(`<div class="cate2_ul"><ul></ul></div>`); //<div class="img">${$cate1_li_img.eq(_index % len).html()}</div>  </ul> 뒤에 삽입
                    }
                    $cate1_li.find('.cate2_ul ul').append(`<li data-param="${key.param}" class="cate2_li"><a href="/product/list.html${key.param}">${key.name}</a></li>`);
                    return;
                }

                const $cate2_li = $cate1_ul.find(`.cate2_li[data-param$="=${key.parent_cate_no}"]`);
                if ($cate2_li.length) {
                    if (!$cate2_li.hasClass('more_cate')) {
                        $cate2_li.addClass('more_cate');
                        $cate2_li.append('<ul class="cate3_ul"></ul>');
                    }
                    $cate2_li.find('.cate3_ul').append(`<li data-param="${key.param}" class="cate3_li"><a href="/product/list.html${key.param}">${key.name}</a></li>`);
                    return;
                }

                const $cate3_li = $cate1_ul.find(`.cate3_li[data-param$="=${key.parent_cate_no}"]`);
                if (!$cate3_li.hasClass('more_cate')) {
                    $cate3_li.addClass('more_cate');
                    $cate3_li.append('<ul class="cate4_ul"></ul>');
                }
                $cate3_li.find('.cate4_ul').append(`<li data-param="${key.param}" class="cate4_li"><a href="/product/list.html${key.param}">${key.name}</a></li>`);
            });

            setCategory();
        }
    });
});



function setCategory() {
    
    
    
    // 마우스 오버 시 효과
    /*
    (function () {
        const $wrap = $('#category_wrap'),
              $cate1_li = $wrap.find('.scroll_cate_ul .cate1_li'),
              $cate2_li = $wrap.find('.scroll_cate_ul .cate2_li'),
              $cate3_li = $wrap.find('.scroll_cate_ul .cate3_li'),
              fadespeed = 200;

        $cate1_li.on('mouseenter', function () {
            const $this = $(this);
            $this.addClass('viewcate').find('.cate2_ul').stop(true, true).fadeIn(fadespeed).css('display', 'flex');

            if (!$this.hasClass('more_cate')) {
                const $imgs = $('.category_img li'),
                      $list = $('.cate1_ul').find('.cate1_li'),
                      len = $list.length,
                      idx = $this.index(),
                      imgHTML = $imgs.eq(idx % len).html();

                if (imgHTML.indexOf('img') === -1) {
                    $('div.img_nocate').remove();
                } else {
                    $this.append(`<div class="img_nocate">${imgHTML}</div>`);
                }
            }

            if ($this.find('div.img').children().length < 1) {
                $this.find('div.img').hide();
            }

            if ($this.find('div.img_nocate').children().length < 1) {
                $this.find('div.img_nocate').hide();
            }
        }).on('mouseleave', function () {
            $(this).removeClass('viewcate').find('.cate2_ul').stop(true, true).fadeOut(fadespeed);
            $('div.img_nocate').remove();
        });

        $cate2_li.on('mouseenter', function () {
            $cate2_li.css('z-index', 0);
            $(this).css('z-index', 1).find('.cate3_ul').stop(true, true).fadeIn(fadespeed).addClass('viewcate');
        }).on('mouseleave', function () {
            $(this).removeClass('viewcate').find('.cate3_ul').stop(true, true).fadeOut(fadespeed);
        });

        $cate3_li.on('mouseenter', function () {
            $cate3_li.css('z-index', 0);
            $(this).css('z-index', 1).find('.cate4_ul').stop(true, true).fadeIn(fadespeed).addClass('viewcate');
        }).on('mouseleave', function () {
            $(this).removeClass('viewcate').find('.cate4_ul').stop(true, true).fadeOut(fadespeed);
        });
    })();
    */
    
    
    
    
$('.cate1_li').on('mouseenter', function () {
  const $this = $(this);
  const $cate2_ul = $this.find('.cate2_ul');
  const $cate2_li = $cate2_ul.find('.cate2_li');


  const existingTimer = $this.data('cate2-timer');
  if (existingTimer) {
    clearTimeout(existingTimer);
    $this.removeData('cate2-timer');
  }

  $cate2_ul.removeClass('cate2_leave');

  $cate2_li.each(function (i) {
    $(this).css('transition-delay', `${i * 80}ms`);
  });

  $cate2_ul.addClass('cate2_hover');
}).on('mouseleave', function () {
  const $this = $(this);
  const $cate2_ul = $this.find('.cate2_ul');
  const $cate2_li = $cate2_ul.find('.cate2_li');
  const count = $cate2_li.length;
  const totalDelay = (count - 1) * 80 + 300;

  $cate2_ul.addClass('cate2_leave');

  $cate2_li.each(function (i) {
    const delay = (count - 1 - i) * 80;
    $(this).css('transition-delay', `${delay}ms`);
  });

  // ✅ 해당 요소에만 타이머 저장
  const timer = setTimeout(function () {
    $cate2_ul.removeClass('cate2_hover cate2_leave');
    $cate2_li.css('transition-delay', '0ms');
    $this.removeData('cate2-timer');
  }, totalDelay);

  $this.data('cate2-timer', timer);
});

    
    
    
    
    
    
    

    // 전체 카테고리
    (function () {
        const $all = $('#category_all'),
              $cate1 = $all.find('.cate1_li'),
              $cate2 = $all.find('.cate2_li'),
              $cate3 = $all.find('.cate3_li'),
              $btn = $('#header_all_cate'),
              fadespeed = 200;

        $cate1.add($cate2).add($cate3).on('mouseenter', function () {
            const $this = $(this);
            $(this).siblings().css('z-index', 0);
            $this.css('z-index', 1).addClass('viewallcate');
            if ($this.hasClass('cate2_li')) $this.find('.cate3_ul').stop(true, true).fadeIn(fadespeed);
            if ($this.hasClass('cate3_li')) $this.find('.cate4_ul').stop(true, true).fadeIn(fadespeed);
        }).on('mouseleave', function () {
            const $this = $(this);
            $this.removeClass('viewallcate');
            if ($this.hasClass('cate2_li')) $this.find('.cate3_ul').stop(true, true).fadeOut(fadespeed);
            if ($this.hasClass('cate3_li')) $this.find('.cate4_ul').stop(true, true).fadeOut(fadespeed);
        });

        $btn.on('mouseenter', function () {
            $(this).addClass('viewallcate');
            $all.stop(true, true).fadeIn(fadespeed);
            $('#scroll_icon').delay(200).fadeIn(200);
            setTimeout(() => {
                $('#scroll_icon').addClass('scroll_icon_on');
                setTimeout(() => {
                    $('#scroll_icon').fadeOut(1000);
                    setTimeout(() => $('#scroll_icon').addClass('scroll_icon_off'), 1000);
                }, 2000);
            }, 400);
        }).on('mouseleave', function () {
            $(this).removeClass('viewallcate');
            $all.stop(true, true).fadeOut(fadespeed);
        });

		$btn.on('wheel', function () {
    		$('#scroll_icon').addClass('scroll_icon_off');
		});

    })();

    // 대분류 페이지의 중분류 카테고리
    (function () {
        const $menu = $('.menuCategory');
        if (!$menu.length) return;

        const $mcate2 = $menu.find('.mcate2_li'),
              $mcate3 = $menu.find('.mcate3_li'),
              fadespeed = 200;

        $mcate2.each(function () {
            if ($(this).find('.mcate3_ul').length > 0) {
                $(this).addClass('more_cate');
            }
        });

        $mcate3.each(function () {
            if ($(this).find('.mcate4_ul').length > 0) {
                $(this).addClass('more_cate');
            }
        });

        $mcate2.on('mouseenter', function () {
            $(this).addClass('viewcate').find('.mcate3_ul').stop(true, true).fadeIn(fadespeed);
        }).on('mouseleave', function () {
            $(this).removeClass('viewcate').find('.mcate3_ul').stop(true, true).fadeOut(fadespeed);
        });

        $mcate3.on('mouseenter', function () {
            $(this).addClass('viewcate').find('.mcate4_ul').stop(true, true).fadeIn(fadespeed);
        }).on('mouseleave', function () {
            $(this).removeClass('viewcate').find('.mcate4_ul').stop(true, true).fadeOut(fadespeed);
        });
    })();
}



$(window).resize(function () {
    const winW = $(window).width();
    $('#category_all').css('width', winW);

    let cate_wrap_w = $('#header_line #category_wrap').outerWidth(true),
        cate1_li_w = 0;

    $('#header_line #category_wrap .scroll_cate .scroll_cate_ul .cate1_li').each(function () {
        cate1_li_w += $(this).width();
    });

    if ($('#header_line #category_wrap .scroll_cate .scroll_cate_ul .cate1_li').length >= 5) {
        $('#header_line #category_wrap .scroll_cate').css('max-width', cate1_li_w);
    }

    if (cate_wrap_w < cate1_li_w) {
        $('#category_wrap .scroll_cate_ul.cate1_ul').addClass('mouseWheelOn');
    } else {
        $('#category_wrap .scroll_cate_ul.cate1_ul').removeClass('mouseWheelOn');
    }
});
