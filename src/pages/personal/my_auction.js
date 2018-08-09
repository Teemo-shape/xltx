import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../static/js/libs/jquery-1.9.1.min.js'
import '../../../static/js/plugins/jquery.pages.js'

Vue.config.productionTip = false //阻止提示
Vue.use(ElementUI);

new Vue({
	el: '#app',
	data: {
		menu_name: 'my_auction', //  左侧菜单选中值
		loading: true,	//加载中
		auction_list: [], //所有订单
		select_state: {
			bail: "returnTrue",
			order: "returnTrue"
		}, //  选中的状态
		state_show: {
			state: {
				bail: false,
				order: false
			},
			text: {
				bail: "保证金状态",
				order: "订单状态"
			}
		},	//显示状态列表
		bail_list: [
			{
				text: "保证金状态",
				check: "returnTrue"
			},
			{
				text: "已缴纳，生效中",
				check: "paid"
			},
			// {
			// 	text: "待退还",
			// 	check: "beReturn"
			// },
			// {
			// 	text: "已退还",
			// 	check: "returned"
			// },
			// {
			// 	text: "退还失败",
			// 	check: "returnFail"
			// },
			{
				text: "罚没",
				check: "deducted"
			}
		],
		order_list: [
			{
				text: "订单状态",
				check: "returnTrue"
			},
			{
				text: "等待开拍",
				check: "beAuction"
			},
			{
				text: "拍卖中",
				check: "auctioning"
			},
			{
				text: "待买家确认拍品",
				check: "confirmGoods"
			},
			{
				text: "待买家确认收款",
				check: "confirmReceipt"
			},
			{
				text: "待卖家确认收款",
				check: "waitReceipt"
			},
			{
				text: "交易完成",
				check: "confirmSuccess"
			},
			{
				text: "弃拍",
				check: "tradeClose"
			}
		],
		page_index: 1, //当前页码
		page_num: 10,	//每页显示数量
	},
	components: {
		headerCart,
		leftMenu,
		commonFooter
	},
	mounted() {
		var self = this;
		self.select_state = {
			bail: "returnTrue",
			order: "returnTrue"
		};
		self.loadAuctions();
		//动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
		//回到顶部
		$("#goTop").click(function () {
			$("html,body").animate({scrollTop:0}, 300);
		})
	},
	methods: {
		/**
		 * 初始化拍卖订单数据
		 */
		loadAuctions: function () {
			var self = this;
			$.ajax({
				url: ctx + '/buyers/list/query',
				type: 'get',
				cache: false,
				async: true,
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				success: function (data) {
					if (data.res == 's') {
						if (data.data) {
							data.data.map(function (n){
								//订单日期
								if (Boolean(n.ltm_order_create)) {
									n.over_time = self.changeTime(n.ltm_order_create);
								} else if (n.ltm_deposit_create) {
									n.over_time = self.changeTime(n.ltm_deposit_create);
								}
								//倒计时
								if (Boolean(n.ltm_expired_at)) {
									n.count_down = self.countDown(n.ltm_expired_at);
								}
								//是否显示卖家信息
								n.seller_show = false;
								//是否显示卖家信息
								n.seller_info = {
									seller_name: "",
									seller_contact: "",
									seller_phone: "",
									seller_email: "",
									seller_address: "",
									state: false,
									data: false
								};
								//保证金状态修改时间点
								n.bail_info = {
									data: [],
									state: false
								};
								//是否显示保证金信息
								n.bail_show = false;
							})
							self.auction_list = data.data;
							//分页
							$(".paging").createPage(function(n){
									self.page_index = n;
							},{
								pageCount: Math.ceil(self.all_select_list.length/self.page_num),	//总页数
								showTurn:false,	//不显示跳转
								showSumNum:false,	//不显示总页码
							});
							self.loading = false;
						}
					}
					if (data.res == 'f') {
						self.$message({
							message: data.msg,
							type: "error"
						})
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			})
		},
		/**
		 * 时间戳转化年月日
		 * @param {Number} timestamp 13位的时间戳
		 */
		changeTime: function (timestamp){
			let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear();
			let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
			let D = (date.getDate()<10? '0'+date.getDate():date.getDate());
			return Y + "-" + M + "-" + D;
		},
		/**
		 * 时间戳转化年月日时分秒
		 * @param {Number} timestamp 13位的时间戳
		 */
		timestampToTime: function (timestamp) {
			var date = new Date(timestamp);
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			let D = date.getDate() < 10 ? '0'+ date.getDate() + ' ' : date.getDate() + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes() + ':';
			let s = date.getSeconds();
			return Y+M+D+h+m+s;
		},
		/**
		 * 显示卖家信息
		 * @param {Number} index 订单索引
		 */
		sellerShow: function (index) {
			var self = this;
			self.current_auction[index].seller_show = true;
			if (!self.current_auction[index].seller_info.state) {
				$.ajax({
					url: ctx + '/buyers/saler/info/' + self.current_auction[index].id_company_sales,
					type:"get",
					dataType: "json",
					contentType: "application/json;charset=utf-8",
					cache:false,
					asyns:true,
					success:function (result) {
						if (handleResponseData(result)) {
							if (result.res=="s") {
								if (result.data) {
									self.current_auction[index].seller_info = {
										seller_name: result.data.company_name,
										seller_contact: result.data.contact,
										seller_phone: result.data.phone,
										seller_email: result.data.email,
										seller_address: result.data.company_address,
										state: true,
										data: true
									}
									self.current_auction[index].seller_show = true;
								} else {
									self.current_auction[index].seller_info = {
										seller_name: "",
										seller_contact: "",
										seller_phone: "",
										seller_email: "",
										seller_address: "",
										state: true,
										data: false
									}
								}
							} else if (result.res=="f"){
								self.$message({
									message: data.msg,
									type: "error"
								})
							}
						}	
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log(errorThrown);
					}
				})
			}
		},
		/**
		 * 倒计时
		 * @param {Number} timestamp 13位的时间戳
		 */
		countDown: function (timestamp) {
			var current_time = new Date().getTime();
			var differ = timestamp - current_time;
			var timeStr = "";
			if (differ > 0) {
				var day = parseInt(differ / (1000 * 60 * 60 * 24));
				var hour = parseInt((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var min = parseInt((differ % (1000 * 60 * 60)) / (1000 * 60));
				if (day) {
					timeStr += day + "天";
				}
				if (hour < 10) {
					hour = "0" + hour;
				}
				if (min < 10) {
					min = "0" + min;
				}
				timeStr += hour + "小时" + min + "分";
				if (differ < 60000) {
					timeStr = "少于一分钟";
				}
			}
			return timeStr;
		},
		/**
		 * 切换保证金状态
		 */
		bailStateChange: function (index) {
			var self = this;
			self.select_state.bail = self.bail_list[index].check;
			self.state_show.state.bail = false;
			self.state_show.text.bail = self.bail_list[index].text;
		},
		/**
		 * 切换订单状态
		 */
		orderStateChange: function (index) {
			var self = this;
			self.select_state.order = self.order_list[index].check;
			self.state_show.state.order = false;
			self.state_show.text.order = self.order_list[index].text;
		},
		bailShow: function (index) {
			var self = this;
			self.current_auction[index].bail_show = true;
			if (!self.current_auction[index].bail_info.state) {
				$.ajax({
					url: ctx + '/buyers/deposit/' + self.current_auction[index].id_deposit,
					type:"get",
					dataType: "json",
					contentType: "application/json;charset=utf-8",
					cache:false,
					asyns:true,
					success:function (result) {
						if (handleResponseData(result)) {
							if (result.res=="s") {
								if (result.data) {
									result.data.map(function (n) {
										n.createTime = self.timestampToTime(n.ltm_state_create);
									})
									self.current_auction[index].bail_info = {
										data: result.data,
										state: true
									};
								} else {
									self.current_auction[index].bail_info = {
										data: [],
										state: true
									};
								}
							} else if (result.res=="f"){
								self.$message({
									message: data.msg,
									type: "error"
								})
							}
						}	
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){
						console.log(errorThrown);
					}
				})
			}
		},
		/**
		 * 没有限制条件
		 */
		returnTrue: function () {
			return true;
		},
		/**
		 * 已缴纳,生效中
		 * @param {Object} order 订单对象
		 */
		paid: function (order) {
			var falg = order.state_deposit == 1 ? true : false;
			return falg;
		},
		/**
		 * 待返还
		 * @param {Object} order 订单对象
		 */
		beReturn: function (order) {
			var falg = order.state_deposit == 2 ? true : false;
			return falg;
		},
		/**
		 * 已返还
		 * @param {Object} order 订单对象
		 */
		returned: function (order) {
			var falg = order.state_deposit == 3 ? true : false;
			return falg;
		},
		/**
		 * 返还失败
		 * @param {Object} order 订单对象
		 */
		returnFail: function (order) {
			var falg = order.state_deposit == -1 ? true : false;
			return falg;
		},
		/**
		 * 已扣除
		 * @param {Object} order 订单对象
		 */
		deducted: function (order) {
			var falg = order.state_deposit == -3 ? true : false;
			return falg;
		},
		/**
		 * 等待开拍
		 * @param {Object} order 订单对象
		 */
		beAuction: function (order) {
			var falg = order.state_goods == 6 ? true : false;
			return falg;
		},
		/**
		 * 竞拍中
		 * @param {Object} order 订单对象
		 */
		auctioning: function (order) {
			var falg = order.state_goods == 7 ? true : false;
			return falg;
		},
		/**
		 * 待买家确认拍品
		 * @param {Object} order 订单对象
		 */
		confirmGoods: function (order) {
			var falg = order.state_order == 1 ? true : false;
			return falg;
		},
		/**
		 * 待买家确认收货
		 * @param {Object} order 订单对象
		 */
		confirmReceipt: function (order) {
			var falg = order.state_order == 2 ? true : false;
			return falg;
		},
		/**
		 * 待卖家确认收款
		 * @param {Object} order 订单对象
		 */
		waitReceipt: function (order) {
			var flag = order.state_order == 3 ? false : true;
			return falg;
		},
		/**
		 * 交易完成
		 * @param {Object} order 订单对象
		 */
		tradeSuccess: function (order) {
			var falg = order.state_order == 4 ? false : true;
			return falg;
		},
		/**
		 * 弃拍
		 * @param {Object} order 订单对象
		 */
		tradeClose: function (order) {
			var falg = (order.state_order == 10 || order.state_order == 13 || order.state_order == 14) ? true : false;
			return falg;
		},
		/**
		 * 状态hover效果
		 * @param {Object} e event对象
		 */
		hover_show: function (e) {
			e = e || window.event;
			var container = e.srcElement ? $(e.srcElement) : $(e.target);
			container.find(".select_title").css("border", "solid 1px #999");
		},
		/**
		 * 状态hover效果
		 * @param {Object} e event对象
		 */
		hover_hide: function (e) {
			e = e || window.event;
			var container = e.srcElement ? $(e.srcElement) : $(e.target);
			container.find(".select_title").css("border", "solid 1px transparent");
		},
	},
	computed: {
		//根据选中状态动态显示的订单
		all_select_list: function () {
			var self = this;
			var sleactArr = [];
			for (var i=0, len=self.auction_list.length; i<len; i++) {
				var order = self.auction_list[i];
				if (eval("self." + self.select_state.bail)(order) && eval("self." + self.select_state.order)(order)) {
					sleactArr.push(self.auction_list[i]);
				}
			}
			return sleactArr;
		},
		//当前页应该显示的订单
		current_auction: function () {
			var self = this;
			var show_num = self.page_num * self.page_index;
			if (show_num <= self.all_select_list.length) {
				return self.all_select_list.slice(show_num - self.page_num, show_num);
			} else {
				return self.all_select_list.slice(show_num - self.page_num);
			} 
		}
	}
})