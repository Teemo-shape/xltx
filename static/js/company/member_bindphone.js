// 获取输入框提示
createObj();

// 发送验证码
$(".get_phone_card").click(function () {
	$(this).attr("disabled","disabled");
	sendCode();
	$(this).removeAttr("disabled");
});

/*
 * 发送短信验证码
 */
function sendCode () {
	var phone = $("#phone").val();
	$.ajax({
		url: ctx + "/user/send/sms/" + phone,
		type:"post",
		dataType:"json",
		async:false,
		cache:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (handleResponseData(data)) {
				if (data.res=="s" && data.TIME) {
					smsTimer($(".get_phone_card"),data.TIME);
				} else if (data.res=="f" && data.msg){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				} 
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
		}
	})
}

// 提交手机号
$(".submit").click(function () {
	go_next();
})

/**
 * 提交手机号
 */
function go_next() {
	$(".submit").attr("disabled","disabled");

	var vo = {
		mobile: $("#phone").val(),
		sms_code: $("#code").val()
	};
	$.ajax({
		url: ctx + "/member/bindedit/phone?form_token=" + form_token,
		type:"post",
		dataType:"json",
		data: JSON.stringify(vo),
		async:false,
		cache:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (handleResponseData(data)) {
				if (data.res=="s") {
					location.href = ctx + "/company/member_bindphone_sus.html";
				} else if (data.res=="f"){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
					$(".submit").removeAttr("disabled");
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".submit").removeAttr("disabled");
		}
	})
}

/*
 * 手机号是否注册
 * @param _input 特定的输入框对象
 */
function hasRegister (_input) {
	var flag = false;
	var phone = $("#phone").val();
	$.ajax({
		url: ctx + '/user/mobile/exist/' + phone,
		type:"GET",
		dataType:"json",
		async:false,
		cache:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				if (data.data=="0") {
					flag = true;
				}else if (data.data="1") {
					_input.msg_index = MSG_INDEX.Unavailable;
					_input.arr_msg[MSG_INDEX.Unavailable] = "该手机号已被占用";
					flag = false;
				}
			} else if (data.res=="f"){
				_input.msg_index = MSG_INDEX.Unavailable;
				_input.arr_msg[MSG_INDEX.Unavailable] = data.msg;
				flag = false;
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			_input.msg_index = MSG_INDEX.NetWorkError;
			_input.arr_msg[MSG_INDEX.NetWorkError] = "网络异常，请重试一次";
			flag = false;
		}
	})
	return flag;
}

