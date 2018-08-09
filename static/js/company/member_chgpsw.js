/*
 * 获取输入框提示
 */
createObj();

// 确认提交密码
$(".submit").click(function () {
	go_next();
})

function go_next () {
	$(".submit").attr("disabled","disabled");
	var vo = {
		password: $("#pwd").val(),
		password1: $("#pwd2").val()
	};
	$.ajax({
    	url: ctx + '/member/update/psw?form_token=' + form_token,
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(vo),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
	    		if (data.res=="s") {
					$(".fail_tip").html('<i class="iconfont">&#xe602;</i>' + data.msg).css("visibility","visible").addClass("sussess_tip");
	    			setTimeout(function () {
	    				location.href = ctx + "/company/member_info.html";
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
}