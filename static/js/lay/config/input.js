var timer;
var testinput = document.createElement('input');	//判断不同浏览器
var frm_inputs = []; //相关输入框数组
//硬编码：trigger/msg_/related都是属于规范

//输入框提示样式
var meta_input_styles = {
	//样式内容随意定义，内容格式须符合jQuery的用法
	ok_out: {"background":"none", "border":"solid 1px #d1d1d1"},
	ok_in: {"background":"none", "border":"solid 1px #a0a0a2"},
	err_out:  {"background":"#fff1e1", "border":"solid 1px #ffa940"},
	err_in: {"background":"#fff1e1", "border":"solid 1px transparent"}
}

//输入框提示内容
var meta_input = {
	//格式需要符合标准，（1）信息有三类，（2）用正则式验证内容
	account: {msg: ["", "请输入手机号或邮箱号", "请输入正确的手机号或邮箱号"], reg:/(^1[34578]\d{9}$)|(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/},
	phone: {msg: ["", "请输入手机号", "请输入正确的手机号"], reg:/^1[34578]\d{9}$/},
	email:{msg: ["", "请输入邮箱号", "请输入正确的邮箱号"], reg:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/},
	code: {msg: ["", "请填入验证码", "验证码不正确，请重新输入"], reg: /^\d{6}$/},
	pwd: {msg: ["", "请输入密码", "密码格式不正确，请重新输入", "输入的密码不一致"], reg: /^\w{6,16}$/},
	pwd2: {msg: ["", "请输入密码", "密码格式不正确，请重新输入", "输入的密码不一致"], reg: /^\w{6,16}$/},
	security_answer0: {msg: ["", "请输入密保答案", "密保答案在十位字符内"], reg: /^\S{1,10}$/},
	security_answer1: {msg: ["", "请输入密保答案", "密保答案在十位字符内"], reg: /^\S{1,10}$/},
	security_answer2: {msg: ["", "请输入密保答案", "密保答案在十位字符内"], reg: /^\S{1,10}$/},
	company: {msg: ["", "请输入公司名"], reg: /\S+/},
	bank_name: {msg: ["", "请输入对公账号开户行"], reg: /\S+/},
	card_id: {msg: ["", "请输入公司对公账号", "请输入正确的公司对公账号"], reg: /^([1-9]{1})(\d{14}|\d{18})$/},
	cert_img:{msg: ["", "请上传图片"], reg: /\S+/},
	money: {msg: ["", "请输入打款金额", "请输入正确的打款金额"],reg: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^0\.[1-9]([0-9])?$)|(^0\.0[1-9]$)/},
	authority: {msg: ["", "请至少选择一种权限"],reg: /\S+/}
};

//错误提示序号，NotHandle表示初始化，未输入过值，None表示内容合格，Empty表示内容为空，Invalid表示格式不正确，Different表示与关联内容不一致，Unavailable表示接口返回错误，NetWorkError表示网络错误
var MSG_INDEX = {NotHandle: -1, None: 0, Empty: 1, Invalid:2, Different: 3, NetWorkError: 4, Unavailable: 4,};//接口错误和网络错误只能同时存在一个

//需要改变样式及属性的按钮
var meta_triggers = {
	//需要在表单的trigger属性中以数组的形式引用（如btn_getcode）
	btn_getcode: {//按钮对象，获取验证码			
		dom_me: $("#btn_getcode"),//DOM
		enable:{
			set_attr:{"disabled":false},
			set_css:{"cursor":"pointer","background":"#fa5400","opacity":"1","filter":"filter:alpha(opacity=1)"}
		},
		disabled:{
			set_attr:{"disabled":true},
			set_css:{"cursor":"not-allowed","background":"#666","opacity":".35","filter":"filter:alpha(opacity=0.35)"}
			
		},
		way:"&&"	//判断输入框是和还是或
	},
	
	btn_next: {				
		dom_me: $("#btn_next"),//DOM
		enable:{
			set_attr:{"disabled":false},
			set_css:{"cursor":"pointer","background":"#fa5400","opacity":"1","filter":"filter:alpha(opacity=1)"}
		},
		disabled:{
			set_attr:{"disabled":true},
			set_css:{"cursor":"not-allowed","background":"#666","opacity":".35","filter":"filter:alpha(opacity=0.35)"}
			
		},
		way:"&&"	//判断输入框是和还是或
	},
	
	btn_save: {
		dom_me: $("#btn_save"),//DOM
		enable:{
			set_attr:{"disabled":false},
			set_css:{"background":"#222","color":"#fff","cursor":"pointer","opacity":"1","filter":"filter:alpha(opacity=1)"}
		},
		disabled:{
			set_attr:{"disabled":true},
			set_css:{"cursor":"not-allowed","background":"#666","opacity":".35","filter":"filter:alpha(opacity=0.35)"}
			
		},
		way:"||"	//判断输入框是和还是或
	}
};

