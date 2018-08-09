
/*
 * 加载头部
 */
$("header").load("header.html");

/*
 * 省市县三级联动
 */
$("#distpicker1").distpicker({
  	autoSelect: false
});
$("#distpicker2").distpicker({
  	autoSelect: false
});

/*
 * 下一步测试
 */
$(".next_page").hover(function () {
	$(this).css("background","#fa5400");
},function () {
	$(this).css("background","#d1d1d1");
}).click(function () {
	location.href="settlement_second.html";
})


/*
 * 配送自提切换
 */
$(".tab_delivery").find(".button").click(function () {
	$(this).find("i").addClass("active");
	console.log($(this).siblings());
	$(this).siblings().find("i").removeClass("active");
	var name = $(this).attr("data-tabid");
	$(name).addClass("active").siblings().removeClass("active");
})

/*
 * 遮罩层
 */
$(".select_area").click(function () {
	$(".bg").show();
	$(".mask_layer").show();
})

$(".bg").click(function () {
	$(".bg").hide();
	$(".mask_layer").hide();
})
$(".mask_layer").find(".delete").click(function () {
	$(".bg").hide();
	$(".mask_layer").hide();
	return false;
})