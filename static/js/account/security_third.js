// 获取输入框提示
createObj();

//重置密码
$(".submit").click(function () {
	go_next();
})

function go_next() {
	var uid = getUrlParam("uid");
	var vo = {
		uid: uid,
		password: $("#pwd").val(),
		password1: $("#pwd2").val()
	};
	
	$.ajax({
    	url: ctx + '/user/reset/psw?form_token=' + form_token,
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(vo),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (data.res=="s") {
				location.href = ctx + "/account/security_success.html";
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				$(".submit").removeAttr("disabled");
			}
    	},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".submit").removeAttr("disabled");
		}
	})
}