/*
 * 生成obj对象
 */
function createObj () {
	$("[trigger]").each(function(){	
		var _that = $(this);	
		var id = $(this).attr("id");
		var frm_input = {
			id: id,//输入框id
			dom_me: _that,//jq对象
			dom_msg: $("#msg_" + id),//jq对象，表单出错的文字提示标签
			reg: meta_input[id].reg,//表单校验的正则表达 式
			isok: false,//表示是否校验通过，（或要求与id_obj_related内容是否一致）
			arr_msg: meta_input[id].msg,//文字提示的内容选项数组
			msg_index: MSG_INDEX.NotHandle,//选择哪一项文字提示()
			value: _that.val(),//表单内容
			cursor: "out",//光标是否进入表单in，离开表单out，正在表单里输入change				
			id_input_related: _that.attr("related") ? _that.attr("related") : undefined,//是否包含关联对象，如输入密码与再次输入密码
			triggers: [],//受影响的按钮数组，可能多个
			callback: _that.attr("callback") ? eval(_that.attr("callback")) : undefined //再次检测输入的值是否合法的判断，如是否注册过
		}
		
		var trigger_names = eval(_that.attr("trigger"));//受影响的按钮数组，可能多个
		
		for (var i = 0; i < trigger_names.length; i++) {
			frm_input.triggers.push(trigger_names[i]);
		}			
		frm_inputs.push(frm_input); 
		
		if (frm_input.dom_me.val() != "") {
			change(frm_input);
			display(frm_input);
		}		
		refreshTrigger(frm_input); 		
		
		//绑定事件到表单
		_that
		.focus(function () {
			frm_input.cursor = "in";
			display(frm_input);
		})
		.blur(function () {
			frm_input.cursor = "out";
			display(frm_input);
		})
		.on('oninput' in testinput ? 'input' : 'propertychange', function () {//兼容不同浏览器
			frm_input.cursor = "change";
			change(frm_input);
			display(frm_input);
		});		
	});
}


/*
 * 输入框检测
 * params obj obj 输入框对象
 * obj.id string 输入框的id
 * obj.reg boolean	输入框的正则判断
 * obj.value string 输入框的值
 * obj.isOk boolean 上一次检测时输入框的值是否合格
 * obj.related obj 与该输入框判断紧密相连的输入框，如输入密码和再次输入密码
 * obj.msg array 输入框相应提示
 * obj.msgObj obj 提示标签，jq对象
 * obj.status string 输入框监听的状态
 * obj.msg_index number 目前输入框的提示
 * 
 */

function verify(_input){
	if (_input.value == "") {		
		_input.isok = false;
		_input.msg_index = MSG_INDEX.Empty;	//将提示输入内容
	} else {
		_input.isok = _input.reg.test(_input.value);
		_input.msg_index = _input.isok ? MSG_INDEX.None : MSG_INDEX.Invalid;
		
		if (_input.isok) {
			if (_input.callback && (typeof _input.callback === "function")) {
				_input.isok = _input.callback(_input) ? true : false;
			}
		}
	}
	
	//其它验证通过，需要与另一个表单进行内容比对
	if (_input.isok && _input.id_input_related) {
		var _input_related = findInputById(_input.id_input_related);
		
		if (_input_related) {//对方存在
			//对方没有错误效果，或对方有内容不一致错误效果
			if (_input_related.isok || (_input_related.msg_index == MSG_INDEX.Different)) {	//且错误提示为内容不一致
				if (!_input_related.isok) {
					//清除掉对方的内容不一致的提示
					_input_related.isok = true;
					_input_related.msg_index = MSG_INDEX.None;
					display(_input_related);
				}
					
				if (_input.value != _input_related.value) {//错误效果加到己方
					_input.isok = false;	
					_input.msg_index = MSG_INDEX.Different;
				} 
			}					
		}
	}   
	refreshTrigger(_input);   
}

