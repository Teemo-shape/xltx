import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'
import  '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  data: {
    menu_name: 'member_index',  //左侧菜单选中项
    editState: false,  //会员名编辑状态
    uname: "", //会员名
    uemail: "", //绑定邮箱
    uphone: "", //绑定手机号
    upwd: "", //密码
    hasQuestion: false, //是否有密保问题
    wechat_img: "", //绑定微信二维码
    wechat_display: false, //微信二维码大图显示
    fail_name_tip: {  //编辑中的会员名状态
      true: "",
      empty: "会员名不能为空",
      another: "会员名格式为2-8个汉字/4-16个英文(可以混输)",
      msg: ""
    },
    fail_name_index: "true", //会员名的状态名
    isEdit: false //是否在编辑中
  },
  components: {
    headerCart,
    leftMenu,
    commonFooter
  },
  methods:{
    /**
     * 初始化个人信息
     */
    loadInfo: function () {
      var self = this;
      $.ajax({
        url: ctx + '/member/info',
        type:"get",
        cache:false,
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.user.uname) {
              self.uname = data.user.uname;
            }
            if (data.user.upwd) {
              self.upwd = data.user.upwd;
            }
            if (data.user.uemail) {
              self.uemail = data.user.uemail;
            }
            if (data.user.uphone) {
              self.uphone = data.user.uphone;
            }
            if (data.wechat_img) {
              self.wechat_img = data.wechat_img;
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert("网络异常，请重试一次", {
            theme: danger
          });
          console.log(errorThrown);
        }
      })
    },
    /**
     * 获取url中的参数值
     * @param {String} name url中的参数名
     */
    getUrlParam:  function (name) {  
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
      if (r != null) return unescape(r[2]); return null; //返回参数值  
    },
    /**
     * 检测编辑中的用户名是否合格
     * @param {Object} event $event
     */
    checkValue: function (event) {
      var self = this;
      var name = event.currentTarget.value;
      var nameLength = name.replace(/[^\x00-\xff]/g,"aa").length;
      var reg = /^[a-zA-Z\u4e00-\u9fa5]{2,16}$/;
      self.isEdit = false;
      if (name=="") {
        self.fail_name_index = "empty";
      } else if (reg.test(name)) {
        if (4 <= nameLength <= 16) {
          if (name != self.uname) {
            self.changeName(name,event);
          } else {
            self.isEdit = false;
          }
        } else {
          self.fail_name_index = "another";
        }
      } else {
        self.fail_name_index = "another";
      }
      self.blurBorder(event);
    },
    /**
     * 修改用户名
     * @param {String} name 要提交的用户名
     */
    changeName: function (name,event) {
      var self = this;
      var vo = {"uname": name};
      $.ajax({
        url: ctx + '/member/update/name',
        type:"post",
        cache:false,
        async:false,
        data: JSON.stringify(vo),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              self.fail_name_index = "true";
              self.isEdit = false;
            } else if (data.res == "f") {
              self.fail_name_tip["msg"] = data.msg;
              self.fail_name_index = "msg";
            }
            self.uname = data.data;
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert("网络异常，请重试一次", {
            theme: danger
          });
          console.log(errorThrown);
        }
      })
    },
    /**
     * 判断是否设置过密保问题
     */
    checkQuestion: function () {
      var self = this;
      $.ajax({
        url: ctx + '/member/get/security',
        type:"get",
        cache:false,
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              if (data.user_questions) {
                self.hasQuestion = true;
              } 
              else if (data.sys_questions) {
                self.hasQuestion = false;
              }
            } else if (data.res == "f") {
              alert(data.msg);
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          alert("网络异常，请重试一次", {
            theme: danger
          });
          console.log(errorThrown);
        }
      })
    },
    blurBorder: function (event) {
      $(event.currentTarget).css("border","solid 1px #e5e5e5");
    },
    focusBorder: function (event) {
      $(event.currentTarget).css("border","solid 1px #a0a0a2");
    }
  },
  mounted(){
    var self = this;
    self.loadInfo();
    self.checkQuestion();
    //动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
  }
})