import Vue from 'vue'
import headercart from '@/components/headerCart.vue'
import vfooter from '@/components/footer.vue'
import intromangifile from "@/components/intro_mangifile_edit.vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import sutoast from '@/components/su_toast.vue'
Vue.use(ElementUI);
Vue.config.productionTip = false //阻止提示
new Vue({
    el: '#app',
    data() {
        return {
            id: '',
            be_time: '',
            end_time: '',
            btn_cover: false, //滚动按钮显示
            toast: false, //提示保存完成
            count: 0,
            ctx: '',
            rejectdetail_div: [], //控制显示错误提醒
            fun_time_send: function () {},
            name_goods: '',
            pros: {
                "money_start": '', //起步价，
                "money_step": '', //加价幅度
                "money_deposit": '', //保证金
                "money_top": '', //封顶
                "delay_limit": '', //
                "delay_minute": 5, //延时周期
                "delay_times": '', //延时次数
                // "ltm_end": '',
                // "ltm_begin": ''
            },
            com_info: {
                company_name: '',
            },
            attachment: [], //上传Excel数据
            img_list: [{
                index_pic: 0,
            }]
        }
    },
    components: {
        headercart,
        vfooter,
        intromangifile,
        sutoast
    },
    mounted() {
        //获取页面信息,
        var self = this;
        self.id = getUrlParam("id");
        self.ctx = ctx;
        //
        if (self.id) {
            //修改,获取form内容
            $.ajax({
                url: ctx + '/anon/goods/auction/get/pros/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == "s" && data.data) {
                        self.pros = data.data
                        self.be_time = new Date(self.pros.ltm_begin)
                        self.end_time = (self.pros.ltm_end - self.pros.ltm_begin) / (24 * 60 * 60 * 1000)
                    }
                    if (data.res == "f") {
                        self.$alert('出现错误', data.msg, {
                            confirmButtonText: '确定',
                        });
                    }
                }
            })
            //根据草稿id获取已发布的商品-查看详情时获取
            $.ajax({
                url: ctx + '/goods/getdraft/' + self.id,
                type: "GET",
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.name_goods = data.data.name_goods
                        if (data.data.state_goods == -1) {
                            self.rejectdetail()
                        }
                        self.get_company(data.data.id_company)
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
            //获取附件列表

            self.file_list_update();
            //获取商品图片
            $.ajax({
                url: ctx + '/anon/goods/auction/pics/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data.length > 0) {
                        self.img_list = data.data

                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
        }

        //注册滚动事件
        // $(window).scroll(function () {
        //     var doc = document,
        //         win = window,
        //         ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();

        //     if (ScrollBottom > $('footer').height()) {
        //         self.btn_cover = false
        //     } else {
        //         self.btn_cover = true
        //     }
        // })
    },
    methods: {
        //判断是否有错误提醒
        rejectdetail() {
            var self = this;
            $.ajax({
                url: ctx + '/goods/rejectdetail/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.rejectdetail_div = data.data;
                        self.note();

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
        //点击弹出错误信息
        note() {
            var self = this;
            var mess = ''
            var mess = ''
            self.rejectdetail_div.forEach((n, i) => {
                mess += '<h5 style="font-size:16px;">' + (i + 1) + '、' + n.reason_meta + ':</h5><p style="margin:5px 0 10px 25px">' + n.reason_detail + '</p>'
            })
            self.$notify({
                title: '被拒原因',
                dangerouslyUseHTMLString: true,
                message: mess,
                duration: 0,
                type: 'warning'
            });
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
        //创建新的拍卖商品
        build_goods() {
            var self = this;
            if (!self.id) {
                var post_data = {
                    "name_goods": self.name_goods,
                    "type_goods": 3,
                    "id_company": 1 //TODO
                }
                $.ajax({
                    url: ctx + '/goods/create',
                    type: 'POST',
                    async: false,
                    cache: false,
                    data: JSON.stringify(post_data),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.res == 's' && data.data) {
                            self.$message({
                                message: '您已成功注册商品可以进行后面操作',
                                type: 'success'
                            })
                            self.id = data.data.id;
                        }
                        if (data.res == 'f') {
                            self.$message({
                                message: data.msg,
                                type: 'error'
                            })
                        }
                    }
                })
            }
        },
        //开始时间转时间戳
        find_time() {
            var self = this;
            let date = new Date(this.be_time);
            this.pros.ltm_begin = date.getTime();
            console.log(date.getTime())
            self.find_end_time()
        },
        //结束时间转时间戳
        find_end_time() {
            if (this.be_time) {
                let date = new Date(this.be_time);
                let date2 = date.getTime() + (24 * 60 * 60 * 1000 * this.end_time);
                this.pros.ltm_end = date2
            }
        },
        //上传Excel前判断
        ex_upload() {
            var self = this;
            var fileObj = document.getElementById("ex_up").files[0];
            var repeat_name = false;
            var has_existence = false;
            //后台判断
            if (self.id) {
                $.ajax({
                    url: ctx + '/goods/auction/attachment/exist/' + self.id + '?filename=' + fileObj.name,
                    type: "GET",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.res == 's' && data.data == 0) {
                            has_existence = false;
                        }
                        if (data.res == 's' && data.data == 1) {
                            has_existence = true;
                        }
                        if (data.res == 'f') {
                            self.$message(data.msg)
                        }
                        if (has_existence) {
                            self.$confirm(fileObj.name + '已存在,是否选择替换?', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(() => {
                                // console.log('确定')
                                //self.attachment.splice(i, 1)
                                self.ex_upload_file()
                            }).catch(() => {
                                // console.log('取消')
                            })
                        } else {
                            self.ex_upload_file()
                        }
                    }
                })
            } else {
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }
        },
        //上传Excel
        ex_upload_file() {
            var self = this;
            if (self.id) {
                var fileObj = document.getElementById("ex_up").files[0];
                var from = new FormData();
                from.append("attachment_xls", fileObj);
                $.ajax({
                    url: ctx + '/goods/auction/attachment/' + self.id,
                    data: from,
                    type: "POST",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.res == "s") {
                            //从新从后台获取
                            //获取附件列表

                            self.file_list_update();
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
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }
        },
        //excel 文件删除
        excel_del(i) {
            var self = this;
            var post_data = {
                md5_file: self.attachment[i].md5_file,
                name_file: self.attachment[i].name_file
            }
            self.$confirm('是否要删除该文件?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                $.ajax({
                    url: ctx + '/goods/auction/attachment/del/' + self.id,
                    type: 'POST',
                    async: false,
                    cache: false,
                    data: JSON.stringify(post_data),
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.res == 's') {
                            //成功后从新获取列表
                            self.file_list_update()
                        }
                    }
                })
            }).catch(() => {
                // console.log('取消')
            })
        },
        //更新附件列表
        file_list_update() {
            var self = this;
            //获取附件列表
            $.ajax({
                url: ctx + '/anon/goods/auction/get/attachments/' + self.id,
                type: 'GET',
                success: function (data) {
                    if (data.res == 's' && data.data) {
                        self.attachment = data.data
                    }
                    if (data.res == 's' && !data.data) {
                        self.attachment = [];
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
        },
        // 获取大图
        get_big(i) {
            var self = this;
            $.ajax({
                url: ctx + "/goods/picture?filename=" + self.img_list[i].name_pic,
                type: "GET",
                async: false,
                success: function (data) {
                    if (data.res == 's') {
                        self.img_list[i].big = data.data;
                    }
                    if (data.res == 'f') {
                        alert(data.msg)
                    }
                }
            })
        },

        //公司图片更改,上传
        com_img_up(i, index_pic, add) {
            var self = this;
            if (self.id) {
                var self = this;
                var file = document.getElementById("index_pic" + index_pic).files[0];
                // var r = new FileReader(); //本地预览
                // r.onload = function () {
                //     // var strs = new Array(); //定义一数组 
                //     var strs = r.result.split(",")[1]; //字符分割 
                //     if (add) {
                //         var push_data = {
                //             big: strs,
                //             index_pic: index_pic
                //         }
                //         if (index_pic < 12) {
                //             self.img_list.unshift(push_data)
                //         } else {
                //             self.img_list.push(push_data)
                //         }

                //     } else {
                //         document.getElementById("com_img_" + i).src = 'data:image;base64,' + strs
                //     }
                // }
                // r.readAsDataURL(file); //Base64

                if (index_pic < 12) {
                    //上传公司图
                    var from = new FormData();
                    from.append("company_img", file);
                    $.ajax({
                        url: ctx + '/goods/auction/company/pic/' + self.id + '/' + index_pic,
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: from,
                        success: function (data) {
                            if (data.res == 's') {
                                //上传成功 
                                self.$message({
                                    message: '图片上传成功',
                                    type: 'success'
                                })
                                $.ajax({
                                    url: ctx + '/anon/goods/auction/pics/' + self.id,
                                    type: 'GET',
                                    success: function (data) {
                                        if (data.res == 's' && data.data.length > 0) {
                                            self.img_list = data.data

                                        }
                                        if (data.res == 'f') {
                                            alert(data.msg)
                                        }
                                    }
                                })
                            }
                            if (data.res == "f") {
                                //上传失败
                                self.$message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        }
                    })
                } else {
                    //上传附件样张图片
                    var from = new FormData();
                    from.append("attachment_img", file);
                    $.ajax({
                        url: ctx + '/goods/auction/attachment/pic/' + self.id + '/' + index_pic,
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: from,
                        success: function (data) {
                            if (data.res == 's') {
                                //上传成功 
                                self.$message({
                                    message: '图片上传成功',
                                    type: 'success'
                                })

                                $.ajax({
                                    url: ctx + '/anon/goods/auction/pics/' + self.id,
                                    type: 'GET',
                                    success: function (data) {
                                        if (data.res == 's' && data.data.length > 0) {
                                            self.img_list = data.data

                                        }
                                        if (data.res == 'f') {
                                            alert(data.msg)
                                        }
                                    }
                                })
                            }
                            if (data.res == "f") {
                                //上传失败
                                self.$message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        }
                    })
                }
            } else {
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }


        },
        //根据图片index_pic获取index
        index_pictoi(index_pic) {
            var self = this;
            var a = 0;
            self.img_list.map((n, i) => {
                if (n.index_pic == index_pic) {
                    a = i
                }
            })
            return a;
        },
        //判断大加号是否应该存在
        add_show(index_pic) {
            var self = this;
            var has = true;
            self.img_list.map((n, i) => {
                if (n.index_pic == index_pic) {
                    has = false
                }
            })
            return has;
        },
        //全部提交信息,上传前检测
        data_send(type) {

            //type=manual,手动点击提交
            //type=auto,自动提交
            //商品属性提交
            //判断所有属性已经全部填写
            var self = this;

            //|| !self.pros.money_start || !self.pros.money_deposit || !self.pros.money_top || !self.pros.money_step || !self.pros.delay_minute
            if (type == 'manual') {
                if (!self.name_goods) {
                    self.$alert('请填写完整商品信息')
                    return
                }
                if (self.pros.money_start<=0||!self.pros.money_start) {
                    self.$alert('请填写起拍价')
                    return
                }
                if (self.pros.money_deposit<=0||!self.pros.money_deposit) {
                    self.$alert('请填写保证金')
                    return
                }
                if (self.pros.money_step<=0||!self.pros.money_step) {
                    self.$alert('请填写加价幅度')
                    return
                }
            }

            // for (var a in self.pros) {
            //     if (!self.pros[a]) {
            //         //未填写完整不自动提交
            //         if (type == 'manual') {
            //             self.$alert('请填写完整商品信息')
            //         }
            //         return
            //     }
            // }
            // //判断商品名称已填写
            // if (!self.name_goods) {
            //     if (type == 'manual') {
            //         self.$alert('请填写商品名称')
            //     }
            //     return
            // }
            //公用接口,修改商品
            if (type == 'auto') {
                self.loading = self.$loading({
                    lock: true,
                    text: '草稿保存中',
                    //spinner: 'el-icon-loading',
                    //background: 'rgba(0, 0, 0, 0.7)'
                });
            }

            if (self.id) {
                //判断预览图是否上传了
                if (type == 'manual') {
                    $.ajax({
                        url: ctx + '/anon/goods/auction/pics/' + self.id,
                        type: 'GET',
                        success: function (data) {
                            if (data.res == "s" && data.data.length > 0) {
                                //判断公司图是否存在
                                if (self.img_list[self.img_list.length - 1].index_pic > 11) {
                                    self.upload_data(type)
                                } else {
                                    self.$alert('您未上传商品样张或上传失败,请确保至少存在一张商品样张')
                                }
                            }
                            if (data.res == 's' && data.data.length == 0) {
                                self.$alert('您未上传预览图或上传失败,请确保至少存在一张预览图')
                            }
                            if (data.res == "f") {
                                alert(data.msg)
                            }
                        },
                        error: function (data) {
                            self.$message({
                                message: '请至少上传一张商品样张上传',
                                type: 'error'
                            })
                        }
                    })
                } else {
                    self.upload_data(type)
                }
            } else {
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }
        },
        //上传事件
        upload_data(type) {
            var self = this;
            var ajax1 = false;
            var ajax2 = false;
            var post_data = {
                "name_goods": self.name_goods,
                "id": self.id,
            }
            $.ajax({
                url: ctx + '/goods/update',
                type: "POST",
                async: false,
                cache: false,
                data: JSON.stringify(post_data),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.res == 'f') {
                        self.$alert(data.msg)
                    }
                    if (data.res == 's') {
                        ajax1 = true;
                        if (ajax1 && ajax2 && type == 'manual') {
                            // self.$message('已提交审核')
                            // self.toast = true;
                            // setTimeout(() => {
                            //     self.toast = false;
                            // }, 3000);
                        }
                        if (ajax1 && ajax2 && type == 'auto') {
                            setTimeout(() => {
                                self.loading.close();
                            }, 1000);
                        }
                    }
                }
            })

            //添加或修改拍卖商品属性
            //id为null为新建
            $.ajax({
                url: ctx + '/goods/auction/update/pros/' + self.id,
                type: "POST",
                async: false,
                cache: false,
                data: JSON.stringify(self.pros),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.res == "f") {

                        self.$alert(data.msg)
                    }
                    if (data.res == 's') {
                        ajax2 = true;
                        if (ajax1 && ajax2 && type == 'manual') {
                            // self.toast = true;
                            // setTimeout(() => {
                            //     self.toast = false;
                            // }, 3000);
                        }
                        if (ajax1 && ajax2 && type == 'auto') {
                            setTimeout(() => {
                                self.loading.close();
                            }, 1000);
                        }
                    }
                }
            })

            if (type == "manual") {
                $.ajax({
                    url: ctx + '/goods/submission/' + self.id,
                    type: 'POST',
                    success: function (data) {
                        if (data.res == 's' && data.data) {
                            self.toast = true;
                            setTimeout(() => {
                                self.toast = false;
                            }, 3000);
                        }
                        if (data.res == 'f') {
                            self.$message({
                                message: data.msg,
                                type: 'error'
                            })
                        }
                    }
                })
            }
        },
    },
    updated() {
        //定时提交,停止输入5s后自动提交一次

    },
    watch: {
        name_goods: function () {
            var self = this;
            self.count++;
            clearTimeout(self.fun_time_send);
            self.fun_time_send = setTimeout(function () {
                if (self.count > 20) {
                    // self.data_send('auto');
                }
            }, 15000)
        },
        pros: {
            handler() {
                var self = this;
                self.count++;
                clearTimeout(self.fun_time_send);
                self.fun_time_send = setTimeout(function () {
                    if (self.count > 20) {
                        // self.data_send('auto');
                    }
                }, 15000)
            },
            deep: true,

        }
    }
})