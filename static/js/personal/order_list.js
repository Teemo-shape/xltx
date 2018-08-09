
/*
 * label点击变色
 */
$(".label").click(function () {
	$(".label").removeAttr("disabled").removeClass("checked").addClass("unchecked");
	$(this).attr("disabled","disabled").removeClass("unchecked").addClass("checked");
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
 * 回到顶部
 */
$("#goTop").click(function () {
	$("html,body").animate({scrollTop:0}, 300);
})