var timer = null;
var ctx = "";

//居中显示遮罩层
verticalHorizontalCenter($("#loading"));

//点击其他地方隐藏弹出的select
$(document).click(function () {
	//隐藏物料列表
	$(".tmpls_cont").hide();
	//隐藏参数select
	$(".models").hide();
	//隐藏添加参数
	$(".edit_param").hide();
});

var app = new Vue({
	el: "#app",
	data: {
		loading: {
			materiel_info: false,
			materiel_img: false
		},	/* 是否加载完成 */
		prev_img_list: [],	/* 预览图列表 */
		pick_list: [],	/* 物料列表 */
		zoom: false,	/* 是否设置中大图 */
		select_img: null,	/* 选中的预览图 */
		has_pick_list: false,	/* 是否有物料 */
		min_price: 999999,	/* 最低价格,当最低价格等于最高价格时只有一种价格 */
		max_price: 0,	/* 最高价格 */
		materiel_params: {},	/* 所有物料的所有参数 */
		current_params: [],	/* 当前显示的参数列表 */
		materiel_imgs: {},	/* 物料的所有图片 */
		current_materiel: {},	/* 当前选中的物料 */
		models_show: false	/* 详细信息中select显示状态 */
	},
	methods: {
		/**
		 * 加载物料信息，物料图片，物料参数
		 * @param {Number} id_goods_revision 商品id
		 */
		loadMaterielInfo: function(id_goods_revision){
			var self = this;
			$.ajax({
				type: "get",
				url: ctx + "/goods/comm/materiels/" + id_goods_revision,
				async: false,
				cache: false,
				success: function (result) {
					if (handleResponseData(result)) {
						if (result.RES=="SUCCESS") {
							if(!result.DATA)
								return;
								
							self.has_pick_list = true;
							var list = result.DATA;
							for (var i = 0, len = list.length; i < len; i++) {
								list[i].check_on = false;	//物料选中状态参数
								list[i].explain_show = false;	//显示优惠参数
							}
							self.pick_list = list;
							//根据加载的数据来进行页面渲染, 首先显示物料列表，然后显示参数和图片， 默认显示第一条物料的参数和图片
							$.each(result.DATA, function(index,materielItem) {
								//价格转换为人民币模式，比较得出价格范围
								//比较得出价格区间
								self.min_price = Math.min(materielItem["price"],self.min_price);
								self.max_price = Math.max(materielItem["price"],self.max_price);
								if (materielItem.prices) {
									$.each(materielItem.prices, function(num,price) {
										self.min_price = Math.min(price[1],self.min_price);
										self.max_price = Math.max(price[1],self.max_price);
									});
								}
								
								//第一种物料，默认详情列表
								var id_materiel = materielItem.id_goods_materiel;
								if (index==0){
									self.current_materiel = materielItem;
									//改变参数列表样式
									self.getModelInfo(id_materiel,true);
								} else {	//其他物料详情，select选中显示
									//更新参数数据
									self.getModelInfo(id_materiel,false);
								}
								
								//更新图片数据
								for (var i=5;i<12;i++) {
									self.getMatetielImg(id_materiel,i);
								}
							});
							
							//判断是否全部(预览图，物料等)加载完成
							loadCheck("materiel_info");
						} else if (result.RES=="FAIL"){
							loadCheck("materiel_info");
							
							alert(result.MSG, {
								theme: "danger"
							});
						}
					}	
				},
				error: function (xhr, status, et) {
					loadCheck("materiel_info");
					
					alert("网络异常，请重试一次！", {
						theme: "danger"
					});
					console.log(et);
				}
			});
		},
		/**
		 * 加载预览图
		 * @param {Number} id_goods_revision 商品id
		 */
		loadGoodsPics: function (id_goods_revision) {
			var self = this;
			$.ajax({
				type: "get",
				url: ctx + "/goods/comm/pics/" + id_goods_revision,
				async: false,
				cache: false,
				success: function (result) {
					if (handleResponseData(result)) {
						if (result.RES=="SUCCESS") {
							if(!result.DATA)
								return;
							//预览图列表赋数据
							self.prev_img_list = result.DATA;
							//根据加载的数据来进行页面渲染, result.DATA是商品预览图列表： result.DATA[i].pic_name   result.DATA[i].imgData result.DATA[i].index
							if (result.DATA.length) {
								self.zoom = true;
								self.select_img = result.DATA[0].imgData;
								window.onload = function () {
									$(".tb_zoom").imagezoom();
								};
							}
							//显示图片
							$.each(result.DATA, function(index,imgItem) {
								var img = '<img name="'+imgItem.pic_name+'" src="'+imgItem.imgData+'" mid="'+imgItem.imgData+'" big="'+imgItem.imgData+'"/>';
								var eleParent = $(".thumb_item").eq(index);
								eleParent.append(img);
							});
							
							//判断是否全部(预览图，物料等)加载完成
							loadCheck("materiel_img");
						} else if (result.RES=="FAIL"){
							loadCheck("materiel_img");
							
							alert(result.MSG, {
								theme: "danger"
							});
						}
					}	
				},
				error: function (xhr, status, et) {
					loadCheck("materiel_img");
					
					alert("网络异常，请重试一次！", {
						theme: "danger"
					});
					console.log(et);
				}
			});
		},
		/**
		 * 判断是否全部(预览图，物料等)加载完成
		 * @param {Object} loading_key loading对象的指定属性值
		 */
		loadCheck: function (loading_key) {
			self.loading[loading_key] = true;
			var loadFlag = true;
			for (let key in self.loading) {
				loadFlag = loadFlag && self.loading[key];
			}
			if (loadFlag) {
				loadingHide();
			}
		},
		/**
		 * 是否选中物料
		 * @param {Number} index 物料序号
		 */
		fun_check: function (index) {
			var self = this;
			var item = self.pick_list[index];
			item.check_on = !item.check_on;
		},
		/**
		 * 获取参数信息
		 * @param {Number} id 参数id
		 * @param {Boolean} flag 是否添加至参数列表
		 */
		getModelInfo: function (id,flag) {
			var self = this;
			$.ajax({
				type: "get",
				url: ctx + "/goods/comm/materiels/params/"+ id,
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				async:false,
				cache:false,
				success:function (result) {
					if (handleResponseData(result)) {
						if (result.RES=="SUCCESS") {
							if(!result.DATA) {
								if (flag) {
									self.current_params = [];
								}
								self.materiel_params[id] = [];
								return;
							}
							if (flag) {
								self.current_params = result.DATA;
							}
							self.materiel_params[id] = result.DATA;
						} else if (result.RES=="FAIL"){
							alert(result.MSG, {
								theme: "danger"
							});
						}
					}
				},
				error: function (xhr, status, et) {
					alert("网络异常，请重试一次！", {
						theme: "danger"
					});
					console.log(et);
				}
			});
		},
		/**
		 * 获取物料图片
		 * @param {Number} id_materiel 物料id
		 * @param {Number} i 物料图片index
		 */
		getMatetielImg: function (id_materiel,i) {
			var self = this;
			var getUrl = ctx + "/goods/comm/materiels/pic/"+ id_materiel + "/" + i;
			$.ajax({
				type: "get",
				url: getUrl,
				dataType: "json",
				contentType: "application/json",
				async: false,
				cache: false,
				success: function (result) {
					if (handleResponseData(result)) {
						if (result.RES=="SUCCESS") {
							if(!result.DATA){
								self.materiel_imgs["" + id_materiel + i] = null;
								return;
							}
							//生成base64图片
							result.DATA.imgData = "" + result.DATA.imgData;
							//更新materiel_imgs
							self.materiel_imgs["" + id_materiel + i] = result.DATA;
						}
					}
				}
			});
		},
		/**
		 * 改变物料详细信息
		 * @param {Number} id 点击的物料id
		 */
		changeMaterielInfo: function (index,event) {
			var self = this;
			var click_id = self.pick_list[index].id_goods_materiel;
			var materiel_id = self.current_materiel.id_goods_materiel;
			
			//如果选中的结果未变化,不操作
			if (click_id == materiel_id) {
				return;
			}
			
			//选中效果,更新图片
			self.current_materiel = self.pick_list[index];
			self.models_show = false;
			//更新参数
			self.current_params = self.materiel_params[click_id];
			if (self.materiel_params[click_id].length) {
				self.has_pick_list = true;
			} else{
				self.has_pick_list = false;
			}
			
			stopBubble(event);
		}
	},
	//初始化获取数据
	mounted: function () {	//加载物料、物料图片及参数
		var self = this;
		var id_goods_revision = window.id_goods_revision;
		loadingShow();
		self.loadGoodsPics(id_goods_revision);
		self.loadMaterielInfo(id_goods_revision);
	},
	updated: function () {
		
	}
});

