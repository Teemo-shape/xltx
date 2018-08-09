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
        menu_name: 'sold_manage', //  左侧菜单选中值
        auction_list: [], //所有订单
        search_auction: [], //当前应该显示的总订单(若有搜索则为搜索结果的订单)
        page_index: 1, //当前页码
        page_num: 10, //每页显示数量
        order_id: "",   //订单号
        addressee: "",  //收件人
        business_state: "", //交易状态
        daterange: "",  //时间范围
        loading: true,  //加载中
    },
    components: {
        headerCart,
        leftMenu,
        commonFooter
    },
    mounted() {
        var self = this;
        self.loadAuctions();
		//动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
		//点击隐藏弹出框
		$(document).click(function () {
            $(".select_items").hide();
		});
    },
    methods: {
        /**
         * 初始化拍卖订单数据
         */
        loadAuctions: function () {
            var self = this;
            $.ajax({
                url: ctx + '/saler/order/list/query',
                type: 'get',
                cache: false,
                async: true,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.res == 's') {
                        if (data.data) {
                            data.data.map(function (n) {
                                //订单日期
                                if (Boolean(n.ltm_order_create)) {
                                    n.over_time = self.changeTime(n.ltm_order_create);
                                }
                                //倒计时
                                if (Boolean(n.ltm_expired_at)) {
                                    n.count_down = self.countDown(n.ltm_expired_at);
                                }
                            })
                            self.auction_list = data.data;
                            self.search_auction = data.data;
                            //分页
							$(".paging").createPage(function(n){
                                self.page_index = n;
                            },{
                                pageCount: Math.ceil(self.search_auction.length/self.page_num),	//总页数
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
        changeTime: function (timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear();
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            return Y + "-" + M + "-" + D;
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
         * 查询订单结果
         */
        searchOrder: function () {
            // var self = this;
            // //TODO 提交数据根据接口条件设置
            // var vo = {
            //     order_id: self.order_id,
            //     addressee: addressee,
            //     business_state: business_state,
            //     daterange: daterange
            // }
            // //TODO url根据接口条件设置
            // $.ajax({
            //     url: ctx + '/saler/order/deal/done',
            //     type: 'post',
            //     cache: false,
            //     async: false,
            //     data: JSON.stringify(vo),
            //     dataType: "json",
            //     contentType: "application/json;charset=utf-8",
            //     success: function (data) {
            //         if (data.res == 's') {
            //             if (data.data) {
            //                 self.search_auction = data.data;
            //             }
            //         }
            //         if (data.res == 'f') {
            //             self.$message({
            //                 message: data.msg,
            //                 type: "error"
            //             })
            //         }
            //     },
            //     error: function (XMLHttpRequest, textStatus, errorThrown) {
            //         console.log(errorThrown);
            //     }
            // })
        }
    },
    computed: {
		//当前页应该显示的订单
		current_auction: function () {
			var self = this;
			var show_num = self.page_num * self.page_index;
			if (show_num <= self.search_auction.length) {
				return self.search_auction.slice(show_num - self.page_num, show_num);
			} else {
				return self.search_auction.slice(show_num - self.page_num);
			} 
		}
	}
})