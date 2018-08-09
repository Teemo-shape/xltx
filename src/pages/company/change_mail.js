import Vue from 'vue'
import headersim from '../../components/headersim.vue'
import  '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示

new Vue({
    el: '#app',
    data() {
        return {
            msg: ""
        }
    },
    components: {
        headersim
    },
    mounted() {
        var self = this;
        var token = getUrlParam('token');
        $.ajax({
            url: ctx + '/member/bindedit/email?token=' + token,
            type: "post",
            cache: false,
            async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.res == 's') {
                    window.location.href = ctx + "/company/member_uptmail_third.html";
                }
                if (data.res == 'f') {
                    self.msg = data.msg;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("网络异常，请重试一次");
                console.log(errorThrown);
            }
        })
        //动态设置背景高度
        var cont_height = $(".container").height();
        $(".bg").height(cont_height-100);
    }
})