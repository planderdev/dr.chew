/*
    게시판 롤링
*/
$.fn.boardVerSlide = function (settings) {
    settings = $.extend({
        view : 5,
        direction : 'up',
        delay : 5000
    }, settings);
    var option = [];
    option = $.extend({}, $.fn.boardVerSlide.defaults, settings);
    return this.each(function () {
        $.fn.extend(this, boardVerSlide);
        this.wrap = $(this);
        this.option = option;
        this.direction = this.option.direction;
        this.delay = this.option.delay;
        this.view = this.option.view;
        this.init();
    });
};
var boardVerSlide = {
    init : function(){
        var direction = this.direction;
        var delay = this.delay;
        var table = this.wrap.find('table');
        var tbody = table.find('> tbody');
        var view = this.view;
        var tableHeight = table.outerHeight();
        var trLength = tbody.find('> tr').length;
        var trHeight = tbody.find('> tr').outerHeight();
        var boardVerSlideAreaHeight = trHeight * view;
        table.wrap('<div class="boardVerSlideArea" style="height:'+ boardVerSlideAreaHeight +'px;" />');
        table.wrap('<div class="list" />');
        var boardVerSlideArea = this.wrap.find('.boardVerSlideArea');
        var list = this.wrap.find('.list');
        table.find('caption').remove();
        table.find('thead').remove();
        if ($.browser.webkit) {
            var tdBorderBottom = parseInt(tbody.find('tr > td').css('border-bottom-width'));
            var padddingBottom = (view * tdBorderBottom) + 1;
            boardVerSlideArea.css({'paddingBottom': padddingBottom + 'px'});
        }
        function action() {
            switch(direction){
                case "up":
                    var item = tbody.find('> tr:first-child');
                    var itemClone = item.clone();
                    tbody.append(itemClone);
                    if ($.browser.opera || $.browser.webkit) {
                        list.css({'marginTop':'-1px'});
                    }
                    list.css({'top':0}).animate({'top': '-' + trHeight +'px'}, function(){
                        list.css({'top': 0});
                        item.remove();
                    });
                break;
                case "down":
                    var item = tbody.find('> tr:last-child');
                    var itemClone = item.clone();
                    tbody.prepend(itemClone);
                    list.css({'bottom':0}).animate({'bottom': '-' + trHeight +'px'}, function(){
                        list.css({'bottom': 0});
                        item.remove();
                    });
                break;
            }
        }
        var timer;
        var timerStart = function(){
            timer = setInterval(function(){
                action();
            },delay );
        }
        timerStart();
        this.wrap.mouseenter(function(){
            clearTimeout(timer);
        });
        this.wrap.mouseleave(function(){
            timerStart();
        });
    }
}
$(function(){
    /*
        메인 > 자유 게시판 롤링 옵션 설정
        - direction : up(위로)
        - delay : 타이머(기본 5초 == 5000)
        - view : 보여질 개수
    */
    $("#boardVerticalSlide_1").boardVerSlide({
        direction : 'up',
        delay : 3000,
        view : 1
    });
});