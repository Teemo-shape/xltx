import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示
Vue.use(ElementUI);
new Vue({
    el: '#app',
    data: {
        menu_name: 'publish_goods', //左侧菜单选中项
        ctx: '',
        //公用数据
        loading: true, //是否显示加载符号
        goods_list: [], //初始加载所有的数据列表
        show_list: [], //每次数据更新,筛选选择新的列表,展示列表
        bizparams_list: [], //上架信息选项
        param_value: 10080, //等待开拍时间,默认7天,
        dely_time: '', //延时长5
        front_time: 0, //停止缴纳保证金时间
        page_list_max: 10, //每页显示条数
        page_num: 0, //当前显示的页数
        pickerOptions0: { //日期选择限定
            disabledDate(time) {
                return time.getTime() < Date.now() - 1 * 24 * 60 * 60 * 1000;
                // return false
            }
        },

    },
    components: {
        headerCart,
        leftMenu,
        commonFooter
    },
    mounted() {
        //注册事件
        var self = this;
        var op = this;
        self.ctx = ctx;
        self.get_bizparams()
        self.get_param_value()
        self.get_dely_time()
        self.get_front_time()
        //后台获取列表信息内容
        $.ajax({
            url: ctx + '/goods/list/query',
            type: 'GET',
            dataType: 'json',
            success: function (e) {
                //给每条数据添加字段
                //show:true,方便判断是否显示
                //img_src:'',显示时再从后台拉取数据
                self.loading = false
                if (e.res == 's' && e.data) {
                    e.data.map(function (n) {
                        n.state_show = true;
                        n.type_show = true;
                        n.img_src = 'nopic';
                        n.isFirst = false;
                        //弹窗1 ,选择上架时间
                        n.popup1 = {
                            show: false,
                            timer: 0,
                            bidding_show: false,
                            end_time: 0,
                            "ltm_put_on": '',
                            "ltm_auction_start": '',
                            "ltm_auction_end": '',
                        }
                        //弹窗2,提示缴纳
                        n.popup2 = {
                            show: false,
                            text: '数据载入中...',
                            icon: 0,
                        }
                    })
                    self.goods_list = e.data;
                    self.show_list = e.data;
                    console.log(self.goods_list);
                    self.paging()
                }
                if (e.res == 'f') {
                    alert(e.msg)
                }

            }
        })
        $('body').on('click', '.label', function () {
            var self = $(this);
            var list = [];
            switch (self.attr('data-id')) {
                //点击全部
                case "0":
                    op.label0(self);
                    break;
                    //点击类型
                case "2":
                    op.label1(self, 2);
                    break;
                case "3":
                    op.label1(self, 3);
                    break;
                    //end 点击类型
                case "10":
                    op.label2(self, 1);
                    break;
                case "11":
                    op.label2(self, 1);
                    break;
                case "12":
                    op.label2(self, 1);
                    break;
                case "13":
                    op.label2(self, 1);
                    break;
                case "20":
                    op.label2(self, 2);
                    break;
                case "21":
                    op.label2(self, 2);
                    break;
                case "22":
                    op.label2(self, 2);
                    break;
                case "30":
                    op.label2(self, 3);
                    break;
                case "31":
                    op.label2(self, 3);
                    break;
                case "32":
                    op.label2(self, 3);
                    break;
            }

        });
        //回到顶部
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
    },
    methods: {
        //关闭所有的弹窗信息
        closeall() {
            var self = this;
            self.goods_list.map((n, i) => {
                n.popup1.show = false;
                n.popup2.show = false;
            })
        },
        //计算背景高度
        set_height() { 
            setTimeout(()=>{
                var cont_height = $(".container").height();        
                $(".bg").height(cont_height - 100);
            })
        },
        //获取设置信息
        get_bizparams() {
            var self = this;
            $.ajax({
                url: self.ctx + '/goods/auction/bizparams?id_parent=439782388218855424',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.bizparams_list = data.data
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
        //获取停止缴纳保证金时间
        get_front_time() {
            var self = this;
            $.ajax({
                url: self.ctx + '/goods/auction/bizparam/439474201711742976',
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.front_time = data.data.param_value
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
        //选择竞拍时长
        check_end_time(i, time) {
            var self = this;
            self.show_list[i].popup1.end_time = time;
            self.show_list[i].popup1.bidding_show = false;
        },
        //点击立即上架按钮 
        //TODO
        shelve_now_click(i) {
            var self = this;
            $.ajax({
                url: ctx + '/goods/puton/' + self.show_list[i].id_goods_revision,
                type: 'POST',
                success: function (data) {
                    if (data.res == 's') {
                        self.$message({
                            message: '商品上架成功!',
                            type: 'success'
                        })
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.data,
                            type: 'error'
                        })
                    }
                }
            })
        },
        //判断是否显示[立即上架]按钮
        shelves_now(i) {
            var self = this;
            if (new Date().getTime() - self.show_list[i].ltm_put_on > 0) {
                return false
            } else {
                return true
            }
        },
        //用户反馈是否缴纳了保证金
        feedback(i) {
            var self = this;
            self.show_list[i].popup2.icon = 1
            $.ajax({
                url: ctx + '/buyers/deposit/feedback/' + self.show_list[i].id_goods_revision,
                type: 'POST',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.$message({
                            message: '已反馈信息,请等待系统确认',
                            type: 'success'
                        })
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
        //获取缴纳保证金目标账户信息及需缴金额
        deposit(i) {
            //点击时先判断是否需要获取信息
            var self = this;
            //新内容修改,点击出现上架时间选项
            self.show_list[i].popup1.show = !self.show_list[i].popup1.show;
            //更改时间选项
            self.show_list[i].popup1.end_time = self.bizparams_list[0].param_value
        },
        //商品上架时间确定事件
        goods_shelve(i) {
            var self = this;
            var ltm_put_on = new Date(self.show_list[i].popup1.ltm_put_on).getTime();
            if (self.show_list[i].popup1.timer == 0) {
                ltm_put_on = 1 //判断是否为空 添加字符串
            }
            var post_data = {
                "ltm_put_on": ltm_put_on,
                "ltm_auction_start": new Date(self.show_list[i].popup1.ltm_auction_start).getTime(),
                "ltm_auction_end": new Date(self.show_list[i].popup1.ltm_auction_start).getTime() + self.show_list[i].popup1.end_time * 60 * 1000,
            }
            for (var a in post_data) {
                if (!post_data[a]) {
                    self.$message({
                        message: '请选择时间',
                        type: 'warning'
                    })
                    return
                }
            }
            $.ajax({
                url: ctx + '/goods/puton/' + self.show_list[i].id_goods_revision + '?timer=' + self.show_list[i].popup1.timer,
                type: 'POST',
                data: JSON.stringify(post_data),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.res == 's') {
                        self.$message({
                            message: '商品成功上架!',
                            type: 'success'
                        })
                        self.show_list[i].popup1.show = false
                    }
                    if (data.res == 'f') {
                        self.$message({
                            message: data.msg,
                            type: "error"
                        })
                    }
                },
                // error:function(xhr, status, et){
                //     console.log(xhr.status)
                // }
            })
        },
        //点击事件
        label0(self) {
            var op = this;
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
        },
        //点击类型
        label1(self, id) {
            var list = [];
            var op = this;
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
                op.list_check(list)
                console.log(list)
            }
        },
        //选择筛选,控制show
        list_check(list) {
            var op = this;
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
                        case "22": //预约上架中
                            op.goods_list.map(function (nn) {
                                if (nn.state_goods == 9) {
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
        },
        //点击状态
        label2(self, type) {
            var op = this;
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
                op.list_check(list)
                console.log(list)
            }
        },
        //筛选选项
        checked_list() {
            var op = this;
            var list = [];
            $('.label').each(function () {
                if ($(this).hasClass('checked') && $(this).attr('data-id') > 9) {
                    list.push($(this).attr('data-id'))
                }
            })
            return list;
        },
        //获取所有图片地址
        get_img_src: function (id, index) {

            // v-bind:get-src="get_img_src(item.name_pic_small,index)"
            var self = this;
            //根据文件名称判断goods_list里的index
            // self.goods_list.map((n, i) => {
            //     if (n.name_pic_small == id) {
            //         i = i
            //     }
            // })

            // if (!self.goods_list[i].isFirst) {
            //     self.goods_list[i].isFirst = true
            //     if (self.goods_list[i].img_src == 'nopic') {
            //         $.ajax({
            //             url: ctx + "/goods/picture?filename=" + id,
            //             dataType: 'json',
            //             async: true,
            //             success: function (e) {
            //                 if (e.res == "s") {
            //                     self.goods_list[i].img_src = "" + e.data;
            //                     self.show_list[index].img_src = "data:image;base64," + e.data;
            //                     //console.log(`第${a++}次图片请求`);
            //                 }
            //             }
            //         })
            //     }
            // }


            // var isFirst = true
            var n = self.goods_list[index];


            if (!self.goods_list[index].isFirst) {
                self.goods_list[index].isFirst = true
                if (n.name_pic_small == id && n.img_src == "nopic") {
                    $.ajax({
                        url: ctx + "/goods/picture?filename=" + id,
                        dataType: 'json',
                        async: true,
                        success: function (e) {
                            if (e.res == "s") {
                                self.goods_list[index].img_src = "" + e.data;
                                self.show_list[index].img_src = "data:image;base64," + e.data;
                                //console.log(`第${a++}次图片请求`);
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
        //原来vue中方法
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
        stamp_time: function (timestamp) {
            var self = this;
            //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
            var time = new Date(timestamp);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var date = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var seconds = time.getSeconds();
            return year + '-' + self.add0(month) + '-' + self.add0(date) + ' ' + self.add0(hours) + ':' + self.add0(minutes);
            return time
        },
        add0: function (m) {
            return m < 10 ? '0' + m : m
        },
        //分钟转天
        min_to_day(mss) {
            let day = parseInt(mss / (60 * 24));
            let hour = parseInt((mss % (60 * 24)) / (60));
            let min = parseInt((mss % (60)));
            return day + '天' + hour + '小时' + min + '分'
            // if (day) {
            //     return day + '天' + hour + '时'
            // } else if (hour) {
            //     return hour + '小时'
            // } else if (min) {
            //     return min + '分'
            // } else {
            //     return sec + '秒'
            // }
        },
    },
    watch:{
        //监视显示列表内容部变化时从新计算高度
        show_list:function(){
            this.set_height()
        }
    }
})