/*
 * table切换
 */
$(".table_btn").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	var name = $(this).attr("data-tabid");
	console.log(name);
	$(name).addClass("active").siblings().removeClass("active");
	var nLeft = 222*$(this).index();
	$(".tab_trigger").find(".border").animate({left:nLeft},"normal");
});



//滚动菜单
var set_arrow = null;
var canScroll = true;
$(window).scroll(function () {
	var liid = 0;
	clearTimeout(set_arrow);
	$('.arrow').stop(true);
	set_arrow = setTimeout(function () {
		if (shouldShow()) {
			$(".side-catalog").show();
			//滚动时计算
			$('.skip').each(function () {
				var flag = true;
				if ($(this).offset().top < $(document).scrollTop() + 100) {
					if (flag) {
						liid = $(this).attr('id');
						flag = false;
					}
				}
			});
			if (canScroll && Boolean(liid)) {
				//调整箭头位置
				var top = $("[href='#" + liid + "']").offset().top - $('.side-catalog').offset().top - 54 + $(".catalog-list").scrollTop();
				$('.arrow').animate({
					'top': top
				});
			}
		} else {
			var top = $("[href='#2_1']").offset().top - $('.side-catalog').offset().top - 54 + $(".catalog-list").scrollTop();
			$('.arrow').animate({
				'top': top
			},0,function () {
				$(".side-catalog").hide();
			});
		}
	}, 50);
});


//判断目录出现和消失
function shouldShow () {
	var scrollH = $(window).scrollTop(),
		winH = $(window).height(),
		top = $("#2_1").offset().top;
	if(top < scrollH + 100){
  		return true;
  	}else{
  		return false;
  	}
}