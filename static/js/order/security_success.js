
/*
 * 自动跳转
 */
time(10);
function time(num) {
	if (num == 0) {
		location.href="/views/domain/login.html";
	} else {
		$(".num").text(num);
		num--;
		setTimeout(function() {
			time(num);
		}, 1000)
	}
}