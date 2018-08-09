/*
 * 获取输入框提示
 */
createObj();

$(".submit").click(function () {
	//TODO 下行为真实提交，ajax仅为模拟数据
//	$(".container").submit();
	$.ajax({
    	url: '/user/account/resetPassword',
    	type:"POST",
    	async:false,
		cache:false,
    	success:function (data) {
    		if (data.RES=="SUCCESS") {
				location.href = "/views/domain/security_success.html";
			} else if (data.RES=="FAIL"){
				$(".fail_tip").text(data.MSG);
				$(".submit").removeAttr("disabled");
			}
    	},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").text("网络异常，请重试一次");
			$(".submit").removeAttr("disabled");
		}
	})
})