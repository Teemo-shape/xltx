var testinput = document.createElement('input');	//判断不同浏览器
//判断是否检测过则相同数据不再检测
var successArray = [];		//检测通过的公司
var failArray = [];			//检测不通过的公司
var company_fail = "";

//初始化草稿
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
					if (result.cert.identify_state == -1) { //账户被拒
						$(".fail_type").text("被驳回，请根据驳回详情修改资料");
						$(".fail_left").text("驳回详情：");
						$(".fail_right").html(result.cert.refuse_details);
						$(".fail_info").show();
						//如果被拒且超时，不保留之前草稿
						var oDate = new Date().getTime();
						if (oDate >= result.cert.at_ltm_expired) {
							return;
						}
					} else if (result.cert.identify_state == -2) {	//账户失效
						$(".fail_title").text("已失效！");
						$(".fail_left").text("失效详情：");
						$(".fail_right").html("您创建实名验证申请后未在有效时间内提交，该申请已作废，请重新填写资料！");
						$(".fail_info").show();
						return;
					} else if (result.cert.identify_state == -3) {	//冻结
						location.href = ctx + "/cert/cert_conf_amount.html";
					} else if (result.cert.identify_state == 4) {	//认证通过
						location.href = ctx + "/cert/cert_pass.html";
					} else if (result.cert.identify_state == 2) {	//等待审核
						location.href = ctx + "/cert/cert_wait_varify.html";
					} else if (result.cert.identify_state == 3) {	//输入金额超时
						var dead_time = result.cert.at_ltm_expired;
						var current_time = new Date().getTime();
						if (dead_time <=  current_time) {
							$(".fail_title").text("已失效！");
							$(".fail_left").text("失效详情：");
							$(".fail_right").html("您未在有效时间内验证打款金额，该申请已作废，请重新填写资料！");
							$(".fail_info").show();
							return;
						}
					} else {
						//如果超时，跳转至错误信息页面
						var oDate = new Date().getTime();
						if (result.cert.at_ltm_expired) {
							$("#time").val(result.cert.at_ltm_expired);
							if (oDate >= result.cert.at_ltm_expired) {
								confirm({ 	
									message: "您创建实名认证申请后未在有效时间内提交，该申请已作废，请重新填写资料!",		
									cancel: false ,
									delete: false 	
								});
								return;
							} else {
								$("#time").val(result.cert.at_ltm_expired);
								$(".count_down").show();
								initTime();
							}
						}
					}
					
					//加载文字信息
					if (result.cert.company_name) {
						$("#company").val(result.cert.company_name);
					}
					if (result.cert.cert_pic) {
						$(".license_img").attr("name",result.cert.cert_pic);
					}
					if (result.cert.bank_name) {
						$("#bank_name").val(result.cert.bank_name);
					}
					if (result.cert.bank_card_id) {
						$("#card_id").val(result.cert.bank_card_id);
					}
					if (result.cert.company_address) {
						$("#address").val(result.cert.company_address);
					}
					$("#certId").val(result.cert.id);
				}

				//加载图片
				if (result.img) {
					$("#cert_img").val(result.img);
					var license = $(".upload_cont").parent().find(".license").length;
					if (license==0) {
						$(".upload_cont").before('<div class="license f_l"></div>');
						$(".upload_cont").addClass("absolute");
					}
					var dom = '<img class="license_img" src="'+result.img+'" />';
					$(".license").html(dom);
				}
			}
		}	
	},
	error: function(XMLHttpRequest, textStatus, errorThrown){
		$(".next_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
	}
});

// 获取输入框提示
createObj();

// 点击渲染图片
$("#upload").change(function () {
	var license = $(".upload_cont").parent().find(".license").length;
	if (license==0) {
		$(".upload_cont").before('<div class="license f_l"></div>');
		$(".upload_cont").addClass("absolute");
	}
	if (this.files.length) {
		getPhoto(this);
	}
});

// 点击保存草稿
$(".save").click(function () {
	saveDraft();
});

// 点击下一步
$(".next").click(function () {
	go_next();
});

