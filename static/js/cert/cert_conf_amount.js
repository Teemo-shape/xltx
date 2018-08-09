var dead_time;	//截止时间
var has_end = false;	//表示当前时间是否超过指定时间

//初始化截止时间
$.ajax({
	url: ctx + '/cert/state',
	type:"get",
	cache:false,
	async:false,
	dataType: "json",
	contentType: "application/json;charset=utf-8",
	success:function (result) {
		if (handleResponseData(result)) {
			if (result.res=="s") {
				if (result.company) {
					location.href = ctx + "/cert/cert_pass.html";	//认证通过
				}
				if (result.cert) {
					$(".company_name").text(result.cert.company_name);
					$(".bank_id").text(result.cert.bank_card_id);
					if (result.cert.identify_state == -1) {	//被拒
						$(".rejected").show();
					} else if (result.cert.identify_state == -2) {	//失效
						$(".submit_time").text(timestampToTime(result.cert.at_ltm_commit));
						$(".invalid").show();
					} else if (result.cert.identify_state == -3) {	//冻结
						$(".submit_time").text(timestampToTime(result.cert.at_ltm_commit));
						$(".frozen").show();
					} else if (result.cert.identify_state == 4) {	//认证通过
						location.href = ctx + "/cert/cert_pass.html";
					} else if (result.cert.identify_state == 2) {	//等待审核
						location.href = ctx + "/cert/cert_wait_varify.html";
					} else if (result.cert.identify_state == 1) {	//草稿超时
						var current_time = new Date().getTime();
						if (result.cert.at_ltm_expired) {
							if (result.cert.at_ltm_expired <  current_time) {
								$(".overtime").show();
							} else {
								location.href = ctx + "/cert/cert_apply.html";	//草稿页面
							}
						}
					} else if (result.cert.identify_state == 3) {	//等待确认金额
						$(".submit_time").text(timestampToTime(result.cert.at_ltm_commit));
						$("#id").val(result.cert.id);
						//等待金额超时
						dead_time = result.cert.at_ltm_expired;
						//dead_time为0表示没有限制时间
						if (dead_time) {
							$("#time").val(dead_time);
							var current_time = new Date().getTime();
							if (dead_time <=  current_time) {
								$(".invalid").show();
								return;
							} else {
								initTime();
							}
						}
						$(".normal").show();
					} 
				}
			}
		}	
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		$("#msg_money").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').show();
	}
});

// 获取输入框提示
createObj();

// 点击确定
$(".confirm_money").click(function () {
	go_next();
})

/**
 * 提交金额
 */
function go_next () {
	$(".confirm_money").attr("disabled","disabled");
	var id = $("#id").val();
	var money = $("#money").val();
	
	var vo = {};
	vo["id"] = id;
	vo["money_to_verify"] = money;
	
	var postData = JSON.stringify(vo);
	
	$.ajax({
		url: ctx + '/cert/config/money',
		type:"post",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: postData,
		cache:false,
		asyns:false,
		success:function (result) {
			if (handleResponseData(result)) {
				if (result.res=="s") {
					if (result.data) {
						if (result.data.identify_state == 4) {
							location.href = ctx + "/cert/cert_pass.html";
						} else if (result.data.identify_state == -3) {
							$(".submit_time").text(timestampToTime(result.data.at_ltm_commit));
							$(".company_name").text(result.data.company_name);
							$(".normal").hide();
							$(".frozen").show();
						}
					}
				} else if (result.res=="f"){
					$("#msg_money").html('<i class="iconfont">&#xe657;</i>' + result.msg).css("visibility","visible");
				}
				$(".confirm_money").removeAttr("disabled");
			}	
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$("#msg_money").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
			$(".confirm_money").removeAttr("disabled");
		}
	})
}

/**
 * 改变倒计时
 */
function changeTime(){
	var time = $("#time").val();
	var expire = trun_time(time);
	$("#time").val(time);
	$("span.time").text(expire);
}

//自调用倒计时
function initTime(){
	changeTime();
	window.checkMoney = setInterval(changeTime, 1000);
};

/**
 * 时间转化为天时分秒
 * @param {Number} timestamp 时间戳
 */
function trun_time(timestamp) {
	var mss = timestamp - new Date().getTime();
	var count_down = {};
	var timeStr;
	if (mss > 0) {
		count_down.day = parseInt(mss / (1000 * 60 * 60 * 24));
		count_down.hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		count_down.min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		count_down.sec = ((mss % (1000 * 60)) / 1000).toFixed(0);
		timeStr = count_down.day + "天" + count_down.hour + "小时" + count_down.min + "分"	+ count_down.sec + "秒";
	} else {
		$(".normal").hide();
		$(".overtime").show();
		return;
	}
	
	return timeStr;
}

/**
 * 时间戳转化年月日
 * @param {Number} timestamp 13位的时间戳
 */
function timestampToTime(timestamp){
	let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '年';
	let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
	let D = (date.getDate()<10? '0'+date.getDate():date.getDate()) + '日';
	return Y+M+D;
}