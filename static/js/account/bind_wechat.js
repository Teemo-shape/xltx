var code = getUrlParam("code");
var state = getUrlParam("state");

$.ajax({
	url: ctx + "/member/bindwechat/index?code=" + code + "&state=" + state,
	type: "GET",
	async: false,
	cache: false,
	dataType: "json",
	contentType: "application/json;charset=utf-8",
	success: function(data) {
		if(data.res && data.res == "s"){
			window.location.href = ctx + "/company/member_info.html"; 
		}else if (data.res && data.res == "f") {
			window.location.href = state + "?msg=" + encodeURI(encodeURI(data.msg));
		}
	},
	error: function(xhr, status, et) {
		console.log(et);
		window.location.href = state + "?msg=" + encodeURI(encodeURI("绑定微信失败，请重试一次!"));
	}
});