function go_next() {
	$(".next").attr("disabled","disabled");
	$(".company").text($("#company").val());
	$(".bank").text($("#bank_name").val());
	$(".bank_account").text($("#card_id").val());
	$(".address").text($("#address").val());
	$(".basic_info").removeClass("active");
	$(".confirm_info").addClass("active");
	$(".next").removeAttr("disabled");
}

// 点击提交认证
$(".confirm").click(function () {
	submitData();
});

//点击返回
$(".back").click(function () {
	$(this).attr("disabled","disabled");
	$(".basic_info").addClass("active");
	$(".confirm_info").removeClass("active");
	$(this).removeAttr("disabled");
});

// 点击图片显示大图
$(".info_value").on("click","img",function () {
	$(this).attr("disabled","disabled");
	var width = parseInt($(this).css("width"))*3 + "px";
	var height = parseInt($(this).css("height"))*3 + "px";
	var src = $(this).attr("src");
	$(".big_img").html('<img src="'+src+'"/>');
	$(".img_bg").show();
	$(".big_img").show();
	$(".big_img").find("img").css({"width":width,"height":height});
	$(this).removeAttr("disabled");
});

// 点击大图
$(".big_img").click(function () {
	$(this).attr("disabled","disabled");
	disappear();
	$(this).removeAttr("disabled");
});

//点击遮罩层
$(".img_bg").click(function () {
	$(this).attr("disabled","disabled");
	disappear();
	$(this).removeAttr("disabled");
});

/**
 * 改变倒计时
 */
function changeTime(){
	var time = $("#time").val();
	var expire = trun_time(time);
	$("#time").val(time);
	$(".valid_time").text(expire);
}

//倒计时
function initTime(){
	changeTime();
	window.apply = setInterval(changeTime, 1000);
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
		clearInterval(window.apply);
		confirm({ 	
			message: "您创建实名认证申请后未在有效时间内提交，该申请已作废，请重新填写资料!",		
			cancel: false ,
			delete: false ,
			confirmCallback: function () {
				location.reload();
			}	
		});
		return;
	}
	
	return timeStr;
}

/**
 * 大图及遮罩层消失
 */
function disappear () {
	$(".big_img").hide();
	$(".img_bg").hide();
}


/**
 * 公司名检测
 * @param {Object} _input 相应的input对象
 */
function testCompany(_input) {
	if (arrayContains($("#company").val()).flag) {
		if (arrayContains($("#company").val()).state) {
			return true;
		} else{
			_input.msg_index = MSG_INDEX.Unavailable;
			_input.arr_msg[MSG_INDEX.Unavailable] = company_fail;
			return false;
		}
	} else if (checkCompany(_input)) {
		return true;
	}
}

/**
 * 判断之前是否提交过，若提交返回之前提交结果
 * @param {String} str 查询的字符串
 */
function arrayContains (str) {
	var obj = {
		flag:false
	}
	if (successArray.contains(str)) {
		obj.flag=true;
		obj.state=true;
	}
	if (failArray.contains(str)) {
		obj.flag=true;
		obj.state=false;
	}
	return obj;
}

/*
 * 公司名检测接口
 * params type 类型为1表示检测错误则提示，类型为2表示检测错误不提示
 */
function checkCompany (_input) {
	var flag = false;
	var cname = $("#company").val();
	$.ajax({
		url: ctx + '/cert/check/company/' + cname,
		type:"get",
		cache:false,
		async:false,
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success:function (result) {
			if (handleResponseData(result)) {
				if (result.res=="s") {
					if (!result.is_exist) {
						successArray.push($("#company").val());
						flag = true;
					} else {
						failArray.push($("#company").val());
						_input.msg_index = MSG_INDEX.Unavailable;
						_input.arr_msg[MSG_INDEX.Unavailable] = result.msg;
						company_fail = result.msg;
					}
				} else if (result.res=="f"){
					$("#msg_company").html('<i class="iconfont danger">&#xe657;</i>' + data.msg).css("visibility","visible");
				}
			}	
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			_input.msg_index = MSG_INDEX.NetWorkError;
			_input.arr_msg[MSG_INDEX.NetWorkError] = "网络异常，请重试一次";
		}
	})
	return flag;
}

