// 是否有错误信息
var msg = getUrlParam("msg");

//显示绑定失败
if (msg) {
	alert(decodeURI(msg),{
		theme: "danger"
	});
}

// 获取输入框提示
createObj();

//点击登录
$(".login").click(function () {
	go_next();
});

/**
 * 登录
 */
function go_next() {
	$(".login").attr("disabled","disabled");
	var post_container={
		account:$('#account').val(),
		password:$('#pwd').val()
	}
	$.ajax({
		url: ctx + "/user/login",
		type:"POST",
		data: JSON.stringify(post_container),
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				var before_login = getCookie("before_login");
				localStorage.setItem("login",$("#account").val());
				if (before_login) {
					delCookie("before_login");
					location.href = before_login;
				} else {
					location.href = ctx + '/account/index.html';
				}
				
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				$(".login").removeAttr("disabled");
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".login").removeAttr("disabled");
		}
	});
}

// 微信二维码和账号切换
$(".switch").click(function () {
	$(this).attr("disabled","disabled");
	if($(this).hasClass("wechat")){
		$(this).removeClass("wechat").addClass("account");
		$(".account_cont").hide();
		$(".wechat_cont").show();
		var before_login = getCookie("before_login");
		localStorage.setItem("login",$("#account").val());
		if (before_login) {
			delCookie("before_login");
			initQr("login_container", "/account/wechatlogin.html", before_login);
		} else {
			initQr("login_container", "/account/wechatlogin.html", ctx + '/account/index.html');
		}
	}else if ($(this).hasClass("account")) {
		$(this).removeClass("account").addClass("wechat");
		$(".account_cont").show();
		$(".wechat_cont").hide();
	}
	$(this).removeAttr("disabled");
});
