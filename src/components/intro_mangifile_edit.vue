<template>
    <div class="intro_magnifier f_l clearfix">
        <ul class="tb-thumb f_l" id="thumblist">
            <li class="tb-selected thumb_item" v-for="(l,i) in img_list" :key="i">
                <a href="javascript:void(0);" @mouseenter="img_change(i)">
                    <img class="width60" :src="l.url_pic">
                </a>
                <div class="img_change_sm">
                    <label>
                        <span class="iconfont">&#xe669;</span>
                        <input accept="image/*" :id="'img_'+i" type="file" class="file" @change="img_up(i)" />
                    </label>
                </div>
            </li>
            <li v-if="img_list.length<4">
                <label for="file_new">
                    <img src="../../static/img/img_add_01.png">
                </label>
                <input accept="image/*" id="file_new" @change="add_new()" type="file" class="file">
            </li>
        </ul>
        <div class="tb-booth f_l">
            <a href="javascript:void(0);">
                <img :src="tb_zoom" alt="" :rel="tb_zoom" class="tb_zoom" />
            </a>
        </div>
    </div>
</template>
<script>
import '../../static/js/libs/jquery-1.9.1.min.js'
import '../../static/js/config/package.js'
import '../../static/js/plugins/jquery.imagezoom.js'
export default {
    data() {
        return {
            img_list: [

            ],
            tb_zoom: '',
            id: '',
        }
    },
    props: ['message'],
    mounted() {
        //放大镜初始化
        $(".tb_zoom").imagezoom();
    },
    methods: {
        //切换图片
        img_change(i) {
            this.tb_zoom = this.img_list[i].url_pic
        },
        //上传图片,替换图片
        img_up(i) {
            var self = this;
            if (self.message) {
                var file = document.getElementById("img_" + i).files[0];
                // var r = new FileReader();  //本地预览
                // r.onload = function () {
                //     // var strs = new Array(); //定义一数组 
                //     var strs = r.result.split(",")[1]; //字符分割 
                //     self.img_list[i].img_data = strs
                //     self.img_list[i].big = strs
                //     self.tb_zoom.img = strs
                //     self.tb_zoom.rel = strs
                // }
                // r.readAsDataURL(file);    //Base64
                //上传图片
                var from = new FormData();
                from.append("goods_img", file);
                $.ajax({
                    url: ctx + '/goods/pic/' + self.message + '/' + (i - 1 + 2),
                    type: 'POST',
                    data: from,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.res == 's') {
                            //上传成功 
                            self.$message({
                                message: '替换成功!',
                                type: 'success'
                            })
                            $.ajax({
                                url: ctx + '/anon/goods/pics/' + self.id,
                                type: 'GET',
                                success: function (data) {
                                    if (data.res == "s" && data.data) {
                                        self.img_list = data.data
                                        self.tb_zoom = data.data[0].url_pic
                                        $(".tb_zoom").imagezoom();
                                    }
                                    if (data.res == "f") {
                                        alert(data.msg)
                                    }
                                }
                            })

                        }
                        if (data.res == "f") {
                            //上传失败
                            alert(data.msg)
                        }
                    }
                })
            } else {
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }
        },

        //添加新图
        add_new: function () {
            var self = this;
            if (self.id) {
                var file = document.getElementById("file_new").files[0];
                // var r = new FileReader();  //本地预览
                // r.onload = function () {
                //     // var strs = new Array(); //定义一数组 
                //     var strs = r.result.split(",")[1]; //字符分割 
                //     self.img_list.push({
                //         img_data: strs,
                //         big: strs
                //     })
                //     if (self.img_list.length == 1) {
                //         self.tb_zoom.img = strs
                //         self.tb_zoom.rel = strs
                //     }
                // }
                // r.readAsDataURL(file);    //Base64
                //上传图片
                var from = new FormData();
                from.append("goods_img", file);
                $.ajax({
                    url: ctx + '/goods/pic/' + self.message + '/' + (self.img_list.length - 1 + 2),
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    data: from,
                    success: function (data) {
                        if (data.res == 's') {
                            //上传成功 
                            self.$message({
                                message: '上传成功!',
                                type: 'success'
                            })
                            $.ajax({
                                url: ctx + '/anon/goods/pics/' + self.id,
                                type: 'GET',
                                success: function (data) {
                                    if (data.res == "s" && data.data) {
                                        self.img_list = data.data
                                        self.tb_zoom = data.data[0].url_pic
                                        $(".tb_zoom").imagezoom();
                                    }
                                    if (data.res == "f") {
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
                self.$alert('请先输入商品信息,点击回车键注册商品')
            }
        }
    },
    watch: {
        message: function () {
            var self = this;
            if (this.message!=this.id&&this.message) {
                self.id = self.message;
                $.ajax({
                    url: ctx + '/anon/goods/pics/' + self.id,
                    type: 'GET',
                    success: function (data) {
                        if (data.res == "s" && data.data.length>0) {
                            self.img_list = data.data
                            self.tb_zoom = data.data[0].url_pic
                            $(".tb_zoom").imagezoom();
                        }
                        if (data.res == "f") {
                            alert(data.msg)
                        }
                    }
                })
            } else {
                //新建,

            }
        }
    }
}
</script>
<style lang="less" scoped>
.thumb_item {
  position: relative;
}
.img_change_sm {
  width: 24px;
  height: 24px;
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  background: #fff;
  position: absolute;
  right: 1px;
  bottom: 1px;
}
input {
  visibility: hidden;
}
.width60 {
  max-width: 60px;
  max-height: 60px;
}
</style>

