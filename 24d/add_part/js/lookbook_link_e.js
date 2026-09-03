

;


const $lookbookLinks = $('.lookbook_num');

if ($lookbookLinks.length) {
  // /shop숫자/가 있어도, 없어도 매칭: (/shop2/skin-skin11) 또는 (/skin-skin11)
  const m = location.pathname.match(/(\/(?:shop\d+\/)?skin-[^/]+)(?:\/|$)/);
  const skinPath = m ? m[1] + '/' : '/';

  const fullPath = `${skinPath}24d/add_part/list_lookbook.html?cate_no=${cateNo}`;

  $lookbookLinks.attr('href', fullPath);
}

});