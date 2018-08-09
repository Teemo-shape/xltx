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
            name_goods: '',
            pros_time: '', //竞价周期
            time_text: '', //展示文字
            current_price: '', //用户当前输入价格
            show_current_price: 0, //显示当前价格
            front_time: 1, //第一阶段 结束缴纳时间
            front_time_show: 0, //结束缴纳时间 只做展示用
            time_diff: 0, //根据服务器返回的时间计算时间差
            user: '', //用户信息
            bizparams_list: [], //上架信息选项
            feedback_div: {
                text: '', //返回内容
                show: false, //返回窗口显示与否
            },
            getdraft: {
                name_goods: '',
            },
            dely_time: '', //延时时长
            loading: true,
            has_buyer: false, //用户是否缴纳了保证金
            popup2: {
                show: false,
                text: '数据载入中...',
                icon: 0,
            },
            pros: {
                "id_goods_revision": 0,
                "money_start": 0, //起步价，
                "money_step": 0, //加价幅度
                "money_deposit": 0, //保证金
                "money_top": 0, //封顶
                // "delay_limit": 0, //
                // "delay_minute": 0, //延时周期
                "delay_times": 0, //延时次数
                "ltm_end": 0,
                "ltm_begin": 0
            },
            com_info: {
                company_name: '',
            },
            count_down: {
                day: 0,
                hour: 0,
                min: 0,
                sec: 0,
            },
            attachment: [],
            img_list: [],
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
            has_begin: false, //尚未开始
            has_end: false, //拍卖结束
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
            //判断是否实名认证
            //判断用户是否缴纳了保证金
            $.ajax({
                url: ctx + '/buyers/deposit/info/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.popup2.data = data.data;
                        //用户已缴纳了保证金
                        self.has_buyer = true,
                            //获取正确数据后隐藏loading
                            self.popup2.noloading = true;
                    }
                    if (data.res == 'f') {
                        self.popup2.text = '数据错误'
                        self.popup2.data = true
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
            //获取竞价列表信息
            self.competitive_detail();
            //获取用户信息
            self.loadUser();
            //获取设置信息
            self.get_param_value()
            self.get_dely_time()
            self.get_front_time()
            //根据草稿id获取已发布的商品-查看详情时获取
            $.ajax({
                url: ctx + '/anon/goods/getgoods/' + self.id,
                type: "GET",
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        //获取公司信息
                        self.loading = false
                        self.get_company(data.data.id_company)
                        self.getdraft = data.data
                        //根据服务器返回时间计算当前时间
                        if (data.server_time) {
                            self.time_diff = data.server_time - Date.now()
                        }
                        self.name_goods = data.data.name_goods
                        if (self.getdraft.ltm_auction_start - self.calibration_time() > 0) {
                            self.has_begin = false;
                            self.time_text = '距开始'
                            setInterval(function () {
                                var mss = self.getdraft.ltm_auction_start - self.calibration_time()
                                if (mss > 0) {
                                    self.trun_time(mss)
                                }
                                if (mss < 0) {
                                    self.has_begin = true;
                                    self.time_text = '距结束'
                                    if (self.getdraft.ltm_auction_end - self.calibration_time() > 0) {
                                        self.trun_time(self.getdraft.ltm_auction_end - self.calibration_time())
                                        self.has_end = false;
                                        self.has_begin = true;
                                    }
                                }
                                if (self.getdraft.ltm_auction_end - self.calibration_time() < 0) {
                                    self.has_end = true;
                                    self.has_begin = true;
                                    self.time_text = ''
                                }
                            }, 100)
                            // websocket 链接
                            initSocket('/goodsdetail/' + self.id);
                            websocket.onopen = function (evnt) {
                                console.log("websocket.onopen");
                                // self.record_list=data
                                setInterval(function () {
                                    websocket.send('java.nio.HeapByteBuffer'); //保持连接
                                }, 60000)
                            };
                            websocket.onmessage = function (evnt) {
                                var msgObj = eval("(" + evnt.data + ")");
                                console.log(msgObj);

                                //self.record_list.unshift(data)

                                if (!msgObj.msg&&self.user.id==msgObj.to_user) {
                                    //出价异常
                                    self.$notify({
                                        title: '您的报价失败',
                                        message: msgObj.title,
                                        position: 'bottom-right',
                                        type: 'error'
                                    });
                                } else {
                                    if (msgObj.msg.is_accept == 1) {
                                        self.record_list.unshift(msgObj.msg)
                                        self.$notify({
                                            title: '有新的报价产生',
                                            message: '当前报价为:' + msgObj.msg.price_bid,
                                            position: 'bottom-right',
                                            type: 'success'
                                        });
                                    }
                                    if (msgObj.msg.is_accept == 0 && msgObj.msg.uid_bid == self.user.id) {
                                        self.record_list.unshift(msgObj.msg)
                                        self.$notify({
                                            title: '您的报价失败',
                                            message: '当前报价为:' + self.show_current_price,
                                            position: 'bottom-right',
                                            type: 'error'
                                        });
                                    }

                                    if (msgObj.msg.ltm_auction_end_delay) {
                                        self.getdraft.ltm_auction_end = msgObj.msg.ltm_auction_end_delay
                                    }
                                    self.set_current_price()
                                }
                            };
                        } else {
                            self.has_begin = true
                            if (self.getdraft.ltm_auction_end - self.calibration_time() > 0) {
                                self.has_end = false
                                self.time_text = '距结束'
                                setInterval(function () {
                                    var mss = self.getdraft.ltm_auction_end - self.calibration_time()
                                    self.trun_time(mss)
                                    if (mss < 0) {
                                        self.has_end = true;
                                        self.has_begin = true;
                                        self.time_text = ''
                                    }
                                }, 100)
                                // websocket 链接
                                initSocket('/goodsdetail/' + self.id);
                                websocket.onopen = function (evnt) {
                                    console.log("websocket.onopen");
                                    // self.record_list=data
                                    setInterval(function () {
                                        websocket.send('java.nio.HeapByteBuffer'); //保持连接
                                    }, 60000)
                                };
                                websocket.onmessage = function (evnt) {
                                    var msgObj = eval("(" + evnt.data + ")");
                                    console.log(msgObj);

                                    //self.record_list.unshift(data)
                                    if (!msgObj.msg&&self.user.id==msgObj.to_user) {
                                        self.$notify({
                                            title: '您的报价失败',
                                            message: msgObj.title,
                                            position: 'bottom-right',
                                            type: 'error'
                                        });
                                    } else {
                                        if (msgObj.msg.is_accept == 1) {
                                            self.record_list.unshift(msgObj.msg)
                                            self.$notify({
                                                title: '有新的报价产生',
                                                message: '当前报价为:' + msgObj.msg.price_bid,
                                                position: 'bottom-right',
                                                type: 'success'
                                            });
                                        }
                                        if (msgObj.msg.is_accept == 0 && msgObj.msg.uid_bid == self.user.id) {
                                            self.record_list.unshift(msgObj.msg)
                                            self.$notify({
                                                title: '您的报价失败',
                                                message: '当前报价为:' + self.show_current_price,
                                                position: 'bottom-right',
                                                type: 'error'
                                            });
                                        }
                                        if (msgObj.msg.ltm_auction_end_delay) {
                                            self.getdraft.ltm_auction_end = msgObj.msg.ltm_auction_end_delay
                                        }
                                        self.set_current_price()
                                    }
                                };
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
                        // if (self.pros.ltm_end - new Date().getTime() > 0) {
                        //     self.has_end = false
                        //     self.pros_time = self.fun_pros_time()
                        //     setInterval(function () {
                        //         var mss = self.pros.ltm_end - new Date().getTime()
                        //         self.trun_time(mss)
                        //     }, 100)
                        // } else {
                        //     self.has_end = true
                        // }
                        // if (self.pros.ltm_begin - new Date().getTime() > 0) {
                        //     self.has_begin = false;
                        //     self.pros_time = self.fun_pros_time()
                        //     setInterval(function () {
                        //         var mss = self.pros.ltm_begin - new Date().getTime()
                        //         self.trun_time(mss)
                        //     }, 100)
                        // } else {
                        //     self.has_begin = true
                        // }
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
        //关闭弹窗
        close_pop2() {
            this.popup2.show = false;
        },
        //获取设置时间信息

        //获取间隔时间
        get_param_value() {
            var self = this;
            $.ajax({
                url: self.ctx + '/goods/auction/bizparam/439474201708072960',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.param_value = data.data.param_value
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
        //停止缴纳保证金时间
        get_front_time() {
            var self = this;
            $.ajax({
                url: self.ctx + '/goods/auction/bizparam/439474201708204032',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.front_time = data.data.param_value * 60000;
                        self.front_time_show = data.data.param_value
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
        //获取延时时长
        get_dely_time() {
            var self = this;
            $.ajax({
                url: self.ctx + '/goods/auction/bizparam/439474201711742976',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.dely_time = data.data.param_value
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
        //增加报价按钮
        price_add() {
            var self = this;
            self.current_price = self.current_price + self.pros.money_step
        },
        //减少报价按钮
        price_sub() {
            var self = this;
            self.current_price = self.current_price - self.pros.money_step;
            if (self.current_price < self.show_current_price) {
                self.current_price = self.show_current_price
            }
            if (self.current_price < self.pros.money_start) {
                self.current_price = self.pros.money_start
            }
        },
        //======
        //根据服务器返回时间计算当前时间
        calibration_time() {
            //系统当前时间加上时间差
            return Date.now() + this.time_diff
        },
        //转千分符
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
        //获取用户信息
        loadUser() {
            var self = this;
            $.ajax({
                url: ctx + '/get/user',
                type: "get",
                cache: false,
                async: false,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (handleResponseData(data)) {
                        if (data.user) {
                            self.user = data.user;
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("网络异常，请重试一次", {
                        theme: "danger"
                    });
                    console.log(errorThrown);
                }
            })
        },
        //获取当前价格
        set_current_price() {
            var self = this;
            var price = 0;
            if (self.record_list.length > 0) {
                var flag = false;
                self.record_list.forEach((n, i) => {

                    if (n.is_accept == 1) {
                        price = price > n.price_bid ? price : n.price_bid
                        if (!flag) {
                            n.text = '领先'
                            flag = true
                        } else {
                            n.text = '出局'
                        }
                    }
                })
            }
            self.show_current_price = price
            self.current_price = price > self.pros.money_start + self.pros.money_step ? price : self.pros.money_start + self.pros.money_step
        },
        //获取竞价列表信息
        competitive_detail() {
            var self = this;
            $.ajax({
                url: self.ctx + '/anon/goods/auction/competitive/detail/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.record_list = data.data
                        self.set_current_price()
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
        //出价按钮
        sign_up_btn() {
            var self = this;
            //出价前判断价格是否满足规则
            if (self.fun_current_price()) {
                var post_data = {
                    "price": Number(self.current_price)
                }
                $.ajax({
                    url: self.ctx + '/goods/auction/competitive/' + self.id,
                    type: 'POST',
                    async: false,
                    cache: false,
                    data: post_data,
                    dataType: "json",
                    // contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.res == 's') {
                            // self.$message({
                            //     message: '提交报价成功!',
                            //     type: 'success'
                            // })
                        }
                        if (data.res == 'f') {
                            self.message({
                                message: data.msg,
                                type: 'error'
                            })
                        }
                    }
                })
            }
        },
        //判断用户输入价格
        fun_current_price() {
            var self = this;
            if (self.show_current_price == 0 && self.current_price != self.pros.money_start) {
                self.$message({
                    message: '首次出价必须为起拍价',
                    type: 'error'
                })
                self.$alert('首次出价必须为起拍价')
                return false
            }
            if (self.current_price <= self.show_current_price) {
                self.$message({
                    message: '出价必须高于当前价',
                    type: 'error'
                })
                return false
            }
            if (self.current_price < self.pros.money_start) {
                self.$message({
                    message: '出价必须高于起拍价',
                    type: 'error'
                })
                return false
            }
            //判断是否是加价幅度的整数
            if (((self.current_price - self.pros.money_start) % self.pros.money_step) > 0) {
                self.$message({
                    message: '请按加价幅度出价，每次加价必须是' + self.pros.money_step + '元的整数倍',
                    type: 'error'
                })
                return false
            }
            return true
        },
        //用户反馈是否缴纳了保证金
        feedback() {
            var self = this;
            self.popup2.icon = 1
            $.ajax({
                url: ctx + '/buyers/deposit/feedback/' + self.id,
                type: 'POST',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.$message({
                            message: '已反馈信息,请等待系统确认',
                            type: 'success'
                        })
                        //返回正确信息,5s后刷新页面
                        setTimeout(() => {
                            location.reload();
                        }, 3000)
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
        //获取是否公司需要汇款
        fun_popup2() {
            var self = this;
            self.popup2.show = true;
            $.ajax({
                url: ctx + '/cert/state',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.company) {
                        //已经实名认证
                        if (!self.popup2.data) {
                            $.ajax({
                                url: ctx + '/buyers/deposit/account/' + self.id,
                                type: 'GET',
                                success: function (data) {
                                    if (data.res == 's' && data.data) {
                                        self.popup2.data = data.data;

                                        //获取正确数据后隐藏loading
                                        self.popup2.noloading = true;
                                    }
                                    if (data.res == 'f') {
                                        self.popup2.text = '数据错误'
                                        self.popup2.data = true
                                        self.$message({
                                            message: data.msg,
                                            type: 'error'
                                        })
                                    }
                                }
                            })
                        }
                    }
                    if (data.res == 's' && !data.company) {
                        //未实名认证
                        self.$alert('您还未实名认证，请实名认证后才能拍卖商品', {
                            callback: action => {
                                history.go(-1)
                            }
                        })
                    }
                    if(data.res=='f'){
                        self.$message({
                            message: data.msg,
                            type: 'error'
                        })
                    }
                }
            })
        },
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
            } else {
                self.count_down.day = 0
                self.count_down.hour = 0
                self.count_down.min = 0
                self.count_down.sec = 0
            }
        },
        //时间戳转化
        timestampToTime(timestamp) {
            let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
                // let day = parseInt(mss / (1000 * 60 * 60 * 24));
                // let hour = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let min = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                // let sec = ((mss % (1000 * 60)) / 1000).toFixed(1);
                return min + '分钟'
                // if (day) {
                //     return day + '天' + hour + '时' + min + '分' + sec + '秒'
                // } else if (hour) {
                //     return hour + '小时' + min + '分' + sec + '秒'
                // } else if (min) {
                //     return min + '分' 
                // } else {
                //     return sec + '秒'
                // }
            } else {
                return mss
            }
        },
        // 获取大图
        get_big(i) {
            var self = this;
            $.ajax({
                url: ctx + "/anon/goods/picture?filename=" + self.img_list[i].name_pic,
                type: "GET",
                async: false,
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.img_list[i].big = data.data;
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
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