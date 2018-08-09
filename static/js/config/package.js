//var servHost = "https://passport.xl-ic.com";
var servHost = "https://test.icwant.com";

/**
 * 生成微信登录二维码
 * @param locId 二维码父元素id
 * @param redirect_uri 要跳转的url
 * @param last_url 跳转之前的url，即当前页面
 */
function initQr(locId,redirect_uri,last_url){
	new WxLogin({
	    id:locId, 
	    appid: "wx01fded085becc818", 
	    scope: "snsapi_login", 
	    redirect_uri: encodeURI(servHost + redirect_uri),
	    state: last_url,
	    style: "",
	    href: "#lo"
	});
}

//阻止浏览器的默认行为 
function stopDefault( e ) { 
	e = e || window.event;
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}

//阻止事件冒泡
function stopBubble(e) { 
	e = e || window.event;
	//如果提供了事件对象，则这是一个非IE浏览器 
	if ( e && e.stopPropagation ) 
	    //因此它支持W3C的stopPropagation()方法 
	    e.stopPropagation(); 
	else 
	    //否则，我们需要使用IE的方式来取消事件冒泡 
	    window.event.cancelBubble = true; 
}

/**
 * 获取图片原始尺寸
 * @param {Object} img 图片
 * @param {Object} callback 回调
 */
function getImgTrueSize(img, callback) {
    var nWidth, nHeight
    if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
    } else { // IE6/7/8
        var imgae = new Image()
        image.src = img.src
        image.onload = function() {
            callback(image.width, image.height);
            return {
		    	width: nWidth,
		    	height: nHeight
		    };
        }
    }
    return {
    	width: nWidth,
    	height: nHeight
    };
}

/*
 * 数组包含
 * params ele dom对象
 */
Array.prototype.contains = function(ele){
	for(var i = 0; i < this.length; i++){
		if(this[i] == ele)
			return true;
	}
	return false;
}

/**
 * 比较两者内容是否相等
 * @param {Object} former 现在的
 * @param {Object} latter 要比较的
 */
function compareData (former,latter) {
	
	if (former instanceof Array && latter instanceof Array) {
		if (former.length !== latter.length) {
			return false;
		} else{
			for (var index in former) {
				if (former[index] instanceof Array && latter[index] instanceof Array) {
					if (!compareData(former[index],latter[index])) {
						return false;
					}
				} else if (former[index] instanceof Object && latter[index] instanceof Object) {
					if (!compareData(former[index],latter[index])) {
						return false;
					}
				} else if (former[index] !== latter[index]) {
					return false;
				}
			}
		}
	} else if (former instanceof Object && latter instanceof Object) {
		if (Object.keys(former).length !== Object.keys(latter).length) {
			return false;
		} else{
			for (var key in former) {
				if (!(key in latter)) {
					return false;
				}
				if (former[key] instanceof Array && latter[key] instanceof Array) {
					if (!compareData(former[key],latter[key])) {
						return false;
					}
				} else if (former[key] instanceof Object && latter[key] instanceof Object) {
					if (!compareData(former[key],latter[key])) {
						return false;
					}
				} else if (former[key] !== latter[key]) {
					return false;
				}
			}
		}
	} else{
		if (former !== latter) {
			return false;
		}
	}
	return true;
}


/**
 * 深拷贝数据 (对象或数组等)
 * @param {Object} data1 要拷贝的数据
 * @param {Object} data2 扩展的数据
 */
function deepCopy(data1,data2) {
	var data,copyData;
	
	if (data2 && data2 instanceof Array) {
		copyData = data2 || [];
		data = data1;
	} else if (data2 && data2 instanceof Object) {
		copyData = data2 || {};
		data = data1;
	} else if (!data2) {
		if (data1 instanceof Array) {
			copyData = data1;
			data = [];
		} else if (data1 instanceof Object) {
			copyData = data1;
			data = {};
		} else {
			data = data1;
			return data;
		}
	}
	for (var i in copyData) { 
		if (typeof copyData[i] == "object") {
			data[i] = deepCopy(copyData[i]);
		} else {
			data[i] = copyData[i];
		}
	}
　　　return data;
}

