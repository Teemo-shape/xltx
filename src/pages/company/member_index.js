import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'
import  '../../../static/js/libs/jquery-1.9.1.min.js'
import  '../../../static/js/config/package.js'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  data: {
    menu_name: 'member_index',  //左侧菜单选中项
    member_list: [],  //内部成员列表
    uid: 0, //我的uid
    iAmAdmin: false,  //我是否为管理员,
    hasCertified: false, //我是否认证过
    roles: []  //我的权限
  },
  methods: {
    /**
     * 加载内部成员列表
     */
    loadMember: function () {
      var self = this;
      $.ajax({
        url: ctx + '/member/list',
        type:"get",
        cache:false,
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              if (data.uid) {
                self.uid = data.uid;
              }
              if (data.members) {
                self.member_list = data.members;
              }
              if (data.msg) {
                $(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
              }
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          $(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
          console.log(errorThrown);
        }
      })
    },
    /**
     * 判断我是否认证过
     * @param {Number} index 成员索引
     */
    isCertified: function (index) {
      var self = this;
      var flag = false;
      if (!self.member_list[index].ids_permission) {
        return flag;
      }
      for (let i = 0, len = self.member_list[index].ids_permission.length; i < len; i++) {
        const element = self.member_list[index].ids_permission[i];
        if (element == 1) {
          flag = true;
        }
      }
      return flag;
    },
    /**
     * 删除成员
     * @param index 成员索引
     */
    deleteMember: function (params) {
      var self = this;
      var index = params.index;
      var uid = self.member_list[index].uid;
      $.ajax({
        url: ctx + "/manager/del/member?form_token=" + form_token,
        type:"post",
        data: uid,
        cache:false,
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              self.member_list.splice(index,1);
            } else if (data.res == "f") {
              $(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
            }
            form_token = data.form_token;
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          $(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
          console.log(errorThrown);
        }
      })
    },
    checkDelete: function (index) {
      var self = this;
      confirm({
        message: "确定移除？",
        confirmCallback: self.deleteMember,
        params: {
          index: index
        }
      })
    }
  },
  components: {
    headerCart,
    leftMenu,
    commonFooter
  },
  mounted(){
    var self = this;
    self.loadMember();
    self.roles = user_roles;
    if (self.roles) {
      for (let index = 0; index < self.roles.length; index++) {
        const element = self.roles[index];
        if (element == 1) {
          self.hasCertified = true;
        }
        if (element == 2) {
          self.iAmAdmin = true;
        }
      }
    }
    //动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
  }
})