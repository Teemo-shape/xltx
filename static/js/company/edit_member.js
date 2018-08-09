
// 获取输入框提示
createObj();

// 提交数据
$(".submit").click(function () {
	$(this).attr("disabled","disabled");
	var vo = {
		ids_permission: $("#authority").val().split("-"),
		uid: getUrlParam("uid")
	}
	$.ajax({
    	url: ctx + '/manager/edit/member?form_token=' + form_token,
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(vo),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
	    		if (data.res=="s") {
					$(".fail_tip").html('<i class="iconfont">&#xe602;</i>修改权限成功，即将自动返回内部成员列表').css("visibility","visible").addClass("sussess_tip");
					setTimeout(function () {
						location.href = ctx + "/company/member_index.html";
					},3000);
				} else if (data.res=="f"){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
					form_token = data.form_token;
					$(".send_mail").removeAttr("disabled");
				} 
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".send_mail").removeAttr("disabled");
		}
	})
	$(this).removeAttr("disabled");
})