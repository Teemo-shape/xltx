/*
 * label点击变色
 */
//点击全部
var op;

function label0(self) {
	if (self.hasClass('checked')) {
		$('.label').each(function () {
			if ($(this).attr('data-id') != 0) {
				$(this).removeClass('checked').addClass('unchecked');
			}
		})
		self.removeClass('checked').addClass('unchecked');
		op.goods_list.map(function (n) {
			n.type_show = false;
			n.state_show = false;
		});
		op.get_show_list();
		op.paging();
		console.log('全部取消')
	} else {
		$('.label').each(function () {
			if ($(this).attr('data-id') != 0) {
				$(this).removeClass('checked').addClass('unchecked');
			}
		})
		self.removeClass('unchecked').addClass('checked');
		op.goods_list.map(function (n) {
			n.type_show = true;
			n.state_show = true;
		});
		op.get_show_list();
		op.paging();
		console.log('全部选择')
	};
}
//点击类型
function label1(self, id) {
	var list = [];
	$('.label[data-id=0]').removeClass('checked').addClass('unchecked');
	if (self.hasClass('checked')) {
		if (id == 2) {
			if ($('.label[data-id=3]').hasClass('checked')) {
				$('.label[data-id=20],.label[data-id=21]').removeClass('checked').addClass('unchecked');
			} else {
				$('.label[data-id=20],.label[data-id=21],.label[data-id=10],.label[data-id=11],.label[data-id=12],.label[data-id=13]').removeClass('checked').addClass('unchecked');
			}
		} else {
			if ($('.label[data-id=2]').hasClass('checked')) {
				$('.label[data-id=30],.label[data-id=31],.label[data-id=32]').removeClass('checked').addClass('unchecked');
			} else {
				$('.label[data-id=30],.label[data-id=31],.label[data-id=32],.label[data-id=10],.label[data-id=11],.label[data-id=12],.label[data-id=13]').removeClass('checked').addClass('unchecked');
			}
		}
		self.removeClass('checked').addClass('unchecked');
	} else {
		self.removeClass('unchecked').addClass('checked');
	}
	var check_all = true;

	$('.label').each(function () {
		if ($(this).hasClass('checked')) {
			check_all = false;
			list.push($(this).attr('data-id'))
		}
	})
	if (check_all) {
		op.goods_list.map(function (n) {
			n.type_show = false;
			n.state_show = false;
		});
		op.get_show_list();
		op.paging();
		console.log('没有选择')
	} else {
		list_check(list)
		console.log(list)
	}
}
//选择筛选,控制show
function list_check(list) {
	op.goods_list.map(function (n) {
		n.type_show = false;
		n.state_show = false;

	})
	//判断是否有大于10
	var greater10 = false;
	list.map(function (n) {
		if (n - 9 > 0) {
			greater10 = true;
		}
	});
	if (greater10) {
		list.map(function (n) {
			switch (n) {
				case "2":
					op.goods_list.map(function (nn) {
						if (nn.type_goods == 1) {
							nn.type_show = true
						}
					});
					break;
				case "3":
					op.goods_list.map(function (nn) {
						if (nn.type_goods == 2 || nn.type_goods == 3 || nn.type_goods == 4) {
							// 拍卖卖单
							nn.type_show = true;
						}
					});
					break;
				case "10": //草稿
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 1) {
							nn.state_show = true;
						}
					});
					break;
				case "11": //待审核
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 2) {
							nn.state_show = true;
						}
					});
					break;
				case "12": //审核通过
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 3) {
							nn.state_show = true;
						}
					});
					break;
				case "13": //审核被拒
					op.goods_list.map(function (nn) {
						if (nn.state_goods == -1) {
							nn.state_show = true;
						}
					});
					break;
				case "20": //在售
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 4) {
							nn.state_show = true;
						}
					});
					break;
				case "21": //已经下架
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 5) {
							nn.state_show = true;
						}
					});
					break;
				case "30": //等待开拍
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 6) {
							nn.state_show = true;
						}
					});
					break;
				case "31": //竞拍中
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 7) {
							nn.state_show = true;
						}
					});
					break;
				case "32": //已结束
					op.goods_list.map(function (nn) {
						if (nn.state_goods == 8) {
							nn.state_show = true;
						}
					});
					break;
			}
		});
	} else {
		list.map(function (n) {
			if (n == "2") {
				op.goods_list.map(function (nn) {
					if (nn.type_goods == 1) {
						//普通卖单
						nn.type_show = true;
						nn.state_show = true
					}
				})
			}
			if (n == "3") {
				op.goods_list.map(function (nn) {
					if (nn.type_goods == 2 || nn.type_goods == 3 || nn.type_goods == 4) {
						// 拍卖卖单
						nn.type_show = true;
						nn.state_show = true
					}
				})
			};
		});
	}
	op.get_show_list();
	op.paging();
}
//点击状态
function label2(self, type) {
	var list = [];
	$('.label[data-id=0]').removeClass('checked').addClass('unchecked');
	if (self.hasClass('checked')) {
		self.removeClass('checked').addClass('unchecked');
	} else {
		switch (type) {
			case 1:
				if ($('.label[data-id=2]').hasClass('checked') || $('.label[data-id=3]').hasClass("checked")) {

				} else {
					$('.label[data-id=2]').removeClass('unchecked').addClass('checked');
					$('.label[data-id=3]').removeClass('unchecked').addClass('checked');
				}
				self.removeClass('unchecked').addClass('checked');
				break;
			case 2:
				$('.label[data-id=2]').removeClass('unchecked').addClass('checked');
				self.removeClass('unchecked').addClass('checked');
				break;
			case 3:
				$('.label[data-id=3]').removeClass('unchecked').addClass('checked');
				self.removeClass('unchecked').addClass('checked');
				break;
		}

	};
	//总体计算
	var check_all = true;
	$('.label').each(function () {
		if ($(this).hasClass('checked')) {
			check_all = false;
			list.push($(this).attr('data-id'))
		}
	})
	if (check_all) {
		console.log('没有选择')
	} else {
		list_check(list)
		console.log(list)
	}
}

