//点击密保重置
$(".question").click(function () {
    $.ajax({
        url: ctx + "/user/login",
		type:"POST",
		data: JSON.stringify(post_container),
		async:false,
		cache:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (data) {
			if (data.res=="s") {
				//模拟登录
				localStorage.setItem("login",$("#account").val());
				if (document.referrer && (location.href != location.referrer) ) {
					location.href = document.referrer;
				} else {
					location.href = ctx + '/account/index.html';
				}
				
			} else if (data.res=="f"){
				alert(data.msg, {
					theme: "danger"
				});
				$(".login").removeAttr("disabled");
			} 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("网络异常，请重试一次", {
				theme: "danger"
			});
			$(".login").removeAttr("disabled");
		}
    })
});