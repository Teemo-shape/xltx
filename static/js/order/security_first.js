/*
 * 获取输入框提示
 */
createObj();

$(".send_next").click(function () {
	$(this).attr("disabled","disabled");
	//TODO 下行为真实提交，ajax仅为模拟数据
//	$(".container").submit();
	$.ajax({
		url:"/user/account/isRegister",
		type:"POST",
		data:$(".container").serialize(),
		cache:false,
		success:function (data) {
			if (data.RES=="SUCCESS") {
				location.href = "/views/domain/security_second.html";
			} else if (data.RES=="FAIL"){
				$(".fail_tip").text(data.MSG);
				$(".send_next").removeAttr("disabled");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").text("网络异常，请重试一次");
			$(".send_next").removeAttr("disabled");
		}
	})
});