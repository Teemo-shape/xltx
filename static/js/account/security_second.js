// 获取输入框提示
createObj();

var account = getUrlParam("account");
var uid;

//获取密保问题
$.ajax({
	type:"get",
	url: ctx + "/user/reset/psw/security/get/question?account=" + account,
	async:false,
	cache:false,
	dataType: "json",
	contentType: "application/json;charset=utf-8",
	success:function (data) {
		if (data.res=="s") {
			uid = encodeURI(data.uid);
			$.each(data.questions,function (index,question) {
				$(".question").find(".info_value").eq(index).text(question.question_detail).attr("question_id",question.question_id);
			});
		} else if (data.res=="f"){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
		}
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
	}
})

// 提交密保答案
$(".send_next").click(function () {
	go_next();
})

function go_next() {
	$(".send_next").attr("disabled","disabled");

	var dataObj = [];
	$(".question").find(".info_value").each(function () {
		var obj = {};
		obj["question_id"] = $(this).attr("question_id");
		obj["question_detail"] = $(this).text();
		obj["answer_detail"]  = $(this).parents(".question").next().find(".info_value").val();
		dataObj.push(obj);
	});
	
	$.ajax({
		type:"post",
		url: ctx + "/user/reset/psw/valid/security?uid=" + uid,
		data: JSON.stringify(dataObj),
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				location.href = ctx + "/account/security_third.html?uid=" + uid;
			} else if (data.res=="f"){
				$(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
				$(".send_next").removeAttr("disabled");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".send_next").removeAttr("disabled");
		}
	});
}