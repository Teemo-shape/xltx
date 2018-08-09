<template>
  <div id="toast" v-show="message">
      <div class="html">
            <i class="iconfont">&#xe75a;</i>
            <span>已成功提交审核</span>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props: ['message'],
    mounted(){
        
    },
    watch:{
        message:function(){
            var self=this;
        }
    }
}
</script>
<style lang="less" scoped>
#toast{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .html{
        position: absolute;
        top: 40%;
        width: 450px;
        left: 50%;
        z-index: 200;
        margin-left: -225px;
        background: #fff;
        text-align: center;
        box-shadow: 2px 2px 5px #888;
        i,span{
            font-size: 18px;
            line-height: 100px;
            color: black
        }
        i{
            color: #fa5400
        }
    }
}
</style>