/**
 * 提交资料
 */
function submitData() { 
	$("confirm").attr("disabled","disabled");
	// clearProgressInfo();
    var fileObj = document.getElementById("upload").files[0]; // js 获取文件对象  
  
    // FormData 对象  
    var form = new FormData();  
    if(fileObj){
    	form.append("certImg", fileObj); 
    }else {
    	form.append("certImg", null);
    }
     var id = $("#certId").val();
    if(id)
    	form.append("id", id);
    form.append("company_name",$("#company").val()); 
    form.append("bank_name",$("#bank_name").val());
    form.append("bank_card_id",$("#card_id").val());
    form.append("company_address",$("#address").val());
    
    $.ajax({
    	type: "POST",
		url: ctx + '/cert/apply?form_token=' + form_token,
    	data: form ,　　//这里上传的数据使用了formData 对象
    	processData: false, 
    　　　　/*必须false才会自动加上正确的Content-Type*/
        contentType: false , 
    　　　　/*这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用*/
        xhr: function(){
	    　　　　	var xhr = $.ajaxSettings.xhr();
			if(!fileObj)
    			return xhr;
	    　　　	if(progressHandler && xhr.upload) {
	    		xhr.upload.addEventListener("progress" , progressHandler, false);
	    　　　　　　　return xhr;
	    　　　　	}
    　　	},
		success: function(data){
			if (handleResponseData(data)) {
				if(data.res == "f"){
					$(".submit_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
					form_token = data.form_token;
				}
				
				if(data.res == "s"){
					form_token = data.form_token;
					window.location = ctx + '/cert/cert_wait_varify.html';
				}
				$("confirm").removeAttr("disabled");
			}
		},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(".submit_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible").removeClass("sussess_tip");
			$("confirm").removeAttr("disabled");
        }	    	
　　});
}

/**
 * 保存草稿
 */
function saveDraft() { 
	$(".save").attr("disabled","disabled");
	// clearProgressInfo();
    var fileObj = document.getElementById("upload").files[0]; // js 获取文件对象  
  
    // FormData 对象  
    var form = new FormData();  
    if(fileObj){
    	form.append("certImg", fileObj); 
    }else {
    	form.append("certImg", null);
    }
     var id = $("#certId").val();
    if(id)
    	form.append("id", id);
    form.append("company_name",$("#company").val()); 
    form.append("bank_name",$("#bank_name").val());
    form.append("bank_card_id",$("#card_id").val());
    form.append("company_address",$("#address").val());
    
    $.ajax({
    	type: "POST",
		url: ctx + '/cert/draft?form_token=' + form_token,
    	data: form ,　　//这里上传的数据使用了formData 对象
    	processData: false, 
    　　　　/*必须false才会自动加上正确的Content-Type*/
        contentType: false , 
    　　　　/*这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用*/
        xhr: function(){
	    　　　　	var xhr = $.ajaxSettings.xhr();
			if(!fileObj)
    			return xhr;
	    　　　	if(progressHandler && xhr.upload) {
	    		xhr.upload.addEventListener("progress" , progressHandler, false);
	    　　　　　　　return xhr;
	    　　　　	}
    　　	},
		success: function(data){
			if (handleResponseData(data)) {
				if(data.res == "f"){
					$(".next_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible").removeClass("sussess_tip");
				}
				
				if(data.res == "s"){
					if (data.data) {
						$(".fail_info").hide();
						if (!$("#time").val()) {
							$("#time").val(data.data.at_ltm_expired);
							$(".count_down").show();
							initTime();
						}
						$("#certId").val(data.data.id);
					}
					$(".next_tip").html('<i class="iconfont">&#xe602;</i>' + data.msg).css("visibility","visible").addClass("sussess_tip");
				}
				form_token = data.form_token;
				$(".save").removeAttr("disabled");
			}
		},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(".next_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible").removeClass("sussess_tip");
            $(".save").removeAttr("disabled");
        }	    	
　　});
}
	
