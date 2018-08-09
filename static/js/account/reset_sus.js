time(10);

/*
 * 指定秒数后自动跳转登录页面
 * @param {Number} num 
 */
function time(num) {
	if (num == 0) {
		location.href = ctx + "/account/login.html";
	} else {
		$(".num").text(num);
		num--;
		setTimeout(function() {
			time(num);
		}, 1000)
	}
}