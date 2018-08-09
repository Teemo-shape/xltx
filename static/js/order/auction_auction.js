
/*
 * 放大镜
 */
$(".tb_zoom").imagezoom();

$("#thumblist li a").click(function(){
	$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
	$(".tb_zoom").attr('src',$(this).find("img").attr("mid"));
	$(".tb_zoom").attr('rel',$(this).find("img").attr("big"));
});

/*
 * table切换
 */
$(".table_btn").click(function () {
	$(this).addClass("active").siblings().removeClass("active");
	var name = $(this).attr("data-tabid");
	$(name).addClass("active").siblings().removeClass("active");
	var nLeft = 222*$(this).index();
	$(".tab_trigger").find(".border").animate({left:nLeft},"normal");
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



/*
 * 我要咨询
 */
$(".seekAdvice").click(function () {
	$(".write_advice").show();
});
$(".write_advice").find(".cancle").click(function () {
	$(".write_advice").hide();
});