/*
 * 输入内容变化
 * params _input 输入框对象
 */
function change(_input) {
   clearTimeout(timer);
   $(".fail_tip").text("");
   _input.value = _input.dom_me.val();
   verify(_input); //验证内容，判断内容是否合法   
   timer = setTimeout(function(){displayWhenEdit(_input)}, 3000);//重新启动，开始计时
}

/*
 * 根据id返回相应的输入框对象
 * params id id
 */
function findInputById(id){	
	for (var i = 0; i < frm_inputs.length; i++){
		_input = frm_inputs[i];
		
		if (_input.id == id) {
			return _input;
		}
	}	
}

/*
 * 变更错误提示效果，包括输入框和文字提示
 * params _input 输入框对象
 * params style 相应的css变化
 * params bDisplayMsg 布尔值
 */
function changeStyle(_input, style, bDisplayMsg) {
	_input.dom_me.css(style);
	
	if (bDisplayMsg) {
		_input.dom_msg.text(_input.arr_msg[_input.msg_index]);
	} else {
		_input.dom_msg.text("");
	}
}


/*
 * 提示交互效果或有变化
 * params _input 输入框对象
 */
function display(_input) {
	if (_input.cursor == "in") {				
		if (_input.isok) {//无错误效果边框加粗					
			changeStyle(_input, meta_input_styles.ok_in, true);
  		 } else {//有错误效果，保持，去边框
	 		if (_input.msg_index == -1) {//=-1表示第一次进来，isok且为false，不处理错误	 
	 			changeStyle(_input, meta_input_styles.ok_in, true);
	 		}else{
	 			changeStyle(_input, meta_input_styles.err_in, true);
	 		}
  		 }
	}

	if (_input.cursor == "change") {
		if (_input.value == "") {
			displayWhenEdit(_input);			
		} else {		
			//正在输入，则不管是否REG，不显示错误效果
			changeStyle(_input, meta_input_styles.ok_in, false);			
		}		       
	}

	if (_input.cursor == "out") {
		if (_input.isok) {
			changeStyle(_input, meta_input_styles.ok_out, true);	
		} else {
			if (_input.msg_index == -1) {//第一次进来，isok初 始为false，msg_index肯定为-1，不显示错误
				changeStyle(_input, meta_input_styles.ok_out, true);
			} else {
				changeStyle(_input, meta_input_styles.err_out, true);
			}
		}
	}
}


/*
 * 编辑时可能需要特别调用的，比如过了3秒
 * params _input 输入框对象
 */
function displayWhenEdit(_input) {
	if (_input.isok) {//3秒后输入的内容没问题				
		changeStyle(_input, meta_input_styles.ok_in, true);//边框加深的无错误提示
	} else {//为空或不合法
		changeStyle(_input, meta_input_styles.err_in, true);//无边框的错误提示
	}
}

/*
 * 输入框有变化则尝试去更新按钮状态
 * params _input 输入框对象
 */
