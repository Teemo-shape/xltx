var msg = getUrlParam("msg");

//显示绑定失败
if (msg) {
	alert(decodeURI(msg),{
		theme: "danger"
	});
}

// 绑定微信
$(".binding_wechat").click(function () {
	$(".wechat_bg").show();
	$("#qr_code").show();
	initQr("qr_code","/account/bind_wechat.html",encodeURI("/company/member_info.html"));
})
$(".wechat_bg").click(function () {
	$("#qr_code").hide();
	$(".wechat_bg").hide();
})

// 消息订阅按钮变色
$("input[type=checkbox]").change(function () {
	$(".save").css({"cursor":"pointer","background":"#fa5400","opacity":"1","filter":"filter:alpha(opacity=1)"}).removeAttr("disabled");
})

// table切换
$(".tab_item").click(function () {
	$(this).attr("disabled","disabled");
	$(this).addClass("active").siblings().removeClass("active");
	var name = $(this).attr("data-tabid");
	$(name).addClass("active").siblings().removeClass("active");
	var nLeft = 141*$(this).index();
	$(".border_top").animate({left:nLeft},"normal");
	$(".border_bottom").css("left",nLeft);
	$(this).removeAttr("disabled");
});

// 多选框
$(".notice_type").find("label").click(function () {
	$(this).attr("disabled","disabled");
	if ($(this).hasClass("unchecked")) {
		$(this).removeClass("unchecked").addClass("checked");
	} else if ($(this).hasClass("checked")){
		$(this).removeClass("checked").addClass("unchecked");
	}
	$(this).removeAttr("disabled");
});
