import Vue from 'vue'
import headersim from '../../components/headersim.vue'
import  '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示

new Vue({
    el: '#app',
    data() {
        return {
            msg: "",
            should_show: false,
            link_show: false
        }
    },
    components: {
        headersim
    },
    mounted() {
        var self = this;
        var token = encodeURIComponent(getUrlParam('token'));
        $.ajax({
            url: ctx + '/member/join/init/psw?token=' + token,
            type: "GET",
            cache: false,
            async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                
                if (data.res == 's') {
                    window.location.href = ctx + "/company/member_chgpsw.html";
                }
                if (data.res == 'f') {
                    if (data.msg == "8025") {
                        self.msg = "您已接受邀请，可直接"
                        self.link_show = true;
                        return;
                    }
                    self.msg = data.msg;
                }
                self.should_show = true;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                self.msg = "网络异常，请重试一次";
                self.should_show = true;
                console.log(errorThrown);
            }
        })
        //动态设置背景高度
        var cont_height = $(".container").height();
        $(".bg").height(cont_height-100);
    }
})