function refreshTrigger(_input) { 
	var triggers = _input.triggers;
	
	for (var i = 0; i < triggers.length; i++) {//刷新此表单绑定的按钮
		var trigger = triggers[i];
		var able = meta_triggers[trigger].way=="&&" ? true : false;
		
		for (var j = 0; j < frm_inputs.length; j++) {//与其它表单联合认证
			var frm_input = frm_inputs[j];
			
			if (frm_input.triggers && frm_input.triggers.contains(trigger)) {
				able = eval(able + meta_triggers[trigger].way + frm_input.isok); //按钮是否可用
			}
		}
		var set_attr = able ? (meta_triggers[trigger].enable.set_attr != undefined ? "enable" : undefined) : (meta_triggers[trigger].disabled.set_attr != undefined ? "disabled" : undefined);
		var set_css = able ? (meta_triggers[trigger].enable.set_css != undefined ? "enable" : undefined) : (meta_triggers[trigger].disabled.set_css != undefined ? "disabled" : undefined);
		meta_triggers[trigger].dom_me.attr((meta_triggers[trigger][set_attr] && meta_triggers[trigger][set_attr].set_attr) ? meta_triggers[trigger][set_attr].set_attr : "");
		meta_triggers[trigger].dom_me.css((meta_triggers[trigger][set_css] && meta_triggers[trigger][set_css].set_css) ? meta_triggers[trigger][set_css].set_css : "");
	} 	
}


/*
 * 发送验证码
 * params jq对象
 * params 秒数
 */
function smsTimer(o,num) {
	if (num == 0) {
		o.css("display","inline-block");
		$(".hidden_btn").css("display","none");
		o.val("再次发送");
		num = 60;
	} else {
		o.css("display","none");
		$(".hidden_btn").css("display","inline-block");
		$(".hidden_btn").text("再次发送(" + num + ")");
		num--;
		setTimeout(function() {
			smsTimer(o,num);
		}, 1000)
	}
}



/*
 * 密保检测
 * params id
 */
function isQuestion (id) {
	var reg = /^\w{1,}$/;
	return reg.test($("#" + id).val());
}

/*
 * 手机号检测
 * params id
 */
function isPhone(id){
	var reg = /^1[34578]\d{9}$/;
	return reg.test($("#" + id).val());
}

/*
 * 邮件检测
 * params id
 */
function isMail(id){
	var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return reg.test($("#" + id).val());
}

function isAccount (id) {
	var reg = isPhone(id) || isMail(id);
	return reg;
}

/*
 * 密码检测
 * params id
 */
function isPassword (id) {
	var reg = /^\w{6,16}$/;
	return reg.test($("#" + id).val());
}

/*
 * 验证码检测
 * params id
 */
function isPin (id) {
	var reg = /^\d{6}$/;
	return reg.test($("#" + id).val());
}

/*
 * 再次输入密码检测
 * params id
 */
function isPasswordSame () {
	if ($("#password_again").val()==$("#password").val()) {
		return true;
	}else{
		return false;
	}
}

/*
 * 上传图片检测
 * params id
 */
function isFile (id) {
	if ($("#" + id)[0].files && $("#" + id)[0].files[0]) {
		return true;
	} else{
		return false;
	}
}


/*
 * 点击checkbox检测
 * params ele jq对象
 */
function isCheckbox (ele) {
	if (ele.is(':checked')) {
		arr.delData(ele[0]);
	} else{
		arr.pushNotSame(ele[0]);
	}
	if (arr.length >0){
		flag=true;
	} else{
		flag=false;
	}
	testSend();
	return flag;
}

/*
 * 初始化检测checkbox
 * params ele jq对象
 */
function initCheckbox (ele) {
	ele.each(function () {
		if ($(this).is(':checked')) {
			arr.pushNotSame($(this)[0]);
		} else{
			arr.delData($(this)[0]);
		}
	})
	if (arr.length >0){
		flag=true;
	} else{
		flag=false;
	}
}

/*
 * 不为0的金额检测
 * params id
 */
function isMoney (id) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[1-9]\.[0-9]([0-9])?$)|(^0\.[1-9]([0-9])?$)|(^0\.0[1-9]$)/;
	return reg.test($("#" + id).val());
}


/*
 * 是否为空
 * params id
 */
function notEmpty (id) {
	if ($("#" + id).val()=="") {
		return false;
	} else{
		return true;
	}
}

/*
 * 银行卡号正则检测
 * params id
 */
function isBankCard (id) {
	var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
	return reg.test($("#" + id).val());
}
