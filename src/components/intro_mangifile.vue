<template>
    <div class="intro_magnifier f_l clearfix">
        <ul class="tb-thumb f_l" id="thumblist">

            <li class="tb-selected" v-for="(l,i) in img_list" :key="i">
                <a href="javascript:void(0);" @mouseenter="img_change(i)">
                    <img class="width60" :src="l.url_pic_small">
                </a>
            </li>

        </ul>
        <div class="tb-booth f_l">
            <a href="javascript:void(0);">
                <img :src="tb_zoom" alt="" :rel="tb_zoom" class="tb_zoom" />
            </a>
        </div>
        <ul class="act f_l clearfix">
            <li class="sign_up">
                <span class="num" v-html="sign_up"></span>人报名</li>
            <li class="onlookers">
                <span class="num" v-html="onlookers"></span>次围观</li>
        </ul>
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
            sign_up: 0,//报名人数
            onlookers:0 //围观人数
        }
    },
    props: ['message'],
    watch: {
        message: function () {
            var self = this;
            if (this.message!=this.id) {
                self.id = self.message;
                $.ajax({
                    url: ctx + '/anon/goods/pics/' + self.id,
                    type: 'GET',
                    success: function (data) {
                        if (data.res == "s" && data.data && data.data.length > 0) {
                            self.img_list = data.data
                            self.tb_zoom=self.img_list[0].url_pic
                        }
                        if (data.res == "f") {
                            self.$message({
                                message:data.msg,
                                type:'error'
                            })
                        }
                    }
                })
                $.ajax({
                    url:ctx+'/anon/goods/auction/elements/'+self.id,
                    type:'GET',
                    success:function(data){
                        if(data.res=='s'&&data.data){
                            data.data.forEach((n,i)=>{
                                if(n.id_element==1){
                                    self.onlookers=n.value_element
                                }
                                if(n.id_element==2){
                                    self.sign_up=n.value_element
                                }
                            })
                        }
                        if(data.res=='f'){
                            self.$message({
                                message:data.msg,
                                type:'error'
                            })
                        }
                    }
                })
            } else {
                //新建,

            }
        }
    },
    mounted() {
        //放大镜初始化
        $(".tb_zoom").imagezoom();
    },
    methods: {
        //切换图片
        img_change(i) {
            this.tb_zoom = this.img_list[i].url_pic
        },
        
    }
}
</script>
<style lang="less" scoped>
.width60 {
  max-width: 60px;
  max-height: 60px;
}
</style>

