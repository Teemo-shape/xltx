// 获取输入框提示
createObj();

// 发送验证码
$(".get_phone_card").click(function () {
	sendSmsCode();
})

/*
 * 发送短信验证码
 */
function sendSmsCode () {
	var phone = $("#phone").val();
	var _that = $(this);
	$.ajax({
		url: ctx + "/user/send/sms/" + phone,
		type:"GET",
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s" && data.time) {
				smsTimer($(".get_phone_card"),data.time);
			} else if (data.res=="f" && data.msg){
				alert(data.msg, {
					theme: "danger"
				});
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("网络异常，请重试一次", {
				theme: "danger"
			});
		}
	})
}


// 点击找回密码
$(".retrieve").click(function () {
	go_next();
});

function go_next() {
	$(".retrieve").attr("disabled","disabled");
	var mobile = $("#phone").val();
	var sms_code = $("#code").val();
	var dataObj = {
		"mobile" : mobile,
		"sms_code" : sms_code
	}

	$.ajax({
		url: ctx + "/user/reset/psw/valid/mobile",
		type:"POST",
		data: JSON.stringify(dataObj),
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				location.href = ctx + "/account/phone_reset_psd.html?uid=" + data.uid;
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				$(".retrieve").removeAttr("disabled");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".retrieve").removeAttr("disabled");
		}
	})
}

/**
 * 手机号检测是否注册
 */
function checkIsRegister (_input) {
	var flag = false;
	var phone = $("#phone").val();
	$.ajax({
		url: ctx + '/user/mobile/exist/' + phone,
		type:"GET",
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				if (data.data=="1") {
					flag = true;
				}else if (data.data="0") {
					_input.msg_index = MSG_INDEX.Unavailable;
					_input.arr_msg[MSG_INDEX.Unavailable] = "该手机号尚未注册";
					flag = false;
				}
			} else if (data.res=="f"){
				$(".phone_fail").text(data.msg);
				flag = false;
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			_input.msg_index = MSG_INDEX.Unavailable;
			_input.arr_msg[MSG_INDEX.Unavailable] = data.msg;
			flag = false;
		}
	})
	return flag;
}

