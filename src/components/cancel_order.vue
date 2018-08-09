<template>
    <div id="cancel_order" @click="close_div()">
        <div class="html" @click.stop>
            <i class="el-icon-close" @click="close_div()"></i>
            <p class="ttt">
                <i class="iconfont" style="color: #fa5400;font-size:20px;margin-right:5px;">&#xe6b7;</i>您确定要取消该订单吗?如果您主动取消订单，系统<span>判定您负违约责任，交易关闭并扣除您的保证金。</span>
            </p>
            <div class="clearfix" style="margin-top:20px;">
                <div class="f_l" style="margin-left:40px;">
                    您的理由:
                </div>
                <div class="f_r">
                    <div class="input" @click="ul_show()">
                        {{text}}
                        <i class="el-icon-caret-bottom fri"></i>
                    </div>
                    <ul v-show="list_show">
                        <li @click="li_click(i)" v-for="(l,i) in list" :key="i">{{l.details_reason}}</li>
                    </ul>
                </div>
            </div>
            <textarea name="" id="" cols="30" rows="10" v-show="textarea_show"></textarea>
            <div class="button">
                <a class="btn1" @click="save_cancel()">确定</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            text: '请选择关闭理由',
            list_show: false,
            textarea_show: false,
            id_giveup_reason: 0,//取消的原因id
            list: [
                // {
                //     "id_giveup_reason": 1,
                //     "details_reason": "东西有问题",
                //     "type_user": 1
                // }
            ]
        }
    },
    mounted() {
        var self = this;
        $.ajax({
            url: ctx + '/trade/giveup/reason/meta',
            type: "GET",
            success: function (data) {
                if (data.res == 's' && data.data) {
                    self.list = data.data
                }
                if (data.res == "f") {
                    self.$message({
                        message: data.msg,
                        type: 'error'
                    })
                }
            }
        })
    },
    methods: {
        //确认取消
        save_cancel() {
            var self = this;
            var form = new FormData();
            form.append("id_order", getUrlParam("id"));
            form.append("id_giveup_reason", self.id_giveup_reason);
            $.ajax({
                url: ctx + '/buyers/order/giveup',
                type: 'POST',
                data: form,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.res == "s" && data.data) {
                        self.$message({
                            message: '成功取消订单',
                            type: 'success'
                        })
                        self.$emit('kidshow', false)
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
        ul_show() {
            this.list_show = !this.list_show
        },
        //点击下拉
        li_click(i) {
            this.text = this.list[i].details_reason
            this.id_giveup_reason = this.list[i].id_giveup_reason
            this.list_show = false
        },
        //关闭组件
        close_div() {
            this.$emit('kidshow', false)
        }
    },
    props: ['message'],
    watch: {
        // text() {
        //     if (this.text == '其他') {
        //         this.textarea_show = true
        //     } else {
        //         this.textarea_show = false
        //     }
        // },
    }
}
</script>
<style lang="less" scoped>
#cancel_order {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .html {
    position: absolute;
    padding: 40px;
    top: 30%;
    width: 480px;
    left: 50%;
    z-index: 200;
    margin-left: -280px;
    background: #fff;
    box-shadow: 2px 2px 5px #888;
    h4 {
      font-size: 18px;
      margin-bottom: 40px;
    }
    .f_l {
      line-height: 50px;
      font-size: 18px;
    }
    .f_r {
      font-size: 18px;
      width: 330px;
      position: relative;
      .input {
        border: 1px solid #ddd;
        line-height: 48px;
        text-align: left;
        padding-left: 15px;
        cursor: pointer;
      }
      ul {
        position: absolute;
        z-index: 300;
        width: 100%;
        cursor: pointer;
        text-align: left;
        li {
          padding-left: 15px;
          line-height: 48px;
          background: #fff;
          color: #333;
          border: 1px solid #ddd;
          border-top: none;
          &:hover {
            background: #fa5400;
            color: #fff;
          }
        }
      }
    }
  }
}
.button {
  margin-top: 20px;
  cursor: default;
  text-align: center;
  a {
    padding: 10px 40px;
    cursor: pointer;
  }
  .btn1 {
    display: inline;
    color: #fff;
    background: #fa5400;
  }
  .btn2 {
    display: inline;
    color: #fff;
    background: #000;
  }
}
.fri {
  line-height: 50px;
  margin-right: 20px;
  float: right;
  font-size: 24px;
}
.el-icon-close {
  float: right;
  margin-top: -20px;
  margin-right: -20px;
  font-size: 20px;
  cursor: pointer;
}
.ttt {
  font-size: 18px;
}
.ttt span {
  font-weight: 700;
}
</style>

