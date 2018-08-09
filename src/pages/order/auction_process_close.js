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
            index_step:0,//进行到第几步
            get_order: '', //订单信息
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
            remaining_time: '0天0小时0分0秒', //动态显示剩余时间
            feedback_div:{
                show:false,//
                text:'',
            }
        }
    },
    mounted() {
        var self = this;
        self.id = getUrlParam("id");
        self.ctx = ctx;
        // if (self.id) {
            //获取订单所在状态
            self.init_get_order()
        // } 
        // else {
        //     self.$alert('链接错误,请刷新重洗进入', {
        //         callback: action => {
        //             history.go(-1)
        //         }
        //     })
        // }
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
        
        //存在争议
        fun_feed_cancel(){
            var self=this;
            var form = new FormData();
            form.append("id_order", self.id);
            form.append("reason", self.feedback_div.text);
            $.ajax({
                url: self.ctx + '/saler/feedback/order',
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
                        self.feedback_div.show=false
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
       
    }
})