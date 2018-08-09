
// 获取输入框提示
createObj();

// 发送验证邮箱
$(".send_mail").click(function () {
	go_next();
})

// 再次发送
$(".send_again").click(function () {
	$(this).attr("disabled","disabled");
	sendAgain();
	$(this).removeAttr("disabled");
});

function go_next() {
	$(".send_mail").attr("disabled","disabled");
	var email = $("#email").val();
	$.ajax({
    	url: ctx + '/member/send/' + email + "/index?redirectPath=" + encodeURI(ctx + "/company/bind_mail.html"),
    	type:"get",
    	async:false,
		cache:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
	    		if (data.res=="s") {
					var reg =  /(.{2}).+(.{2}@.+)/g;
					var str = email.replace(reg, "$1****$2");
					$(".mail_number").text(str);
					$(".notice").html('<i class="iconfont">&#xe602;</i>邮件发送成功,请点击邮件中的链接完成验证！').css("visibility","visible").addClass("sussess_tip");
	    			$(".mail_first").removeClass("active");
					$(".mail_second").addClass("active");
					smsTimer($(".send_again"),10);
				} else if (data.res=="f"){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
					$(".send_mail").removeAttr("disabled");
				} 
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
			$(".send_mail").removeAttr("disabled");
		}
	})
}

/**
 * 发送邮箱
 */
function sendAgain () {
	var mail = $("#email").val();
	$.ajax({
    	url: ctx + '/member/send/' + mail + "/index?redirectPath=" + encodeURI(ctx + "/company/bind_mail.html"),
    	type:"get",
    	async:false,
		cache:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
	    		if (data.res=="s") {
					$(".notice").html('<i class="iconfont">&#xe602;</i>邮件发送成功,请点击邮件中的链接完成验证！').css("visibility","visible").addClass("sussess_tip");
					smsTimer($(".send_again"),10);
				} else if (data.res=="f"){
					$(".notice").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
				} 
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".notice").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible").removeClass("sussess_tip");
		}
	})
}
