import Vue from 'vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false //阻止提示
Vue.use(Element, {
  size: 'small'
});

new Vue({
  el: '#app',
  data() {
    return {}
  },
  mounted() {
    var token = encodeURIComponent(getUrlParam('token'));
    var self = this;
    $.ajax({
      url: ctx + '/user/reset/psw/email/valid?token=' + token,
      type: "GET",
      cache: false,
      async: false,
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      success: function (data) {
        if (data.res == 's') {
          window.location.href = ctx + "/account/email_reset_psd.html?uid=" + data.uid
        }
        if (data.res == 'f') {
          self.$alert(data.msg, '出现错误', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.href = ctx + "/account/mail_psd.html"
            }
          });
        }
      },
      error: function (data) {
        self.$alert(data.msg, '出现错误', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.href = ctx + "/account/mail_psd.html"
          }
        });
      }
    })
  }
})