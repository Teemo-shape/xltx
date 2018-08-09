
/*
 * 加载头部
 */
$("header").load("header.html");

/*
 * 测试支付后跳转
 */
$(".pay_btn").click(function () {
	location.href="auction_process_fourth.html";
})