function clearProgressInfo(){  
    document.getElementById('progressInfo').style.display='none';  
    document.getElementById("progressBar").value = 0;  
    document.getElementById("percentage").innerHTML = "";  
}  
  
function progressHandler(evt) {  
	$("#progressInfo").show();
    if (evt.lengthComputable) {  
    	$("#progressBar").attr("max", evt.total);  
    	$("#progressBar").attr("value", evt.loaded);  
    	$("#percentage").html(Math.round(evt.loaded / evt.total * 100) + "%");  
    }  
}  

/*
 * 上传图片后页面显示
 * @param node dom对象
 */
function getPhoto(node) {  
	var imgURL = "";  
	var imgRUL = "";
	try{  
	    var file = null;  
	    if(node.files && node.files[0] ){  
	        file = node.files[0];  
	    }else if(node.files && node.files.item(0)) {  
	        file = node.files.item(0);  
	    }  
	    //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
        try{  
            imgURL =  file.getAsDataURL();  
        }catch(e){  
            imgRUL = window.URL.createObjectURL(file);  
        }  
    }catch(e){  
        if (node.files && node.files[0]) {  
            var reader = new FileReader();  
            reader.onload = function (e) {  
                imgURL = e.target.result;  
            };  
            reader.readAsDataURL(node.files[0]);  
        }  
    }  
	$("#cert_img").val(imgRUL);
	//单独检测按钮
	changeTrigger("cert_img");
    creatImg($(".license"),imgRUL); 
    return imgURL;  
}  

/*
 * 生成图片
 * @param eleParent 图片的父元素jq对象
 * @param imgRUL 图片地址
 */
function creatImg(eleParent,imgRUL){  
    var textHtml = '<img class="license_img" src="'+imgRUL+'"/>';  
    eleParent.html(textHtml);  
} 

/*
 * 输入框有变化则尝试去更新按钮状态
 * @param id 指定检测的输入框id
 */
function changeTrigger(id) { 
	var triggers = [];
	var trigger_names = eval($("#"+id).attr("trigger"));
	$(".next_tip").html("").css('visibility','hidden');
	for (var i = 0; i < trigger_names.length; i++) {
		triggers.push(trigger_names[i]);
	}
	for (var i = 0; i < triggers.length; i++) {//刷新此表单绑定的按钮
		var trigger = triggers[i];
		var able = meta_triggers[trigger].way=="&&" ? true : false;
		
		for (var j = 0; j < frm_inputs.length; j++) {//与其它表单联合认证
			var frm_input = frm_inputs[j];
			if (frm_input.id == id) {
				frm_input.isok = true;
			}

			//如果输入框检测为false(默认为false)，且不为空，则检测一次，true则不检测
			if (!frm_input.isok) {
				if (frm_input.value != "") {
					verify(frm_input);
				}
			}

			if (frm_input.triggers && frm_input.triggers.contains(trigger)) {
				able = eval(able + meta_triggers[trigger].way + frm_input.isok); //按钮是否可用
			}
		}
		var set_attr = able ? (meta_triggers[trigger].enable.set_attr != undefined ? "enable" : undefined) : (meta_triggers[trigger].disabled.set_attr != undefined ? "disabled" : undefined);
		var set_css = able ? (meta_triggers[trigger].enable.set_css != undefined ? "enable" : undefined) : (meta_triggers[trigger].disabled.set_css != undefined ? "disabled" : undefined);
		meta_triggers[trigger].dom_me.attr((meta_triggers[trigger][set_attr] && meta_triggers[trigger][set_attr].set_attr) ? meta_triggers[trigger][set_attr].set_attr : "");
		meta_triggers[trigger].dom_me.css((meta_triggers[trigger][set_css] && meta_triggers[trigger][set_css].set_css) ? meta_triggers[trigger][set_css].set_css : "");
		
		//图片不考虑上传立马下一步
		// //判断是否符合按钮条件
		// if (able) {
		// 	//是否是指定按钮
		// 	if (trigger == trigger.enter_button) {
		// 		//是否含有enter事件
		// 		if (trigger.enter) {
		// 			var next = setTimeout(_input.enter,20);
		// 		}
		// 	}
		// }
	} 	
}