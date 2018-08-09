// 卖单轮播效果
var curIndex1 = 0; //当前index
     // 定时器自动变换2.5秒每次
var autoChange1 = setInterval(function(){ 
    if(curIndex1 < $(".common_product li").length-1){ 
      curIndex1 ++; 
    }else{ 
      curIndex1 = 0;
    }
    //调用变换处理函数
    changeToCommon(curIndex1); 
},2500);

$(".common_product").find("li").each(function (num) {
	$(this).hover(function () {
		clearInterval(autoChange1);
	},function () {
		autoChange1 = setInterval(function(){ 
		    if(curIndex1 < $(".common_product li").length-1){ 
		      curIndex1 ++; 
		    }else{ 
		      curIndex1 = 0;
		    }
		    //调用变换处理函数
		    changeToCommon(curIndex1); 
		},2500);
	})
});

//轮播上下翻页按钮
$(".common_product_btn").hover(function () {
	clearInterval(autoChange1);
},function () {
	autoChange1 = setInterval(function(){ 
	    if(curIndex1 < $(".common_product li").length-1){ 
	      curIndex1 ++; 
	    }else{ 
	      curIndex1 = 0;
	    }
	    //调用变换处理函数
	    changeToCommon(curIndex1); 
	},2500);
});
$("#prevBtn1").click(function () {
	if (curIndex1<=0) {
		curIndex1=$(".common_product li").length-1;
	} else {
		curIndex1--;
	}
	changeToCommon(curIndex1);
});
$("#nextBtn1").click(function () {
	if(curIndex1 < $(".common_product li").length-1){ 
      curIndex1 ++; 
    }else{ 
      curIndex1 = 0;
    }
	changeToCommon(curIndex1);
});

/**
 * 轮播图展现当前页
 * @param {Number} num 当前页序号
 */
function changeToCommon(num){ 
    $(".common_product").find("li").removeClass("active").hide().eq(num).fadeIn().addClass("active");
}

// 另一组卖单轮播
var curIndex2 = 0; //当前index
     // 定时器自动变换2.5秒每次
var autoChange2 = setInterval(function(){ 
    if(curIndex2 < $(".auction_product li").length-1){ 
      curIndex2 ++; 
    }else{ 
      curIndex2 = 0;
    }
    //调用变换处理函数
    changeToAuction(curIndex2); 
},2500);

$(".auction_product").find("li").each(function (num) {
	$(this).hover(function () {
		clearInterval(autoChange2);
	},function () {
		autoChange2 = setInterval(function(){ 
		    if(curIndex2 < $(".auction_product li").length-1){ 
		      curIndex2 ++; 
		    }else{ 
		      curIndex2 = 0;
		    }
		    //调用变换处理函数
		    changeToAuction(curIndex2); 
		},2500);
	})
});

$(".auction_product_btn").hover(function () {
	clearInterval(autoChange2);
},function () {
	autoChange2 = setInterval(function(){ 
	    if(curIndex2 < $(".auction_product li").length-1){ 
	      curIndex2 ++; 
	    }else{ 
	      curIndex2 = 0;
	    }
	    //调用变换处理函数
	    changeToAuction(curIndex2); 
	},2500);
});

$("#prevBtn2").click(function () {
	if (curIndex2<=0) {
		curIndex2=$(".auction_product li").length-1;
	} else {
		curIndex2--;
	}
	changeToAuction(curIndex2);
});

$("#nextBtn2").click(function () {
	if(curIndex2 < $(".auction_product li").length-1){ 
      curIndex2 ++; 
    }else{ 
      curIndex2 = 0;
    }
	changeToAuction(curIndex2);
});

/**
 * 轮播图展现当前页
 * @param {Number} num 当前页序号
 */
function changeToAuction(num){ 
    $(".auction_product").find("li").removeClass("active").hide().eq(num).fadeIn().addClass("active");
}