$('body').on('click', '.label', function () {
	var self = $(this);
	var list = [];
	switch (self.attr('data-id')) {
		//点击全部
		case "0":
			label0(self);
			break;
			//点击类型
		case "2":
			label1(self, 2);
			break;
		case "3":
			label1(self, 3);
			break;
			//end 点击类型
		case "10":
			label2(self, 1);
			break;
		case "11":
			label2(self, 1);
			break;
		case "12":
			label2(self, 1);
			break;
		case "13":
			label2(self, 1);
			break;
		case "20":
			label2(self, 2);
			break;
		case "21":
			label2(self, 2);
			break;
		case "30":
			label2(self, 3);
			break;
		case "31":
			label2(self, 3);
			break;
		case "32":
			label2(self, 3);
			break;
	}

});

//筛选选项
function checked_list() {
	var list = [];
	$('.label').each(function () {
		if ($(this).hasClass('checked') && $(this).attr('data-id') > 9) {
			list.push($(this).attr('data-id'))
		}
	})

	return list;
}
$(".label").click(function () {

	//	$(this).parents(".state_list").find(".label").removeAttr("disabled").removeClass("checked").addClass("unchecked");
	//	$(this).attr("disabled","disabled").removeClass("unchecked").addClass("checked");
});

/*
 * 发布显示
 */
$(".actions").find(".publish").click(function (e) {
	$(".actions_cont").show();
	return false;
})

$(".actions_cont").find("a").hover(function () {
	$(this).css("background", "#e5e5e5").siblings().css("background", "none");
}, function () {
	$(this).css("background", "none");
})

$("body").click(function () {
	$(".actions_cont").hide();
})

/*
 * 分页
 */


/*
 * 回到顶部
 */
