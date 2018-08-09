var ctx = "";

// 加载头部
$("header").load("header.html");

//VUE布局
var app = new Vue({
	el: "#app",
	data: {
		loading: {
			materiel_info: false,
			materiel_img: false
		},	/* 是否加载完成 */
		prev_img_list: [],	/* 预览图列表 */
		select_img: null,	/* 选中的预览图 */
		min_price: 999999,	/* 最低价格,当最低价格等于最高价格时只有一种价格 */
		max_price: 0,	/* 最高价格 */
		pick_list: [],	/* 物料列表 */
		total_quantity: 0, //总数量
		total_price: 0, //总价格 
		model_list_show:false,	//已选列表显示参数
		accord: true, //点击""立即购买" 或"加入购物车" 判断pick_model_vue.accord:true,符合选择,false,阻止提交
		hascheck_on:0,//已选择的数量
		activeName: 'first', /* 默认选中的tab栏，和tab对应 */
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
								
							var list = result.DATA;
							for (var i = 0, len = list.length; i < len; i++) {
								list[i].check_on = false;	//物料选中状态参数
								list[i].explain_show = false;	//显示优惠参数
								list[i].quantity_number = 0;	//已选数量
								list[i].list_price = 0;	//总体价格
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
							self.loading.materiel_info = true;
							var loadFlag = true;
							for (let key in self.loading) {
								loadFlag = loadFlag && self.loading[key];
							}
							if (loadFlag) {
								loadingHide();
							}
						} else if (result.RES=="FAIL"){
							//判断是否全部(预览图，物料等)加载完成
							self.loading.materiel_info = true;
							var loadFlag = true;
							for (let key in self.loading) {
								loadFlag = loadFlag && self.loading[key];
							}
							if (loadFlag) {
								loadingHide();
							}
							alert(result.MSG, {
								theme: "danger"
							});
						}
					}	
				},
				error: function (xhr, status, et) {
					//判断是否全部(预览图，物料等)加载完成
					self.loading.materiel_info = true;
					var loadFlag = true;
					for (let key in self.loading) {
						loadFlag = loadFlag && self.loading[key];
					}
					if (loadFlag) {
						loadingHide();
					}
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
							self.select_img = result.DATA[0].imgData;
							window.onload = function () {
								$(".tb_zoom").imagezoom();
							};
							//显示图片
							$.each(result.DATA, function(index,imgItem) {
								var img = '<img name="'+imgItem.pic_name+'" src="'+imgItem.imgData+'" mid="'+imgItem.imgData+'" big="'+imgItem.imgData+'"/>';
								var eleParent = $(".thumb_item").eq(index);
								eleParent.append(img);
							});
							
							//判断是否全部(预览图，物料等)加载完成
							self.loading.materiel_img = true;
							var loadFlag = true;
							for (let key in self.loading) {
								loadFlag = loadFlag && self.loading[key];
							}
							if (loadFlag) {
								loadingHide();
							}
						} else if (result.RES=="FAIL"){
							//判断是否全部(预览图，物料等)加载完成
							self.loading.materiel_img = true;
							var loadFlag = true;
							for (let key in self.loading) {
								loadFlag = loadFlag && self.loading[key];
							}
							if (loadFlag) {
								loadingHide();
							}
							alert(result.MSG, {
								theme: "danger"
							});
						}
					}	
				},
				error: function (xhr, status, et) {
					//判断是否全部(预览图，物料等)加载完成
					self.loading.materiel_img = true;
					var loadFlag = true;
					for (let key in self.loading) {
						loadFlag = loadFlag && self.loading[key];
					}
					if (loadFlag) {
						loadingHide();
					}
					alert("网络异常，请重试一次！", {
						theme: "danger"
					});
					console.log(et);
				}
			});
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
								self.current_params = [];
								self.materiel_params.id = [];
								return;
							}
							if (flag) {
								self.current_params = result.DATA;
							}
							self.materiel_params.id = result.DATA;
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
		 * 是否选中物料
		 * @param {Number} index 物料序号
		 */
		fun_check: function (index) {
			var self = this;
			var item = self.pick_list[index];
			item.check_on = !item.check_on;
			self.fun_total();
		},
		/**
		 * 增加数量
		 * @param {Number} index 物料序号
		 */
		fun_quantity_number_add: function (index) {
			var self = this;
			var item = self.pick_list[index];
			item.quantity_number = Number(item.quantity_number) + item.quantity_step;
			self.fun_min_max(index);
		},
		/**
		 * 减少选择的数量
		 * @param {Object} index 物料序号
		 */
		fun_quantity_number_sub: function (index) {
			var self = this;
			var item = self.pick_list[index];
			item.quantity_number = item.quantity_number - item.quantity_step;
			self.fun_min_max(index);
		},
		/**
		 * 根据输入数字显示提示信息
		 * @param {Number} index 物料序号
		 */
		fun_input_info: function (index) {
			var self = this;
			var item = self.pick_list[index];
			$('#tip_' + index + " .tooltip").remove();
			self.accord = true;
			if (item.quantity_number < item.quantity_minimum) {
				//小于最小起订量
				tip = '<div class="tooltip">' +
					'<div class="tip-content bottom">不能小于起订量</div>' +
					'<div class="tip-arrow bottom"></div>' +
					'</div>';
				$('#tip_' + index).append(tip);
				self.accord = false;
			} else {
				if (item.quantity_number > item.quantity_enable) {
					tip = '<div class="tooltip">' +
						'<div class="tip-content bottom">不能大于可售量</div>' +
						'<div class="tip-arrow bottom"></div>' +
						'</div>';
					$('#tip_' + index).append(tip);
					self.accord = false;
				} else {
					if ((item.quantity_number - item.quantity_minimum) % item.quantity_step != 0) {
						tip = '<div class="tooltip">' +
							'<div class="tip-content bottom">必须是增长量的整数倍</div>' +
							'<div class="tip-arrow bottom"></div>' +
							'</div>';
						$('#tip_' + index).append(tip);
						self.accord = false;
					}
				}
			}

			self.fun_total();
		},
		/**
		 * 判断是否小于或溢出
		 * @param {Number} index 物料序号
		 */
		fun_min_max: function (index) {
			var self = this;
			var item = self.pick_list[index];
			item.quantity_number = item.quantity_number > item.quantity_minimum ? item.quantity_number : item.quantity_minimum;
			item.quantity_number = item.quantity_number < item.quantity_enable ? item.quantity_number : item.quantity_enable;
			self.fun_total()
		},
		/**
		 * 计算总价格总数量
		 */
		fun_total: function () {
			var self = this;
			var total_quantity = 0; //总数量
			var total_price = 0; //总价格
			var hascheck_on=0//已选择的总数量
			for (var i = 0; i < self.pick_list.length; i++) {
				var n = self.pick_list[i];
				if (n.check_on) {
					//计算总数量
					total_quantity = total_quantity + Number(n.quantity_number);
					hascheck_on=hascheck_on+1;
					//计算总价格
					if (n.prices) {
						//有梯度
						if (n.prices[0][0] > n.quantity_number) {
							//如果直接小于最小梯度
							n.list_price=Number((n.price * n.quantity_number).toFixed(2))
							total_price = total_price + n.list_price;
						} else {
							for (var ii = n.prices.length - 1; ii >= 0; ii = ii - 1) {
								if (n.prices[ii][0] < n.quantity_number) {
									n.list_price=Number((n.prices[ii][1] * n.quantity_number).toFixed(2));
									total_price = total_price + n.list_price;
									break;
								}
							}
						}
					} else {
						//没有梯度
						n.list_price=Number(n.price * n.quantity_number).toFixed(2);
						total_price = total_price + n.list_price;
					}
				}
			}
			self.total_quantity = total_quantity;
			self.total_price = total_price
			self.hascheck_on=hascheck_on;
		},
		/**
		 * 切换tabs触发
		 * @param {Object} tab tabdom对象
		 * @param {Object} event event对象
		 */
		handleClick: function (tab, event) {
        	console.log(tab, event);
      	},
		/**
		 * 改变物料详细信息
		 * @param {Number} id 点击的物料id
		 */
		changeMaterielInfo: function (index) {
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
		}
	},
	//初始化获取数据
	mounted: function () {	//加载物料、物料图片及参数
		var self = this;
		var id_goods_revision = $("input[name='id_goods_revision']").val();
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

$("#thumblist li").hover(function () {
	$(this).addClass("tb-selected").siblings().removeClass("tb-selected");
	$(".tb_zoom").attr('src', $(this).find("img").attr("mid"));
	$(".tb_zoom").attr('rel', $(this).find("img").attr("big"));
});

// 加入购物车
$(".shop_car").click(function () {
	$(".add_success").show();
});

//隐藏购物车
$(".add_success").find(".delete").click(function () {
	$(".add_success").hide();
});

/*
 * 分页
 */
$(".paging").createPage(function (n) {
	console.log(n);
}, {
	showTurn: false,
	showSumNum: false
});

/*
 * 我要咨询
 */
$(".seekAdvice").click(function () {
	$(".write_advice").show();
});
$(".write_advice").find(".cancle").click(function () {
	$(".write_advice").hide();
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