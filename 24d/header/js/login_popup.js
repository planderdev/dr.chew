
$(function() {
	/* 로그인폼 placeholder 추가 */
	if ($('.xans-member-login').val() != undefined) {
		$('.login_popup #member_passwd').attr('placeholder', '비밀번호');
        $('.login_popup #member_id').attr('placeholder', '아이디');
	}

	/* 비회원 주문조회페이지 placeholder 추가 */
	setTimeout(function(){
		if ($('.xans-myshop-orderhistorynologin').val() != undefined) {
			$('.login_popup #order_name').attr('placeholder', '주문자명');
			$('.login_popup #order_id').attr('placeholder', '주문번호(하이픈(-) 포함)');
			$('.login_popup #order_password').attr('placeholder', '비회원주문 비밀번호');
		}
	}, 100);
    
});