/*
 * 删除数组中某个值
 * params val 要删除的值
 */
Array.prototype.removeByValue = function(val) {
  	for(var i=0; i<this.length; i++) {
    	if(this[i] == val) {
      		this.splice(i, 1);
  			break;
		}
  	}
}

/*
 * 数组不包含则添加
 * params data 要检测是否包含在数组内的某个值
 */
Array.prototype.pushNotSame=function(data){
	if(this.contains(data)){
		return;
	} else {
		this.push(data);
	}
}

/*
 * 删除数组某个值
 * params data 要删除的值
 */
Array.prototype.deleData = function(data){
	for(var i = 0,len=this.length; i < len; i++){
		if(this[i] == data){
			this.splice(i, 1);
		}
	}
}

/*
 * 字符串是否已传入的值开头
 * params s 传入的字符串
 */
String.prototype.startWith = function(s){
    if(s == null ||s == "" || this.length == 0 || s.length > this.length){
    	return false;
    } 
    if (this.substr(0,s.length) == s){
    	return true;
    } else {
    	return false;
    }
    return true;
}

/*
 * 字符串是否已传入的值结尾
 * params s 传入的字符串
 */
String.prototype.startEnd = function(s){
    if(s == null ||s == "" || this.length == 0 || s.length > this.length){
    	return false;
    } 
    if (this.substring(this.length-s.length)==s){
    	return true;
    } else {
    	return false;
    }
    return true;
}


/*
 * 自定义alert
 * params str 字符串
 */
window.alert = function (str,opts) {
	var _that = this;
	var word = str || "默认信息";
	var opts=this.opts=$.extend({
		theme: "default", /* 颜色及背景 */
		time: 3000 /* 存在时间 */
	},opts||{});
	var theme = {
		default: {"color": "#8c8d8e", "background-color": "#ebeef5", "border-color": "#c0c4cc"},
		success: {"color": "#6fd63c", "background-color": "#e0fdd1", "border-color": "#a8f084"},
		warning: {"color": "#ecbe80", "background-color": "#fcf4e8", "border-color": "#fbefde"},
		/*danger: {"color": "#a94442", "background-color": "#f2dede", "border-color": "#ebccd1"}*/
		danger: {"color": "#fc8a73", "background-color": "#faddd9", "border": "solid 1px #feb3a4"}
	}
	$("body").append('<span class="alert_fail">'+ word +'</span>');
	var width = $(".alert_fail").css("width");
	var height = $(".alert_fail").css("height");
	$(".alert_fail").css({"margin-top":-(width/2)+'px',"margin-left":-(height/2)+'px'});
	$(".alert_fail").css(theme[_that.opts.theme]);
	var timer = setTimeout(function () {
		$(".alert_fail").remove();
	},_that.opts.time);
}

/*
 * 自定义confirm
 * params opts 参数对象
 */
