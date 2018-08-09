//请求ajax,设置全局对象form_token
isPermitted(ctx+'/user/register')


// 获取输入框提示
createObj();

// 发送验证码
$(".get_phone_card").click(function () {
    sendCode();
});


// 注册
$(".register").click(function () {
    go_next();
});

function go_next() {
    $(".register").attr("disabled", "disabled");
    var post_register = {
        "mobile": $('#phone').val(),
        "sms_code": $('#code').val(),
        "password": $('#pwd').val(),
        "password1": $('#pwd2').val()
    }
    $.ajax({
        url: ctx + "/user/register?form_token=" + form_token,
        type: "POST",
        data: JSON.stringify(post_register),
        async: false,
        cache: false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.res == "s") {
                location.href = ctx + "/account/reg_sus.html";
            } else if (data.res == "f") {
                $(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
                $(".register").removeAttr("disabled");
                form_token = data.form_token;
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
            $(".register").removeAttr("disabled");
        }
    });
}

/**
 * 检测手机号是否注册
 * @param {Object} _input 特定的input对象
 */
function checkIsRegister(_input) {
    var phone = $("#phone").val();
    var res = false;

    $.ajax({
        url: ctx + '/user/mobile/exist/' + phone,
        type: "GET",
        async: false,
        cache: false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.res == "s") {
                if (data.data == "1") {
                    _input.msg_index = MSG_INDEX.Unavailable;
                    _input.arr_msg[MSG_INDEX.Unavailable] = "手机号已注册";
                    res = false;
                } else if (data.data == "0") {
                    res = true;
                }
            } else if (data.res == "f") {
                _input.msg_index = MSG_INDEX.Unavailable;
                _input.arr_msg[MSG_INDEX.Unavailable] = data.msg;
                res = false;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            _input.msg_index = MSG_INDEX.NetWorkError;
            _input.arr_msg[MSG_INDEX.NetWorkError] = "网络异常，请重试一次";
            res = false;
        }
    })
    
    return res;

}


/*
 * 发送短信验证码-注册
 */
function sendCode() {
    var phone = $("#phone").val();
    $.ajax({
        url:ctx+ "/user/send/sms/" + phone,
        type: "GET",
        async: false,
        cache: false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data.res == "s" && data.time) {
                smsTimer($(".get_phone_card"), data.time);
            } else if (data.res == "f" && data.msg) {
                alert(data.msg, {
                    theme: "danger"
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络异常，请重试一次", {
				theme: "danger"
			});
        }
    })
}