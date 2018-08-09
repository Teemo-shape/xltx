
// 获取输入框提示
createObj();

//点击重置密码
$(".submit").click(function () {
	go_next();
})

function go_next() {
	$(".submit").attr("disabled","disabled");
	var dataObj = {
		uid: getUrlParam("uid"),
		password: $("#pwd").val(),
		password1: $("#pwd2").val()
	};

	$.ajax({
    	url: ctx + '/user/reset/psw?form_token=' + form_token,
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(dataObj),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (data.res=="s") {
				location.href = ctx + "/account/email_reset_sus.html";
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				form_token = data.form_token;
				$(".submit").removeAttr("disabled");
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".submit").removeAttr("disabled");
		}
	})
}