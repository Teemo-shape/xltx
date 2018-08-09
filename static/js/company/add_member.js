
// 获取输入框提示
createObj();

// 发送邀请邮件
$(".submit").click(function () {
	go_next();
});

function go_next() {
	$(".submit").attr("disabled","disabled");
	
	var vo = {
		ids_permission: $("#authority").val().split("-"),
		email: $("#email").val()
	};
	$.ajax({
    	url: ctx + '/manager/add/member?form_token=' + form_token + "&redirectPath=" + encodeURI(ctx + "/company/invite_member.html"),
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(vo),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
	    		if (data.res=="s") {
					form_token = data.form_token;
					$(".fail_tip").html('<i class="iconfont">&#xe602;</i>邮件发送成功，即将自动返回内部成员列表').css("visibility","visible").addClass("sussess_tip");
					setTimeout(function () {
						location.href = ctx + "/company/member_index.html";
					},3000);
				} else if (data.res=="f"){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
					form_token = data.form_token;
					$(".submit").removeAttr("disabled");
				} 
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible").removeClass("sussess_tip");
			$(".submit").removeAttr("disabled");
		}
	})
	$(".submit").removeAttr("disabled");
}