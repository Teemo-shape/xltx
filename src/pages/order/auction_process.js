import Vue from 'vue'
import headercart from '@/components/headerCart.vue'
import orderinfo from '@/components/order_info.vue'
import vfooter from '@/components/footer.vue'
import cancelOrder from '@/components/cancel_order.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false //阻止提示
Vue.use(ElementUI);

new Vue({
    el: '#app',
    components: {
        headercart,
        vfooter,
        orderinfo,
        cancelOrder
    },
    data() {
        return {
            id: 0, //订单id
            get_order: '', //订单信息
            record_list: [
                //     {
                //     id_goods_revision: '',
                //     ordinal_bid: 1, //报价顺序
                //     ltm_bid: 1525104002, //报价时间
                //     id_auction: 1, //竞价编号
                //     uid_bid: '', //报价人id
                //     is_accept: 1, //成功
                //     price_bid: 100, //报价
                // }
            ],
            id_auction: '', //判断列表中是否显示""我"
            index_step: 0, //展示走到第几步
            // 1	待买家确认拍品，系统产生了订单的初始状态，确认后即进入状态2，取消则进入状态10
            // 2	待买家确认收货付款，确认后即进入状态3，取消则进入状态10
            // 3	买家已确认收货付款，等待卖家确认收款
            // 4	卖家已确认收款，交易完成，等待系统退还保证金7
            // 7	待退还保证金
            // 8	买家保证金已退还
            // 10	买家取消拍卖
            // 13	买家超时未确认拍品
            // 14	买家超时未确认收货
            // 9	卖家保证金已退还（备用）
            // 5	未完成交易并买家反馈中（备用）
            // 6	未完成交易并卖家反馈中（备用）
            // 11	卖家取消拍卖（备用）
            // 12	协商一致取消拍卖（备用）
            time_diff: 0, //服务器时间差
            show: {
                cancel_order: false, //取消订单选项是否出现
            },
            feedback_div: {
                show: false,
                text: '',
            },
            remaining_time: 'loading', //动态显示剩余时间
            set: '', //倒计时用的时间
            sell:''//判断是否卖家
        }
    },
    mounted() {
        var self = this;
        self.id = getUrlParam("id");
        self.sell=getUrlParam("type")
        self.ctx = ctx;
        if (self.id) {
            //获取订单所在状态
            self.init_get_order()
        } else {
            self.$alert('链接错误,请刷新重新进入', {
                callback: action => {
                    history.go(-1)
                }
            })
        }

    },
    methods: {
        //获取订单信息
        init_get_order() {
            var self = this;
            $.ajax({
                url: self.ctx + '/trade/get/order/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.get_order = data.data;
                        self.index_step = data.data.state_flow
                        // self.index_step = 3
                        if (data.data.state_flow == 10 || data.data.state_flow == 13 || data.data.state_flow == 14) {
                            window.location.href = 'auction_process_close.html?id=' + self.id
                        }
                        self.auction_competitive(); //获取订单报价列表信息
                        //校验服务器时间
                        self.time_diff = data.server_time - Date.now();
                        if (data.data.ltm_expired_at - self.calibration_time()) {
                            self.fun_setInterval(data.data.ltm_expired_at)
                        }
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },

        //已经支付并收货
        fun_order_done() {
            var self = this;
            var form = new FormData();
            form.append("id_order", self.id);
            $.ajax({
                url: self.ctx + '/buyers/order/deal/done',
                type: 'POST',
                data: form,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.init_get_order()
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //获取订单报价记录
        auction_competitive() {
            var self = this;
            $.ajax({
                url: ctx + '/anon/goods/auction/competitive/detail/' + self.get_order.id_goods_revision,
                type: "GET",
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.record_list = data.data
                        self.id_auction = data.id_auction
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //确认订单
        fun_order_confirm() {
            var self = this;
            var form = new FormData();
            form.append("id_order", self.id);
            $.ajax({
                url: self.ctx + '/buyers/order/confirm',
                type: 'POST',
                data: form,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.init_get_order()
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //取消订单
        button_cancel_order() {
            this.show.cancel_order = true
        },
        //根据状态判断返回状态信息
        switch_index(n) {
            var self = this;
            var re = '';
            switch (n) {
                case 9:
                    re = '卖家保证金已退还'
                    break
                case 5:
                    re = '未交易完成并买家反馈中'
                    break
                case 6:
                    re = '未交易完成并卖家反馈中'
                    break
                case 11:
                    re = '卖家取消拍卖'
                    break
                case 12:
                    re = '协商一致取消拍卖'
                    break
            }
            return re
        },
        //存在争议
        fun_feed_cancel() {
            var self = this;
            if (self.feedback_div.text) {
                var form = new FormData();
                form.append("id_order", self.id);
                form.append("reason", self.feedback_div.text);
                $.ajax({
                    url: self.ctx + '/buyers/feedback/order',
                    type: 'POST',
                    data: form,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.res == 's' && data.data) {
                            self.$message({
                                message: '成功提交内容,等待系统确认',
                                type: 'success'
                            })
                            self.feedback_div.show = false
                        }
                        if (data.res == 'f') {
                            self.$message({
                                message: data.msg,
                                type: 'error'
                            })
                        }
                    }
                })
            } else {
                self.$message('请填写原因')
            }
        },
        //关闭弹出
        kind_show(e) {
            this.show.cancel_order = e
        },
        //校验时间.根据服务器返回时间计算当前时间
        calibration_time() {
            //系统当前时间加上时间差
            return Date.now() + this.time_diff
        },
        //千分法
        toThousand(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
            var l = s.split('.')[0].split('').reverse(),
                r = s.split('.')[1];
            var t = '';
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
            }
            return t.split('').reverse().join('') + '.' + r;
        },
        //倒计时信息方法
        fun_setInterval(end_time) {
            var self = this;
            clearInterval(self.set)
            self.set = setInterval(function () {
                self.remaining_time = self.trun_time(end_time - self.calibration_time())
            }, 1000)
        },
        //时间转化为天时分秒
        trun_time(mss) {
            var self = this;
            if (mss > 0) {
                let day = parseInt(mss / (1000 * 60 * 60 * 24));
                let hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                let sec = ((mss % (1000 * 60)) / 1000).toFixed(0);
                return day + '天' + hour + '小时' + min + '分' + sec + '秒'
            } else {
                return '0天0小时0分0秒'
            }
        },
        //时间戳转化
        timestampToTime(timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '年';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日 ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
    }
})