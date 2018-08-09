//var servHost = "https://passport.xl-ic.com";
var servHost = "https://test.icwant.com";

/**
 * 生成微信登录二维码
 * @param redirect_uri
 */
function initQr(locId,redirect_uri){
	new WxLogin({
	    id:locId, 
	    appid: "wx01fded085becc818", 
	    scope: "snsapi_login", 
	    redirect_uri: encodeURI(servHost + redirect_uri),
	    state: "",
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
 * 浅拷贝数据 (对象或数组等)
 * @param {Object} data 要拷贝的数据
 */
function extendCopy(data) {
　　　var copy;
	//判断类型
	if (data instanceof Array) {
		copy = [];
		for (var i in data) { 
			if (typeof data[i] == "object") {
				copy[i] = extendCopy(data[i]);
			} else{
				copy[i] = data[i];
			}
		}
	} else if (data instanceof Object) {
		copy = {};
		for (var i in data) { 
			if (typeof data[i] == "object") {
				copy[i] = extendCopy(data[i]);
			} else{
				copy[i] = data[i];
			}
		}
//		copy.uber = data;
	} else{
		copy = data;
	}
	
　　　return copy;
}

/**
 * 深拷贝数据 (对象或数组等)
 * @param {Object} data1 被拷贝的数据
 * @param {Object} data2 可选参数,拷贝该数据的数据
 */
function deepCopy(data1,data2) {
	var data;
	//判断类型
	if (data1 instanceof Array) {
		data = data2 || [];
		for (var i in data1) { 
			if (typeof data1[i] == "object") {
				data[i] = extendCopy(data1[i]);
			} else{
				data[i] = data1[i];
			}
		}
	} else if (data1 instanceof Object) {
		data = data2 || {};
		for (var i in data1) { 
			if (typeof data1[i] == "object") {
				data[i] = extendCopy(data1[i]);
			} else{
				data[i] = data1[i];
			}
		}
//		data.uber = data1;
	} else{
		data = data1;
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
Array.prototype.delData = function(data){
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
 * 检测ajax是否报错
 */
function handleResponseData(res){
	if(res.response_status){
		if(res.response_status == "UN_LOGIN"){
			alert(res.message);
		}
		else if(res.response_status == "NO_ROLE"){
			alert(res.message);
		}
		else if(res.response_status == "NO_PERS"){
			alert(res.message);
		}
		else if(res.response_status == "RESUBMIT"){
			alert(res.message);
		}
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
	var opts=this.opts=$.extend({
		theme: "default", /* 颜色及背景 */
		time: 3000 /* 存在时间 */
	},opts||{});
	var theme = {
		default: {"color": "#31708f", "background-color": "#d9edf7", "border-color": "#bce8f1"},
		success: {"color": "#3c763d", "background-color": "#dff0d8", "border-color": "#d6e9c6"},
		warning: {"color": "#8a6d3b", "background-color": "#fcf8e3", "border-color": "#faebcc"},
		/*danger: {"color": "#a94442", "background-color": "#f2dede", "border-color": "#ebccd1"}*/
		danger: {"color": "#333", "border": "solid 1px #e8e8e8", "background": "#fff1e1"}
	}
	$("body").append('<span class="alert_fail">'+ str +'</span>');
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
		title:"信息",//标题
		message:"确认删除?",//内容
		confirmCallback:function (){
			console.log("confirm");
		}, //确认后的回调
		cancelCallback:function (){
			console.log("cancel");
		}, //取消后的回调
		params: {} //自定义参数,配合回调方法使用
	},opts||{});
	$("body").append(
		'<div class="wrap_dialog">' +
	    	'<div class="dialog">' +
	        	'<div class="dialog_header">' +
	            	'<span class="dialog_title">' + _that.opts.title + '</span><i class="iconfont dialog_delete">&#xe633;</i>' +
	        	'</div>' +
		        '<div class="dialog_body">' +
		            '<span class="dialog_message">' + _that.opts.message + '</span>' +
		        '</div>' +
		        '<div class="dialog_footer">' +
		            '<input type="button" class="dialog_btn button" id="confirm" value="确认" />' +
		            '<input type="button" class="dialog_btn button ml50" id="cancel" value="取消" />' +
		        '</div>' +
	    	'</div>' +
		'</div>'
	);
	// 确定按钮
    $("body").off("click","#confirm").on("click","#confirm",function(){
        _that.opts.confirmCallback(_that.opts.params);
        $(".wrap_dialog").hide();
    });
    // 取消按钮
    $('body').off("click","#cancel").on("click","#cancel",function(){
        _that.opts.cancelCallback(_that.opts.params);
        $(".wrap_dialog").hide();
    });
    //删除按钮
    $("body").off("click",".dialog_delete").on("click",".dialog_delete",function () {
    	$(".wrap_dialog").hide();
    });
}