$(function () {
    if (typeof EC_SHOP_MULTISHOP_SHIPPING === 'undefined') return;

    var useCountry  = EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingCountrySelection;
    var useLanguage = EC_SHOP_MULTISHOP_SHIPPING.bMultishopShippingLanguageSelection;

    // 둘 중 하나라도 true 이면 버튼 노출
    if (useCountry === true || useLanguage === true) {
        $('#multishop_btn').css('display', 'flex');
    } else {
        $('#multishop_btn').hide();
    }


    $('#multishop_btn').on('click', function (e) {
        e.preventDefault(); // a 태그일 경우 대비

        $('.xans-layout-multishopshipping').toggle();
    });


});