$("#goTop").click(function () {
	$("html,body").animate({
		scrollTop: 0
	}, 300);
})
//我要发布
$('body').on('mouseenter', '#iwannaRelease', function () {
	$('.publish_list').show()
});
$('body').on('mouseleave', '#iwannaRelease', function () {
	$('.publish_list').hide()
});
//vue 渲染
var a = 0;
var op = new Vue({
	el: '#app',
	data: {
		//公用数据
		goods_list: [], //初始加载所有的数据列表
		show_list: [], //每次数据更新,筛选选择新的列表,展示列表
		page_list_max: 10, //每页显示条数
		page_num: 0, //当前显示的页数
		// 公用方法
		//获取图片地址
		get_img_src: function (id, index) {
			var self = this;
			var isFirst = true
			for (var i = 0; i < self.goods_list.length; i++) {
				var n = self.goods_list[i];
				if (n.name_pic_small == id && n.img_src == "nopic") {
//					Mock.mock(`goods/picture?filename=${id}`, {
//						src: "/img/order_01.png"
//					});
					$.ajax({
						url: ctx + "/goods/picture?filename=" + id,
						dataType: 'json',
						async: false,
						success: function (e) {
							if(e.res == "s"){
								n.img_src = "" + e.data;
								self.show_list[index].img_src = "data:image;base64," + e.data;
								console.log(`第${a++}次图片请求`);
							}
						}
					})
				}
			}
		},

		//分页功能
		paging: function () {
			var self = this;
			var pageCount = 0;
			pageCount = Math.ceil(self.show_list.length / self.page_list_max);
			$(".paging").createPage(function (n) {
				self.page_num = n - 1;
				console.log(self.page_num);
			}, {
				pageCount: pageCount, //总页码,默认10
				showTurn: false,
				showSumNum: false,
				showNear: 2, //显示当前页码前多少页和后多少页，默认2
			}, {
				prevNextWidth: 40,
				pagecountWidth: 100
			});
		},
		//从新整合显示列表
		get_show_list: function () {
			var self = this;
			var show_list = [];
			self.goods_list.map(function (n) {
				if (n.state_show && n.type_show) {
					show_list.push(n);
				}
			})
			self.show_list = show_list;
		},
		//时间戳转时间
		stamp_time:function(timestamp){
			var self=this;
			//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
			var time = new Date(timestamp);
			var year = time.getFullYear();
			var month = time.getMonth()+1;
			var date = time.getDate();
			var hours = time.getHours();
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			return year+'-'+self.add0(month)+'-'+self.add0(date)+' '+self.add0(hours)+':'+self.add0(minutes);
			return time
		},
		add0:function(m){return m<10?'0'+m:m }
	},
	mounted: function () {
		$('#app').show();
		//一般这里写页面初始化
		var self = this;
//		Mock.mock('goods/list/query', {
//			"data|40": [{
//				"id_goods_revision|19744030819631726-89744030819631726": 0, //草稿编号，这个数字肯定会有。。后续这个编号和商品编号将会采用非自增的ID生成机制，可具有产品的数字非可读性
//				"id_goods": 0, //商品编号，在商品未上架时（还是草稿、审核通过也算草稿）没有这个编号，有这个编号则在界面上显示商品编号，否则显示为草稿编号
//				"name_goods": '@csentence(10)', //商品名称
//				"state_goods|-1-8": 0, //商品状态：草稿时对应的有：-1被拒，0无意义，草稿1、等待审核2、审核通过待上架3，同一个id_goods（0除外，表示新建的卖单）只允许有一条记录存在，因为在售的商品只允许有一个新版草稿；商品时对应的有：-2库存紧张，0无意义，上架中4、下架或拍卖结束5
//				//第一行：草稿1，待审核2，审核通过3，审核被拒-1
//				// 第二行：在售4，已下架5
//				// 第三行：等待开拍6，竞拍中7，竞拍结束8
//				"type_goods|1-4": 1, //商品类型：1为普通商品，其它为拍卖：2荷兰式，3竞价式，4沽价式
//				"revision": 1, //草稿提交号，初始为1，每次提交加1
//				"ltm_audit": '@date("yyyy-MM-dd")', //审核时间点，长整型，备用，可能会显示到界面
//				"ltm_last_save|150000000000-1520472619534": 0, //最后保存时间，显示在列表中
//				"name_pic_small": "@id()", //列表中展示的一张商品介绍图（小图），介绍图最多有4张，取第1张
//				"price_low|1-100": 222, //列表中展示的商品价格，因商品对应多个物料多个不同的价格，因此展示的是一个范围，此值为范围中的较小值，如果跟较大值相等，展示一个价格即可，这时不需要展示范围，比如0.55-3
//				"price_high|1-100": 222, //价格范围中的较大值
//				"quantity_enable_low|1-100": 222, //列表中展示的商品可售数量，因商品对应多个物料多个不同的数量，因此展示的是一个范围，此值为范围中的较小值，如果跟较大值相等，展示一个数量即可，这时不需要展示范围
//				"quantity_enable_high|1-100": 222 //可售数量范围中的较大值
//			}]
//		})

		$.ajax({
			url: ctx + '/goods/list/query',
			type:'GET',
			dataType: 'json',
			success: function (e) {
				//给每条数据添加字段
				//show:true,方便判断是否显示
				//img_src:'',显示时再从后台拉取数据
				e.data.map(function (n) {
					n.state_show = true;
					n.type_show = true;
					n.img_src = 'nopic';
				})
				self.goods_list = e.data;
				self.show_list = e.data;
				console.log(self.goods_list);
				self.paging()
			}
		})
		//console.log(this.goods_list)
	},

	//完成数据更新
	updated: function () {
		//每次数据更新后改变bg高度
		$('.bg').height($('.container').height())
		
	},
	//页面中数据操作
	mothods: {

	},
})