/**
 * 加载动画出现
 */
function loadingShow () {
	$("#loading").show();
	$(".full_bg").show();
}

/**
 * 加载动画消失
 */
function loadingHide () {
	$("#loading").hide();
	$(".full_bg").hide();
}

/**
 * 垂直水平居中
 * @param {Object} ele jq对象
 */
function verticalHorizontalCenter (ele) {	
	ele.css({"transform": "translate(-50%,-50%)", "top": "50%", "left": "50%"});
}

//垂直水平居中自适应
window.onresize = function () {
	verticalHorizontalCenter($("#loading"));
}

/*
 * 放大镜
 */
$(".thumb_item").hover(function(){
	$(this).addClass("tb-selected").siblings().removeClass("tb-selected");
	$(".tb_zoom").attr('src',$(this).find("img").attr("mid"));
	$(".tb_zoom").attr('rel',$(this).find("img").attr("big"));
});

//滚动菜单
var set_arrow = null;
var canScroll = true;
$(window).scroll(function () {
	var liid = 0;
	clearTimeout(set_arrow);
	$('.arrow').stop(true);
	set_arrow = setTimeout(function () {
		if (shouldShow()) {
			$(".side-catalog").show();
			//滚动时计算
			$('.skip').each(function () {
				var flag = true;
				if ($(this).offset().top < $(document).scrollTop() + 100) {
					if (flag) {
						liid = $(this).attr('id');
						flag = false;
					}
				}
			});
			if (canScroll && Boolean(liid)) {
				//调整箭头位置
				var top = $("[href='#" + liid + "']").offset().top - $('.side-catalog').offset().top - 22 + $(".catalog-list").scrollTop();
				$('.arrow').animate({
					'top': top
				});
			}
		} else {
			var top = $("[href='#1_1']").offset().top - $('.side-catalog').offset().top - 22 + $(".catalog-list").scrollTop();
			$('.arrow').animate({
				'top': top
			},0,function () {
				$(".side-catalog").hide();
			});
		}
	}, 50);
});

