$(function(){

    var list_tab_box = $('#list_tab_box'),
        list_tab_pd = $('#list_tab_pd'),
        list_tab_length = list_tab_pd.children('.ec-base-product').length;
    
    
    if(list_tab_length == 0){
        list_tab_box.css('display','none');
    }else{
        list_tab_box.css('opacity','1');
    }
    
    if(list_tab_length == 1){
        $('#list_tab_bt span:nth-child(2)').css('display','none');
        $('#list_tab_bt span:nth-child(3)').css('display','none');
        $('#list_tab_bt span:nth-child(4)').css('display','none');
    }else if(list_tab_length == 2){
        $('#list_tab_bt span:nth-child(3)').css('display','none');
        $('#list_tab_bt span:nth-child(4)').css('display','none');
    }else if(list_tab_length == 3){
        $('#list_tab_bt span:nth-child(4)').css('display','none');
    }
    
    
    
    $('#list_tab_box .ec-base-product:nth-child(1)').addClass('tab_on').fadeIn(700);
    $('#list_tab_bt span:nth-child(1)').addClass('tab_on');
    
    
    
	$('#list_tab_bt span:nth-child(1)').click( function() {
    	if( $('#list_tab_box .ec-base-product:nth-child(1)').hasClass('tab_on') ){
        	return 0;   
        }else{
            $('#list_tab_bt span').removeClass('tab_on');
            $(this).addClass('tab_on');
            $('#list_tab_box .ec-base-product.tab_on').removeClass('tab_on').fadeOut(700);
            $('#list_tab_box .ec-base-product:nth-child(1)').addClass('tab_on').fadeIn(700);
        }
    });
    
    
    
	$('#list_tab_bt span:nth-child(2)').click( function() {
    	if( $('#list_tab_box .ec-base-product:nth-child(2)').hasClass('tab_on') ){
        	return 0;   
        }else{
            $('#list_tab_bt span').removeClass('tab_on');
            $(this).addClass('tab_on');
            $('#list_tab_box .ec-base-product.tab_on').removeClass('tab_on').fadeOut(700);
            $('#list_tab_box .ec-base-product:nth-child(2)').addClass('tab_on').fadeIn(700);
        }
    });
    
    
    
	$('#list_tab_bt span:nth-child(3)').click( function() {
    	if( $('#list_tab_box .ec-base-product:nth-child(3)').hasClass('tab_on') ){
        	return 0;   
        }else{
            $('#list_tab_bt span').removeClass('tab_on');
            $(this).addClass('tab_on');
            $('#list_tab_box .ec-base-product.tab_on').removeClass('tab_on').fadeOut(700);
            $('#list_tab_box .ec-base-product:nth-child(3)').addClass('tab_on').fadeIn(700);
        }
    });
    
    
    
	$('#list_tab_bt span:nth-child(4)').click( function() {
    	if( $('#list_tab_box .ec-base-product:nth-child(4)').hasClass('tab_on') ){
        	return 0;   
        }else{
            $('#list_tab_bt span').removeClass('tab_on');
            $(this).addClass('tab_on');
            $('#list_tab_box .ec-base-product.tab_on').removeClass('tab_on').fadeOut(700);
            $('#list_tab_box .ec-base-product:nth-child(4)').addClass('tab_on').fadeIn(700);
        }
    });
    
    
    
    
//자동플레이
    

	var playListTab = setInterval(function() {
        
        var now_list_bt =$('#list_tab_bt .tab_on').index()+1,
        	next_list_bt = now_list_bt+1,
        	list_tab_length_1 = list_tab_length+1;
        
        if(next_list_bt==list_tab_length_1){   
            next_list_bt = 1;
            $('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
            return false;
        }else{
            $('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
            return false;
        }

	}, 4000);
    
    
//마우스오버시 멈춤후 재시작
    
	$("#list_tab_box .ec-base-product").hover(function(){

		clearInterval(playListTab);

	}, function(){

		playListTab = setInterval(function() {
        
        	var now_list_bt =$('#list_tab_bt .tab_on').index()+1,
        		next_list_bt = now_list_bt+1,
        	list_tab_length_1 = list_tab_length+1;
        
        	if(next_list_bt==list_tab_length_1){   
            	next_list_bt = 1;
            	$('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
                return false;
        	}else{
            	$('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
                return false;
        	}
            
		}, 4000);

	});
    
    
	$("#list_tab_box #list_tab_bt").hover(function(){

		clearInterval(playListTab);

	}, function(){

		playListTab = setInterval(function() {
        
        	var now_list_bt =$('#list_tab_bt .tab_on').index()+1,
        		next_list_bt = now_list_bt+1,
        	list_tab_length_1 = list_tab_length+1;
        
        	if(next_list_bt==list_tab_length_1){   
            	next_list_bt = 1;
            	$('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
                return false;
        	}else{
            	$('#list_tab_bt span:nth-child('+next_list_bt+')').trigger("click");
                return false;
        	}
            
		}, 4000);

	});
    
    
    
});
                  
                  


