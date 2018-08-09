
/*
 * 放大镜
 */
$(".tb_zoom").imagezoom();

$(".thumb_item").click(function(){
	$(this).addClass("tb-selected").siblings().removeClass("tb-selected");
	$(".tb_zoom").attr('src',$(this).find("img").attr("mid"));
	$(".tb_zoom").attr('rel',$(this).find("img").attr("big"));
});


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