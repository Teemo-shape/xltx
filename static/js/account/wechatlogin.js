
var code = getUrlParam("code");
var state = getUrlParam("state");

$.ajax({
	url: ctx + "/user/wechat/login?code=" + code + "&state=" + state,
	type: "GET",
	async: false,
	cache: false,
	dataType: "json",
	contentType: "application/json;charset=utf-8",
	success: function(data) {
		if(data.res && data.res == "s"){
			//登录成功
			var lastUrl= getUrlParam('redirect_uri');
			if(lastUrl)
				window.location.href = lastUrl;
			else
				window.location.href = ctx + "/account/index.html"; 
		}else{
			window.location.href = ctx + '/account/login.html?msg=' + encodeURI(encodeURI(data.msg));
		}
	},
	error: function(xhr, status, et) {
		window.location.href = state + "?msg=" + encodeURI(encodeURI("绑定邮箱失败，请重试一次!"));
	}
});