window.confirm = function (opts) {
	var _that = this;
	var opts=this.opts=$.extend({
		title:"提示",//标题
		message:"确认删除?",//内容
		cancel: true,	//是否显示取消
		delete: true,	//删除按钮
		params: {}, //自定义参数,配合回调方法使用
		confirmCallback:function (){
			console.log("confirm");
		}, //确认后的回调
		cancelCallback:function (){
			console.log("cancel");
		}, //取消后的回调
	},opts||{});
	$("body").append(
		'<div class="wrap_dialog">' +
	    	'<div class="dialog">' +
	        	'<div class="dialog_header">' +
	            	'<span class="dialog_title">' + _that.opts.title + '</span>' +
	        	'</div>' +
		        '<div class="dialog_body">' +
		            '<span class="dialog_message">' + _that.opts.message + '</span>' +
		        '</div>' +
		        '<div class="dialog_footer clearfix">' +
		            '<input type="button" class="dialog_btn button f_r" id="confirm" value="确认" />' +
		        '</div>' +
	    	'</div>' +
		'</div>'
	);

	if (_that.opts.cancel) {
		var cancel = '<input type="button" class="dialog_btn button f_r" id="cancel" value="取消" />';
		$(".dialog_footer").prepend(cancel);
	} 

	if (_that.opts.delete) {
		var dom = '<i class="iconfont dialog_delete">&#xe633;</i>';
		$(".dialog_header").append(dom);
	}

	// 点击确定按钮
    $("body").off("click","#confirm").on("click","#confirm",function(){
		$(this).attr("disabled","disabled");
        _that.opts.confirmCallback(_that.opts.params);
		$(".wrap_dialog").hide();
		$(this).removeAttr("disabled");
    });
    // 点击取消按钮
    $('body').off("click","#cancel").on("click","#cancel",function(){
		$(this).attr("disabled","disabled");
        _that.opts.cancelCallback(_that.opts.params);
        $(".wrap_dialog").hide();
		$(this).removeAttr("disabled");
    });
    //删除按钮
    $("body").off("click",".dialog_delete").on("click",".dialog_delete",function () {
		$(this).attr("disabled","disabled");
        _that.opts.cancelCallback(_that.opts.params);
    	$(".wrap_dialog").hide();
		$(this).removeAttr("disabled");
    });
}

/**
 * 创建提示
 * @param {Object} ele jq对象
 * @param {Object} html 提示的html内容
 * @param {Object} args 对象,其他参数
 */
