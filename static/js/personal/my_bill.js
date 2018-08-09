
laydate.render({
  elem: '#selectTime', //指定元素
  range: true
});


/*
 * 回到顶部
 */
$("#goTop").click(function () {
	$("html,body").animate({scrollTop:0}, 300);
})