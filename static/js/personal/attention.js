
/*
 * table切换
 */
$(".tab_item").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	var name = $(this).attr("data-tabid");
	$(name).addClass("active").siblings().removeClass("active");
	var nLeft = 141*$(this).index();
	$(".border_top").animate({left:nLeft},"normal");
	$(".border_bottom").css("left",nLeft);
});


/*
 * 分页
 */
$(".paging").createPage(function(n){
	console.log(n);
},{
	showTurn:false,
	showSumNum:false
});


