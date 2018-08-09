var protocolStr = document.location.protocol;  //判断https,https协议
var ctx = protocolStr+"//"+ window.location.host;

/*
 * 发布显示
 */
$(".actions").find(".publish").click(function (e) {
	$(".actions_cont").show();
	return false;
})

$(".actions_cont").find("a").hover(function () {
	$(this).css("background","#e5e5e5").siblings().css("background","none");
},function(){
	$(this).css("background","none");
})

$("body").click(function () {
	$(".actions_cont").hide();
})

/*
 * 分页
 */
$(".paging").createPage(function(n){
	console.log(n);
},{
	showTurn:false,
	showSumNum:false
});



/*
 * 回到顶部
 */
$("#goTop").click(function () {
	$("html,body").animate({scrollTop:0}, 300);
})