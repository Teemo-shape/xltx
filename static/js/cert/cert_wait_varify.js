//初始化信息
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
					if (result.cert.identify_state == 2) {	//等待确认金额
						$(".card_id").text(result.cert.bank_card_id)
					} 
					if (result.cert.identify_state == 1) {
						var oDate = new Date().getTime();
						if (result.cert.at_ltm_expired) {
							if (oDate >= result.cert.at_ltm_expired) {
								location.href = ctx + "/cert/cert_conf_amount.html";
								return;
							}
						} 
						location.href = ctx + "/cert/cert_apply.html";
					} 
					if (result.cert.identify_state == 4) {	//认证通过
						location.href = ctx + "/cert/cert_pass.html";
					}
					if (result.cert.identify_state == 3 || result.cert.identify_state == -1 || result.cert.identify_state == -2 || result.cert.identify_state == -3) {
						location.href = ctx + "/cert/cert_conf_amount.html";
					}
				}
			}
		}	
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		alert("网络异常，请重试一次", {
			theme: "danger"
		});
		console.log(errorThrown);
	}
});


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