function CreateTooltip (ele,html,args) {
	var _that = this;
	this.obj = {};
    this.tip = null;
    this.args = deepCopy({
    	posi: "top",
		eventType: "hover", /*触发的事件类型 hover或click*/
		customSwitch: {
			show: false,
			hide: false,
			start: false
		} //自定义出现消失	start为true启动该判断,show为出现条件,hide为消失条件
	},args||{});
	
	/**
	 * 显示提示
	 * @param {Object} ele jq对象
	 * @param {Object} html 提示的html内容
	 */
    CreateTooltip.prototype.showTip = function(ele,html){
        //如果当前目标元素的tip已经显示，返回，避免重复生成tip元素。
        if(_that.tip){
            return;
        }
        
        //获取tip弹出位置
        var posi = _that.args.posi;

        //创建tip元素
        var tip = '<div class="tooltip">'
			+ '<div class="tip-content '+ posi +'">' + html + '</div>'
			+ '<div class="tip-arrow '+ posi +'"></div>'
		+ '</div>';
        //将tip元素添加到body，必须先将元素添加到body，后面的代码才会生效
        $("body").append(tip);
        
        
		var browserHeight = $(document).height();	//屏幕高度
		var browserWidth = $(document).width();	//屏幕宽度
        var scrollTop = $(document).scrollTop();	//y轴滚动条距顶部距离
        var scrollLeft = $(document).scrollLeft();	//x轴滚动条距左侧距离
        var contentHeight = $(".tip-content").outerHeight();	//提示内容高度
        var contentWidth = $(".tip-content").outerWidth();	//提示内容宽度
        var eleHeight = ele.outerHeight();	//元素自身高度
        var eleWidth = ele.outerWidth();	//元素自身宽度
        var eleOffset = ele.offset();	//元素距离文档左上角距离
        
//      if (eleOffset.top < (contentHeight + 7)) {
//      	if (posi == "top") {
//      		posi = "bottom";
//      	}
//      } 
// 
//      if (eleOffset.top + eleHeight > browserHeight) {
//      	if (posi == "bottom") {
//      		posi = "top";
//      	}
//      }
//
//		if (eleOffset.left < (contentWidth + 7)) {
//			if (posi == "left") {
//				posi = "right";
//			}
//		}
//      
//      if (eleOffset.left + eleWidth > browserWidth) {
//      	if (posi == "right") {
//      		posi = "left";
//      	}
//      }
        
        //根据不同弹出位置确定tip的坐标
        switch (posi){
            case "top":{
            	$(".tooltip").css({"top": eleOffset.top - contentHeight - 7, "left": eleOffset.left + eleWidth/2 - contentWidth/2});
            }
                break;
            case "bottom":{
            	$(".tooltip").css({"top": eleOffset.top + eleHeight, "left": eleOffset.left + eleWidth/2 - contentWidth/2});
            }
                break;
            case "left":{
            	$(".tooltip").css({"top": eleOffset.top + eleHeight/2 - contentHeight/2, "left": eleOffset.left - contentWidth - 7});
            }
                break;
            case "right":{
            	$(".tooltip").css({"top": eleOffset.top + eleHeight/2 - contentHeight/2, "left": eleOffset.left + eleWidth});
            }
                break;
        }
        
        //没设置自定义时出现隐藏
		if (!_that.args.customSwitch.start) {
			if (_that.args.eventType == "hover") {
	        	//当鼠标进入tip区域，将属性in设置为true
		    	$("body").off("mouseenter", ".tooltip").on("mouseenter", ".tooltip", function () {
		    		$(this).attr("into",true);
		    	});
		        //当鼠标离开tip区域，将属性in设置为false，同时隐藏tip
		        $("body").off("mouseleave", ".tooltip").on("mouseleave", ".tooltip", function () {
		    		$(this).attr("into",false);
		            _that.hideTip();
		    	});
	        } else if (_that.args.eventType == "click") {
	        	//点击提示不消失
		    	$("body").off("click", ".tooltip").on("click", ".tooltip", function (e) {
		    		$(this).attr("into",true);
		    		stopBubble(e);
		    	});
		    	//点击其他地方提示消失
		    	$("body").on("click", function () {
		    		if (_that.tip && _that.tip.length) {
		    			_that.tip.attr("into",false);
		    			_that.hideTip();
		    		}
		    	});
	        }
		}
	    	
        //将tip元素赋值给obj，以判断当前目标元素是否已经拥有tip元素，同时在hide的时候判断当前需要移出的是哪个tip元素
        _that.tip = $(".tooltip");
    };
    
    /**
     * 判断隐藏提示
     */
    CreateTooltip.prototype.hideTip = function () {
        if(_that.tip && _that.tip.attr("into") != "true"){
            _that.tip.remove();
            _that.tip = null;
        }
    };
    
    /**
     * 初始化
     * @param {Object} ele jq对象
     * @param {Object} html 提示的html内容
     */
    CreateTooltip.prototype.init = function(ele,html){
    	//自定义出现消失
    	if (_that.args.customSwitch.start) {
    		if (_that.args.customSwitch.show) {
    			_that.showTip(ele, html);
    		}
    		if (_that.args.customSwitch.hide) {
    			setTimeout(function(){
    				_that.tip.attr("into",false);
	                _that.hideTip();
	            },0);
    		}
    	} else if (_that.args.eventType == "hover") {
	    	ele.off("mouseenter").on("mouseenter",function () {
	    		_that.showTip(ele, html);
	    	});
	    	ele.off("mouseleave").on("mouseleave",function () {
	    		setTimeout(function(){
	                _that.hideTip();
	            },0);
	    	});
	    } else if (_that.args.eventType == "click") {
	    	ele.off("click").on("click", function (e) {
	    		_that.showTip(ele, html);
	    		stopBubble(e);
	    	});
	    }
    };

    return _that.init(ele,html);
}

/**
 * 实际调用方法
 * @param {Object} ele dom元素
 * @param {Object} html 提示代码
 * @param {Object} args 对象,其他参数
 */
function tooltip (ele,html,args) {
	return new CreateTooltip(ele,html,args);
}