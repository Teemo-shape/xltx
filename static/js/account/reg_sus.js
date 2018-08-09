var msg = getUrlParam("msg");

//显示绑定失败
if (msg) {
	alert(decodeURI(msg),{
		theme: "danger"
	});
}

//hover效果
$(".a_hover").hover(function () {
	$(this).css({"color":"#666","border-bottom":"1px solid #000"});
},function () {
	$(this).css({"color":"#999","border-bottom":"1px solid #999"});
});

//二维码
initQr("wechat_content", "/account/bind_wechat.html", "/account/reg_sus.html");

//点击显示二维码
$(".wechat").click(function () {
	$(".wechat_bg").show();
});

//隐藏二维码
$(".delete_bg").click(function () {
	$(".wechat_bg").hide();
})