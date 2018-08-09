const g_map = new Map();
 
(function(){
    var tems = document.getElementsByTagName('script');
     
    $(tems).each (function(index, tem) {
        if (!tem.id || !tem.id.length || !tem.src || !tem.src.length || 'text/html' != tem.type) return;
        
        //清除原来的模板信息
        $.ajax({
        	type:"get",
        	url: tem.src,
        	async: false,
        	dataType: "text",
        	success: function(data) {
        		 //预编译模版
	        	var render =  template.compile(data.replace(/^\s*|\s*$/g, ""));         
	        	g_map.set(tem.id, render);
        	}
        });
    })
})();


//g_map.get("name")(data);

function getTemplate (name,obj) {
	return g_map.get(name)(obj);
}