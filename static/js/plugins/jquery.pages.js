//分页插件
/**
 * 2017-05-03
 * @author by kmh0228
 */
 
(function($){
	
	function Page(container,fn,args,style){
		//存参数
		var container=this.container=container||null;
		if(this.container.constructor!=jQuery){
			throw('page插件第一个参数错误，请录入jQuery对象');
		}
		this.fn=fn||function(){};
		if(typeof(this.fn)!="function"){
			throw('page插件第二个参数错误，请录入函数类型对象');
		}
		//存 args里的属性
		var args=this.args=$.extend({
			pageCount:10,//总页码,默认10
			current:1,//当前页码,默认1
			showPrev:true,//是否显示上一页按钮
			showNext:true,//是否显示下一页按钮
			showTurn:true,//是否显示跳转,默认显示
			showSumNum:true,//是否显示总页码
			showNear:2,//显示当前页码前多少页和后多少页，默认2
			pageSwap:false//是否同意调剂,默认否。调剂会最大数量显示页码。例如当前页码之前无页码可以显示。则会增加之后的页码。
		},args||{});
		
		var width=this.width=parseInt(this.container.css('width'))||parseInt(this.container.parent().css('width'));
		var height=this.height=24;//parseInt(this.obj.css('height'));
		
		var style=this.style=$.extend({
			"width":width,//页码盒子总宽度
			"height":height,//页码总高度，默认20px
			"pagesMargin":0,//每个页码或按钮之间的间隔
			"paddL":0,//左边留白
			"paddR":0,//右边留白
			"borderColor":"#d1d1d1",//边线颜色
			"currentColor":"#ff7e21",//当前页码的字体颜色
			"disableColor":"#bfbfbf",//不可点击按钮的字体颜色
			"disableBackColor":"#f2f2f2",//不可点击按钮的背景色
			"prevNextWidth":24,//上页下页的宽度
			"pagecountWidth":74,//共计多少页的宽度
			"trunWidth":216//跳转模块宽度
		},style||{});
		
		if(!style.pageWidth)style.pageWidth=24;/*(function(){
				var sumWidth=style.width-(style.prevNextWidth+2+style.pagesMargin)*(Number(args.showPrev)+Number(args.showNext))-(style.pagecountWidth+style.pagesMargin)*Number(args.showSumNum)-(style.trunWidth+style.pagesMargin)*Number(args.showTurn);
				var sumLength=args.showNear*2+5;
				return parseInt(sumWidth/sumLength)-style.pagesMargin;
			})();*///每个页码的宽度。默认按最大摆放量计算	

		//设置容器样式
		this.container.addClass("clearfix");
		this.container.css({'pading-left':style.paddL+'px','pading-right':style.paddR+'px'});
		//建立自己的容器
		this.container.html('<div class="page_container clearfix"></div>');
		this.obj=this.container.children();
		//初始化
		this.init();
	}
	
	Page.prototype.init=function(){
		this.fillHtml();
		this.bindEvent();
	}
	
	//填充DOM
	Page.prototype.fillHtml=function(){
		var args=this.args;
		var obj=this.obj;
		if(args.current>args.pageCount||args.current<1)return;
		obj.empty();
				
		//上一页
		if(args.showPrev){
			if(args.current > 1){
				obj.append('<a href="#/page'+(args.current-1)+'" class="prevPage iconfont">&#xe601;</a>');
			}else{
				obj.remove('.prevPage');
				obj.append('<span class="disabled iconfont">&#xe601;</span>');
			}
		}

		//第一页
		if(args.current != 1){
			obj.append('<a href="#/page1" class="tcdNumber">'+1+'</a>');
		}else{
			obj.append('<span class="current">'+1+'</span>');
		}
		
		//省略页
		if(args.current > args.showNear+2){
			obj.append('<span class="hiding">···</span>');
		}
		
		//最难的逻辑
		var start = args.current>args.showNear+2?args.current-args.showNear:2,
			end = args.current+args.showNear>=args.pageCount?args.pageCount-1:args.current+args.showNear;
		
		//调剂页面
		if(args.pageSwap){
			var dstart=args.current-args.showNear-2;
			var dend=args.pageCount-1-args.current-args.showNear;
			if(dstart<1&&dend>1){
				end+=Math.min(dend,Math.abs(dstart-1));
			}else if(dstart>1&&dend<1){
				start-=Math.min(dstart,Math.abs(dend-1));
			}
		}
		
		//除首尾及省略页外其他页面
		for (;start <= end; start++) {
			if(start != args.current){
				obj.append('<a href="#/page'+start+'" class="tcdNumber">'+ start +'</a>');
			}else{
				obj.append('<span class="current">'+ start +'</span>');
			}
		}
		
		//省略页
		if(args.current + 1 + args.showNear < args.pageCount){
			obj.append('<span class="hiding">···</span>');
		}
		
		//尾页
		if(args.current != args.pageCount&&args.pageCount!=1){
			obj.append('<a href="#/page'+ args.pageCount +'" class="tcdNumber">'+args.pageCount+'</a>');
		}else if(args.current== args.pageCount&&args.pageCount!=1){
			obj.append('<span class="current">'+args.pageCount+'</span>');
		}
		
		//下一页
		if(args.showNext){
			if(args.current== args.pageCount||args.pageCount==1){
				obj.remove('.nextPage');
				obj.append('<span class="disabled iconfont">&#xe600;</span>');
			}else{
				obj.append('<a href="#/page'+(args.current+1)+'" class="nextPage iconfont">&#xe600;</a>');
			}
		}
		
		//显示总页数
		if(args.showSumNum){
			obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
		}

		//跳转页码
		if(args.showTurn){
			obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+' class="page_num">页<a href="javascript:;" class="turndown">确定</a></span>');
		}
		this.setStyle();
		this.fn&&this.fn(args.current);
	};
	//添加样式
	Page.prototype.setStyle=function(){
		var s=this.style;
		var marLR=s.pagesMargin;
		
		this.obj.children().css({'margin-left':marLR+'px','margin-right':marLR+'px'});
	
		this.obj.find('a.prevPage').css({'width':s.prevNextWidth,'height':s.height+'px'});
		this.obj.find('a.nextPage').css({'width':s.prevNextWidth,'height':s.height+'px'});
	
		this.obj.find('a.turndown').css({'height':s.height+2+'px','border':'none'});
		
		this.obj.find('span.current').css({'height':s.height+'px','color':s.currentColor,'width':s.pageWidth+'px'});
		
		this.obj.find('span.disabled').css({'height':s.height+'px','width':s.prevNextWidth+'px'});
		
		this.obj.find('span.pagecount').css({'width':s.pagecountWidth+'px','height':s.height+2+'px','margin-left':'24px'});
		
		this.obj.find('span.countYe').css({'width':s.trunWidth+'px'});

		this.obj.find('input').css({'height':s.height+'px','width':'52px'});
		
		
		this.obj.find('.tcdNumber').css({'width':s.pageWidth+'px','height':s.height+'px'});
		this.obj.find('.hiding').css({'width':s.pageWidth+'px','height':s.height+'px'});
		
		
	};
	
	
	//绑定事件
	Page.prototype.bindEvent=function(){
		var obj=this.obj;
		var _this=this;
		
			obj.off("click");
			obj.on("click","a.tcdNumber",function(){
				_this.args.current = parseInt($(this).text());
				_this.fillHtml();
			});
			//上一页
			obj.on("click","a.prevPage",function(){
				_this.args.current = parseInt(obj.children("span.current").text())-1;
				_this.fillHtml();
			});
			//下一页
			obj.on("click","a.nextPage",function(){
				_this.args.current = parseInt(obj.children("span.current").text())+1;
				_this.fillHtml();
			});
			//跳转
			obj.on("click","a.turndown",function(){
				var page = _this.args.current = Number(obj.children("span.countYe").children('input').val());
				if(page>_this.args.pageCount){
					alert("页码输入有误，请重新输入！");
					return;
				}
				_this.fillHtml();
			});
		}
		
	//绑定成jQuery插件
	$.fn.createPage=function(fn,args,style){
		var _this=this;
		new Page(_this,fn,args,style);
		return this;
	}
})(jQuery);

