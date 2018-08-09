//加载密保问题
$.ajax({
	url: ctx + '/member/get/security',
	type:"get",
	async:false,
	cache:false,
	dataType: "json",
	contentType: "application/json;charset=utf-8",
	success:function (data) {
		if (handleResponseData(data)) {
			if (data.res == "s") {
				if (data.user_questions) {
					for (let index = 0; index < data.user_questions.length; index++) {
						const element = data.user_questions[index];
                        $(".select").eq(index).text(element.question_detail).attr("id",element.question_id);	
						$("#security_answer"+index).val(element.answer_detail);
					}
				}
			} else if (data.res == "f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
			} 
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible").removeClass("sussess_tip");
	}
})

// 获取输入框提示
createObj();

// 保存密保
$(".submit").click(function () {
	go_next();
})

function go_next () {
	$(".submit").attr("disabled","disabled");
	var vo = [
		{
			question_id: $(".select").eq(0).attr("id"),
			answer_detail: $("#security_answer0").val()
		},
		{
			question_id: $(".select").eq(1).attr("id"),
			answer_detail: $("#security_answer1").val()
		},
		{
			question_id: $(".select").eq(2).attr("id"),
			answer_detail: $("#security_answer2").val()
		}
	]
	$.ajax({
    	url: ctx + '/member/update/security?form_token=' + form_token,
    	type:"POST",
    	async:false,
		cache:false,
		data: JSON.stringify(vo),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
    	success:function (data) {
    		if (handleResponseData(data)) {
    			if (data.res=="s") {
					$(".fail_tip").html('<i class="iconfont">&#xe602;</i>设置密保成功!').css("visibility","visible").addClass("sussess_tip");
	    			setTimeout(function () {
	    				location.href = ctx + "/company/member_info.html";
	    			},2000);
				} else if (data.res=="f"){
					$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
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