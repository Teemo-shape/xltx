import Vue from 'vue'
import headercart from '@/components/headerCart.vue'
import vfooter from '@/components/footer.vue'
import intromangifile from "@/components/intro_mangifile.vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false //阻止提示
Vue.use(ElementUI);
new Vue({
    el: '#app',
    data() {
        return {
            id: '',
            pros_time: '', //竞价周期
            time_text: '', //展示文字
            getdraft: {
                name_goods: '',
            },
            com_info: {
                company_name: '',
            },
            pros: {
                "id_goods_revision": 0,
                "money_start": 0, //起步价，
                "money_step": 0, //加价幅度
                "money_deposit": 0, //保证金
                "money_top": 0, //封顶
                "delay_limit": 0, //
                "delay_minute": 0, //延时周期
                "delay_times": 0, //延时次数
            },
            count_down: {
                day: 0,
                hour: 0,
                min: 0,
                sec: 0,
            },
            attachment: [],
            img_list: [],
            record_list: [],
            has_begin: false, //尚未开始
            has_end: false, //拍卖结束
            time_text: '',
            show: {
                offer: false, //是否点击了报名交保证金
                quotation_record: false, //报价记录
            }
        }
    },
    components: {
        headercart,
        vfooter,
        intromangifile
    },
    mounted() {
        //根据结束时间戳计算结束时间，每0.1秒更新一次
        //获取页面信息,
        var self = this;
        self.id = getUrlParam("id");
        self.ctx = ctx;
        if (self.id) {
            //根据草稿id获取已发布的商品-查看详情时获取
            $.ajax({
                url: ctx + '/goods/getdraft/' + self.id,
                type: "GET",
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.get_company(data.data.id_company)
                        self.getdraft = data.data
                        self.name_goods = data.data.name_goods
                        if (self.getdraft.ltm_auction_start - new Date().getTime() > 0) {
                            self.has_begin = false;
                            self.pros_time = self.fun_pros_time()
                            self.time_text = '距开始'
                            setInterval(function () {
                                var mss = self.getdraft.ltm_auction_start - new Date().getTime()
                                self.trun_time(mss)
                            }, 100)
                        } else {
                            self.has_begin = true
                            if (self.getdraft.ltm_auction_end - new Date().getTime() > 0) {
                                self.has_end = false
                                self.pros_time = self.fun_pros_time()
                                self.time_text = '距结束'
                                setInterval(function () {
                                    var mss = self.getdraft.ltm_auction_end - new Date().getTime()
                                    self.trun_time(mss)
                                }, 100)
                            } else {
                                self.has_end = true
                            }
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
            //获取商品信息
            $.ajax({
                url: ctx + '/anon/goods/auction/get/pros/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == "s" && data.data) {
                        self.pros = data.data

                    }
                    if (data.res == "f") {
                        self.$alert('出现错误', data.msg, {
                            confirmButtonText: '确定',
                        });
                    }

                }
            })
            //获取附件列表
            $.ajax({
                url: ctx + '/anon/goods/auction/get/attachments/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.attachment = data.data
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
            //获取商品图片
            $.ajax({
                url: ctx + '/anon/goods/auction/pics/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.img_list = data.data
                        // for (var a = 0; a < self.img_list.length; a++) {
                        //     self.get_big(a)
                        // }
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
        }
    },
    methods: {
        
        //通过公司id获取公司信息
        get_company(id) {
            var self = this;
            $.ajax({
                url: ctx + '/anon/user/get/company/' + id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.com_info = data.data
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: '获取公司信息失败',
                            type: 'error'
                        })
                    }
                },
            })
        },
        
        //时间转化为天时分秒
        trun_time(mss) {
            var self = this;

            if (mss > 0) {
                self.count_down.day = parseInt(mss / (1000 * 60 * 60 * 24));
                self.count_down.hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                self.count_down.min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                self.count_down.sec = ((mss % (1000 * 60)) / 1000).toFixed(1);
            }
        },
        //时间戳转化
        timestampToTime(timestamp) {
            let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        //竞价周期返回计算
        fun_pros_time: function () {
            var self = this;
            var mss = self.getdraft.ltm_auction_end - self.getdraft.ltm_auction_start
            if (mss > 0) {
                let day = parseInt(mss / (1000 * 60 * 60 * 24));
                let hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                let sec = ((mss % (1000 * 60)) / 1000).toFixed(1);
                if (day) {
                    return day + '天' + hour + '时'
                } else if (hour) {
                    return hour + '时' + min + '分'
                } else if (min) {
                    return min + '分' + sec + '秒'
                } else {
                    return sec + '秒'
                }
            }
        },

        //上下菜单点击动画
        go_up() {
            $(".catalog-list").animate({
                scrollTop: $(".catalog-list").scrollTop() - 50
            }, 300)
        },
        go_down() {
            $(".catalog-list").animate({
                scrollTop: $(".catalog-list").scrollTop() + 50
            }, 300)
        }
    },
})