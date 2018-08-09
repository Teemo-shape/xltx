// 获取输入框提示
createObj();

//验证账号
$(".send_next").click(function () {
	go_next();
});

function go_next() {
	$(".send_next").attr("disabled","disabled");
	var account = $("#account").val();
	account = encodeURI(account);
	$.ajax({
		url:ctx + "/user/exist?account=" + account,
		type:"get",
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				//点击密保重置
				$.ajax({
					url: ctx + "/user/reset/psw/security/get/question?account=" + account,
					type:"get",
					async:false,
					cache:false,
					dataType: "json",
					contentType: "application/json;charset=utf-8",
					success:function (result) {
						if (result.res=="s") {
							location.href = ctx + "/account/security_second.html?account=" + account;
						} else if (result.res=="f"){
							$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + result.msg).css("visibility","visible");
						}
						$(".send_next").removeAttr("disabled");
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
						$(".send_next").removeAttr("disabled");
					}
				})
				
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				$(".send_next").removeAttr("disabled");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".send_next").removeAttr("disabled");
		}
	})
}