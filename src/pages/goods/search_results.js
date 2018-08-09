import Vue from 'vue'
import commonFooter from '../../components/footer.vue'
import headerSearch from '../../components/headerSearch.vue'
import '../../../static/js/libs/jquery-1.9.1.min.js'
import '../../../static/js/plugins/jquery.page.js'

Vue.config.productionTip = false  //阻止提示

new Vue({
    el:'#app',
    data () {
        return {
            goods_list: [],
            page_index: 1,
            page_num: 9,
            keyword: "",
            loading: true,
            arrow_show: false,  //箭头是否出现
            history_index: 1,   //当前历史页
            history_num: 8,     //一次展示条数
            goods_history: [
                {
                    pic: "../static/img/footmark_03.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_04.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_05.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_06.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_07.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_08.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_09.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_03.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_04.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_05.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_06.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_07.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_08.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_09.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_03.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_04.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_05.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_06.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_07.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_08.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
                {
                    pic: "../static/img/footmark_09.jpg",
                    price: "3.22",
                    id_goods_revision: "11111111111111"
                },
            ],  //浏览历史,模拟
        }
    },
    components:{
        headerSearch,
        commonFooter,
    },
    mounted () {
        var self = this;
        var keyword = getUrlParam("k");
        if (keyword) {
            self.keyword = decodeURI(keyword);
            self.loadGoods();
        } else {
            self.loading = false;
        }
        //搜索条件定位
        $(document).scroll(function () {
            if ($(window).scrollTop() >= 90) {
                $(".nav_filter").css("position", "fixed");
                $(".mid_half").css("mangin-top", "106px");
            } else {
                $(".nav_filter").css("position","initial");
                $(".mid_half").css("mangin-top", "30px");
            }
        })
    },
    methods: {
        /**
		 * 初始化商品数据
		 */
		loadGoods: function() {
			var self = this;
			$.ajax({
				url: ctx + "/anon/goods/list/query?name=" + self.keyword,
				type: "get",
				cache: false,
				async: true,
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				success: function(data) {
					if (data.res == "s") {
						if (data.data) {
							data.data.map(function(n) {
								//倒计时
								if (Boolean(n.ltm_expired_at)) {
									self.countDown(n);
								}
							});
							self.goods_list = data.data;
							//分页
							$(".paging").createPage(function(n) {
								self.page_index = n;
							},{
								pageCount: Math.ceil(self.goods_list.length / self.page_num), //总页数
								showTurn: false, //不显示跳转
								showSumNum: false //不显示总页码
							});
						}
                        self.loading = false;
					}
					if (data.res == "f") {
						self.$message({
							message: data.msg,
							type: "error"
						});
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
        /**
         * 商品历史上一页
         */
        arrow_prev: function () {
            var self = this;
            --self.history_index;
            $(".history_cont").fadeIn(1000);
        },
        /**
         * 商品历史下一页
         */
        arrow_next: function () {
            var self = this;
            ++self.history_index;
            $(".history_cont").fadeIn(1000);
        },
        /**
         * 时间转化为天时分秒
         * @param {Number} timestamp 时间戳
         */
        changeTime: function (timestamp) {
            var mss = timestamp - new Date().getTime();
            var count_down = {};
            var timeStr = "";
            if (mss > 0) {
                count_down.day = parseInt(mss / (1000 * 60 * 60 * 24));
                count_down.hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                count_down.min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                count_down.sec = parseInt((mss % (1000 * 60)) / 1000);

                if (count_down.day>0) {
                    if (count_down.day<10) {
                        count_down.day = "0" + count_down.day;
                    }
                    timeStr += count_down.day + "天";
                }
                if (count_down.hour<10) {
                    count_down.hour = "0" + count_down.hour;
                }
                if (count_down.min<10) {
                    count_down.min = "0" + count_down.min;
                }
                if (count_down.sec<10) {
                    count_down.sec = "0" + count_down.sec;
                }
                timeStr += count_down.hour + "小时" + count_down.min + "分"	+ count_down.sec + "秒";
            }
            return timeStr;
        },
        countDown: function (goods) {
            var self = this;
            var timer = null;
            goods.count_down = self.changeTime(goods.ltm_expired_at);
            timer = setInterval(function () {
                if (!goods.count_down) {
                    clearInterval(timer);
                }
                goods.count_down = self.changeTime(goods.ltm_expired_at);
            },1000)
        }
    },
    computed: {
        //当前页显示的商品
        current_goods: function () {
            var self = this;
			var show_num = self.page_num * self.page_index;
			if (show_num <= self.goods_list.length) {
				return self.goods_list.slice(show_num - self.page_num, show_num);
			} else {
				return self.goods_list.slice(show_num - self.page_num);
			} 
        },
        //当前历史页显示的商品
		current_history: function () {
			var self = this;
			var show_num = self.history_num * self.history_index;
			if (show_num <= self.goods_history.length) {
				return self.goods_history.slice(show_num - self.history_num, show_num);
			} else {
				return self.goods_history.slice(show_num - self.history_num);
			} 
		}
    }
})