//判断目录出现和消失
function shouldShow () {
	var scrollH = $(window).scrollTop(),
		winH = $(window).height(),
		top = $("#1_1").offset().top;
	if(top < scrollH + 100){
  		return true;
  	}else{
  		return false;
  	}
}

//点击后指针随之变动
$(".title-link").click(function (e) {
	canScroll = false;
	var _that = $(this);
	var top = $(this).offset().top - $('.side-catalog').offset().top - 22 + $(".catalog-list").scrollTop();
	$('.arrow').animate({
		'top': top
	},200,function () {
		setTimeout(function () {
			canScroll = true;
		},100);
		location.href = _that.attr("href");
	});
	stopDefault(e);
});

//上下按钮出现消失
$(".side-catalog").hover(function () {
	$(".right-wrap").show();
},function () {
	$(".right-wrap").hide();
});

//菜单上下
//TODO 判断是否可点击
$('body').on('click', '.go-up', function () {
	$(".catalog-list").animate({
		scrollTop: $(".catalog-list").scrollTop() - 50
	}, 300)
});
$('body').on('click', '.go-down', function () {
	$(".catalog-list").animate({
		scrollTop: $(".catalog-list").scrollTop() + 50
	}, 300)
});

//目录隐藏出现
$(".toggle-button").click(function () {
	$(this).attr("disabled","disabled");
	
	if ($(".catalog-scroller").css("visibility") == "visible") {
		$(".side-bar").css("visibility", "hidden");
		$(".catalog-scroller").css("visibility", "hidden");
		$(".right-wrap").css("visibility", "hidden");
	} else{
		$(".side-bar").css("visibility", "visible");
		$(".catalog-scroller").css("visibility", "visible");
		$(".right-wrap").css("visibility", "visible");
	}
	$(this).removeAttr("disabled");
}).hover(function () {
	$(this).css({"border": "solid 1px #e9e9e9", "background": "#f8f8f8"});
},function () {
	$(this).css({"border": "solid 1px #d1d1d1", "background": "#fff"});
});

//回到顶部
$(".gotop-button").click(function () {
	$("html,body").animate({scrollTop:0}, 500);
}).hover(function () {
	$(this).css("background", "#999");
},function () {
	$(this).css("background", "#d1d1d1");
});

//参数信息
$(".selected_cont").click(function (e) {
	$(".models").toggle();
	stopBubble(e);
});



/**
 * 将数字转化为两位小数
 * @param {String} str 输入的数字
 */
function changeToRmb (str) {
	return parseFloat(str).toFixed(2);
}