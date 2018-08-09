var protocolStr = document.location.protocol;  //判断https,https协议
var ctx = protocolStr+"//"+ window.location.host;
var user_roles = [];
var form_token = "";

var Ajax={
    get: function(url, fn) {
        var xhr = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
        xhr.open('GET', url, false);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { // readyState == 4说明请求已完成
                fn.call(this, xhr.responseText);  //从服务器获得数据
            }
        };
        xhr.send();
    },
    post: function (url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {  // 304未修改
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}

//获取url中的参数  
function getUrlParam(name) {  
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
	if (r != null) return unescape(r[2]); return null; //返回参数值  
}  

/**
 * 根据相应接口设定全局变量
 * @param {String} destUrl 请求的url
 */
function isPermitted(destUrl){
	try{
		Ajax.get(destUrl ,function(data){
		    if(handleResponseData(data)){
	    		data = eval("(" + data + ")");
		    	user_roles = data.roles;
		    	form_token = data.form_token;
		    }
		});
	}catch(e){
		console.log(e);
		if(e.code == 19 && e.name == "NetworkError" && e.message.indexOf("Failed to execute 'send' on 'XMLHttpRequest': Failed to load") == 0)
			location.href = ctx + "/account/login.html";
	}
}




/**
 * 判断是否登录
 * @param {String} destUrl 接口
 */
function isLogin(destUrl) {
    var is_login = false;
    Ajax.get(destUrl ,function(data){
	    if(typeof(res) == 'string')
		res = eval("(" + res + ")");
        if(res.response_status){
            if(res.response_status == "UN_LOGIN"){
                is_login = false;
            }else {
                is_login = true;
            }
        }else {
            is_login = true;
        }
    });
    
	return is_login;
}

/*
 * 检测ajax是否报错
 * @param {Object} res 接口返回的数据
 */
function handleResponseData(res){
	if(typeof(res) == 'string')
		res = eval("(" + res + ")");
	if(res.response_status){
		if(res.response_status == "UN_LOGIN"){
            setCookie("before_login",location.href);
            location.href = ctx + "/account/login.html";
            return;
		}
		else if(res.response_status == "NO_ROLE"){
            alert(res.message);
            go_back()
		}
		else if(res.response_status == "NO_PERS"){
            alert(res.message);
            go_back()
		}
		else if(res.response_status == "RESUBMIT"){
            alert(res.message);
            go_back()
		}
		return false;
	}
	return true;
}
//判断是否能后退
function go_back(){
    if (window.history.length==1){
        //新的窗口，关闭
        closePageForm()
    }else{
        history.go(-1)
    }
}
//关闭页面
function closePageForm(){
    window.opener=null;
    window.open('','_self');
    window.close();
  }

//设置cookies 

function setCookie(name,value, expires) { 
    var Days = 30; 
    var exp = new Date(); 
    if(!expires)
    	expires = 600; //默认10分钟
    exp.setTime(exp.getTime() + expires * 1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + "; path=" + "/" + ";"  
} 

//读取cookies 
function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

//删除cookies 
function delCookie(name) { 
    var cval=getCookie(name); 
    if (cval===null) {
        return false;
    }
    setCookie(name,cval,-1);
} 