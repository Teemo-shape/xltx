var websocket;

function initSocket(url) {
	if (!websocket) {
		if(document.location.protocol.indexOf('s')==-1){
			if ('WebSocket' in window) {
				websocket = new WebSocket("ws://" + window.location.host + "/websocket" + url);
			} else if ('MozWebSocket' in window) {
				websocket = new MozWebSocket("ws://" + window.location.host + "/websocket" + url);
			} else {
				websocket = new SockJS("http://" + window.location.host + "/sockjs/websocket" + url);
			}
		}else{
			if ('WebSocket' in window) {
				websocket = new WebSocket("wss://" + window.location.host + "/websocket" + url);
			} else if ('MozWebSocket' in window) {
				websocket = new MozWebSocket("wss://" + window.location.host + "/websocket" + url);
			} else {
				websocket = new SockJS("https://" + window.location.host + "/sockjs/websocket" + url);
			}
		}
	}
}

// $(function() {
// 	initSocket('/goodsdetail/110' );
// //    initSocket('/2');
   
//     websocket.onopen = function(evnt) {
//         console.log("  websocket.onopen  ");
//     };


//     websocket.onmessage = function(evnt) {
// //    	var base64 = base64Encode(evnt.data);
// //    	$("#msg").append("<p><img src='data:image/png;base64," + evnt.data + "' /></p>");
//     	var msgObj = eval("(" + evnt.data + ")");
//     	setMsg(msgObj);
//         console.log("  websocket.onmessage   ");
//     };


//     websocket.onerror = function(evnt) {
//         console.log("  websocket.onerror  ");
//     };

//     websocket.onclose = function(evnt) {
//         console.log("  websocket.onclose  ");
// 		 initSocket();
//     };


//     $(".TXBTN").click(function(){
//         var text = $(this).parent().find("#tx").val();
//         var toUser = $("#toUser").val();

//         if(text == null || text == ""){
//             alert(" content  can not empty!!");
//             return false;
//         }

//         var msg = {
//         	binaryContent: [1,2,3,4,5],
//         	toUser : toUser,
//             msgContent: text,
//             msgType: 'text',
//         };

//         websocket.send(JSON.stringify(msg));
//         var fromUser = $("#fromUser").val();
//     });
// });

function sendHeartData() {
	var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ��� 
	var isOpera = userAgent.indexOf("Opera") > -1; //�ж��Ƿ�Opera����� 
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //�ж��Ƿ�IE����� 
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //�ж��Ƿ�IE��Edge����� 
	var isFF = userAgent.indexOf("Firefox") > -1; //�ж��Ƿ�Firefox����� 
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //�ж��Ƿ�Safari����� 
	var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //�ж�Ch

	if (isIE || isEdge) //ie��edge��������Զ������������������ֶ�����
		return;

	if (websocket && websocket.readyState && websocket.readyState == 1) {
		websocket.send("java.nio.HeapByteBuffer");
	}
}

var heartData = setInterval(sendHeartData, 60000); // ÿ���ӷ���һ��������

/**
 * ������յ�������
 **/
function setMsg(msgObj) {
	$("div#msg").append("<span>" + msgObj.msg + "</span>");
}