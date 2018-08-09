
/*
 * 加载头部
 */
$("header").load("header.html");

/*
 * iframe根据内容改变高度
 */

function orderInfoFrame(){  
    var iframe=document.getElementById("orderInfo");  
    if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("rv:11")>0||navigator.userAgent.indexOf("Firefox")>0){  
        iframe.height=iframe.contentWindow.document.body.scrollHeight;  
    }else{  
        iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;  
    }  
}
