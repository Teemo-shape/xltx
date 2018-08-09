<template>
    <div class="top_half" v-cloak>
        <header>
            <a href="/account/index.html" class="logo f_l">
                <img src="../../static/img/logo_new.png"/>
            </a>
            <div class="classify pop_header f_l">
                <h4 class="classify_btn dropdown clearfix" @click="list1_show=!list1_show">
                    <span class="select_classify">{{select_classify1}}</span>
                    <span class="iconfont">&#xe792;</span>
                </h4>
                <ul class="select_items arrow_appear" v-show="list1_show">
                    <li class="select_item" v-for="(l,i) in getdata.list" :key="i" @click="list1_click(i)">
                        <a href="javascript:void(0)">{{l.name}}</a>
                    </li>
                </ul>
            </div>
            <div class="search f_l">
                <div class="select_btn pop_header">
                    <div @click="list2_show=!list2_show"  class="search_title dropdown clearfix">
                        <span class="select_classify">{{select_classify2}}</span>
                        <span class="iconfont">&#xe61c;</span>
                    </div>
                    <ul class="select_items" v-show="list2_show">
                        <li v-for="(ll,ii) in getdata.list[list1_index].child" :key="ii" @click="select_classify2=ll.name;list2_show=false" class="select_item">{{ll.name}}</li>
                    </ul>
                </div>
                <div class="search_container">
                    <input type="text" v-model="keyword" @keyup.enter="search" class="search_input" value="" name="select" :placeholder="placeholder"/>
                </div>
                <div @click="search" class="search_icon button iconfont">&#xe604;</div>
            </div>
            <div class="not_login f_l" v-if="!has_login">
                <a href="/account/login.html" class="login_btn butn">登录</a>
                <a href="/account/register.html" class="register_btn butn">注册</a>
            </div>
            <div class="account_list pop_header f_r" v-if="has_login">
                <div class="button butn clearfix"><span @click="account_show=!account_show;" class="iconfont select_show f_r">&#xe792;</span><a href="/company/member_index.html" :title="user_name" class="user_name ellipsis f_r">{{user_name}}</a></div>
                <ul class="account_items arrow_appear" v-show="account_show">
                    <a href="/company/member_index.html" class="home_page button">我的主页</a>
                    <li class="button logout" @click="exitLogin($event)">退出</li>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../../static/js/libs/jquery-1.9.1.min.js";

Vue.config.productionTip = false; //阻止提示
Vue.use(ElementUI);

export default {
  data() {
    return {
      getdata: {
        list: [
          {
            name: "",
            child: [
              {
                name: ""
              }
            ]
          }
        ]
      },
      list1_index: 0,
      select_classify1: "所有品类",
      select_classify2: "分类",
      list1_show: false,
      list2_show: false,
      account_show: false,
      has_login: false,
      user_name: "我的账户",
      keyword: "",
      placeholder: "IC电子元件"
    };
  },
  methods: {
    loadPlaceholder: function() {
      var self = this;
      $.ajax({
        url: ctx + "/anon/goods/recommend",
        type: "get",
        cache: false,
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(data) {
          if (handleResponseData(data)) {
            if (data.res == "s" && data.data) {
              self.placeholder = data.data;
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    },
    loadUser() {
      var self = this;
      $.ajax({
        url: ctx + "/get/user",
        type: "get",
        cache: false,
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(data) {
          if (handleResponseData(data)) {
            if (data.user) {
              self.user_name = data.user.uname;
              self.has_login = true;
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    },
    list1_click(i) {
      this.list1_index = i;
			this.list1_show = false;
			this.select_classify1 = this.getdata.list[i].name;
      this.select_classify2 = this.getdata.list[i].child[0].name;
    },
    exitLogin(event) {
      var self = this;
      var ele = event.currentTarget;
      $(ele).attr("disabled", "disabled");
      $.ajax({
        url: ctx + "/user/logout",
        type: "post",
        cache: false,
        async: false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              self.account_show = false;
              self.has_login = false;
            } else if (data.res == "f") {
              self.$message({
                message: data.msg,
                type: "error"
              });
            }
          }
          $(ele).removeAttr("disabled");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $(ele).removeAttr("disabled");
          console.log(errorThrown);
        }
      });
    },
    search: function() {
      var self = this;
      if (self.keyword) {
        window.location.href =
          ctx +
          "/goods/search_results.html?k=" +
          encodeURI(encodeURI(self.keyword)); // +
        // "&a=" +
        // encodeURI(encodeURI(self.select_classify1)) +
        // "&t=" +
        // encodeURI(encodeURI(self.select_classify2));
      } else {
        window.location.href =
          ctx +
          "/goods/search_results.html?k=" +
          encodeURI(encodeURI(self.placeholder)); // +
        // "&a=" +
        // encodeURI(encodeURI(self.select_classify1)) +
        // "&t=" +
        // encodeURI(encodeURI(self.select_classify2));
      }
    }
  },
  mounted() {
    // 获取信息
    var self = this;
    self.loadPlaceholder();
    //判断搜索页面则修改相应搜索条件
    if (location.pathname == "/goods/search_results.html") {
      var keyword = getUrlParam("k");
      var select_classify1 = getUrlParam("a");
      var select_classify2 = getUrlParam("t");
      if (keyword) {
        self.keyword = decodeURI(keyword);
      }
      //同步选择的类型
      // if (select_classify1) {
      // 	self.select_classify1 = decodeURI(select_classify1);
      // }
      // if (select_classify2) {
      // 	self.select_classify2 = decodeURI(select_classify2);
      // }
    }

    var protocolStr = document.location.protocol; //判断https,https协议
    var ctx = protocolStr + "//" + window.location.host;
    self.loadUser();
    $("body").on("click", function(e) {
      e = e || window.event;
      var container = e.srcElement ? $(e.srcElement) : $(e.target);
      if (
        container.parents(".pop_header").length <= 0 &&
        !container.hasClass("pop_header")
      ) {
        self.account_show = false;
        self.list1_show = false;
        self.list2_show = false;
      } else if (
        container.parents(".classify").length > 0 ||
        container.hasClass("classify")
      ) {
        self.account_show = false;
        self.list2_show = false;
      } else if (
        container.parents(".search").length > 0 ||
        container.hasClass("search")
      ) {
        self.account_show = false;
        self.list1_show = false;
      } else if (
        container.parents(".account_list").length > 0 ||
        container.hasClass("account_list")
      ) {
        self.list1_show = false;
        self.list2_show = false;
      }
    });
    setTimeout(() => {
      var data = {
        list: [
          {
            name: "所有品类",
            child: [{ name: "分类" }]
          },
          {
            name: "模拟器件",
            child: [
              { name: "放大器" },
              { name: "稳压器" },
              { name: "传感器" },
            ]
          },
          {
            name: "分立器件",
            child: [
              { name: "二极管" },
              { name: "晶体管" },
            ]
          },
          {
            name: "机电产品",
            child: [
              { name: "电路保护" },
              { name: "电源" },
              { name: "继电器" },
              { name: "开关" },
              { name: "热管理" },
              { name: "定时器件" },
            ]
          },
          {
            name: "无源器件",
            child: [
              { name: "电容" },
              { name: "滤波器" },
              { name: "电感" },
              { name: "电阻" },
              { name: "变压器" },
            ]
          }
        ]
      };
      self.getdata = data;
    }, 100);
  }
};
</script>


<style>
.top_half {
  width: 100%;
  min-width: 1218px;
  height: 90px;
  background: #fff;
}
header {
  width: 1200px;
  height: 90px;
  margin: 0 auto 19px;
  font-size: 16px;
  color: #333;
  line-height: 50px;
}
header .logo {
  margin-top: 28px;
}
.logo img {
  width: 192px;
}
header .classify {
  width: 114px;
  margin: 20px 30px 0;
  position: relative;
}
.classify .classify_btn {
  width: 114px;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: 500;
}
.classify_btn .select_classify {
  width: 88px;
  text-align: right;
  margin-right: 9px;
  float: left;
}
.classify_btn .iconfont {
  font-size: 12px;
}
.classify_item a {
  color: #333;
}

header .search {
  width: 672px;
  height: 48px;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-flow: row;
  border: 1px solid #adadad;
  border-radius: 5px;
  margin-top: 20px;
}
header .search .select_btn {
  height: 48px;
  position: relative;
  display: inline-block;
}
header .select_btn .search_title {
  width: auto;
  height: 28px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin: 10px 0;
  box-sizing: border-box;
  border-right: 1px solid #adadad;
}
header .search_title span {
  margin-right: 7px;
  float: right;
}
header .search_title .select_classify {
  text-indent: 11px;
  float: left;
}
header .select_items {
  width: 100%;
  text-indent: 11px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  left: -1px;
  top: 48px;
  z-index: 9;
}
header .select_items .select_item {
  height: 30px;
  line-height: 30px;
}
header .search_icon {
  width: 50px;
  height: 48px;
  text-align: center;
  font-size: 28px;
  color: #8e8e8e;
  line-height: 48px;
}
header .search .search_container {
  width: auto;
  -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1; /* OLD - Firefox 19- */
  -webkit-flex: 1; /* Chrome */
  -ms-flex: 1; /* IE 10 */
  flex: 1; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  overflow: hidden;
}
header .search .search_input {
	width: 100%;
  height: 48px;
  text-indent: 14px;
  vertical-align: top;
  border: none;
}

header .butn {
  height: 50px;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
  color: #333;
  display: inline-block;
  padding: 0 10px;
  margin-top: 20px;
}
.select_items .select_item:hover,
header .login_btn:hover,
header .register_btn:hover {
  background: #e5e5e5;
}
header .login_btn {
  margin-left: 20px;
}
.home_page {
  height: 40px;
  line-height: 40px;
  display: block;
}
.account_list {
  height: 50px;
  margin-top: 20px;
  margin-right: 10px;
  position: relative;
}
.account_list .butn {
  padding: 0;
  margin-top: 0;
}
.select_show {
  line-height: 60px;
  margin-left: 8px;
}
.user_name {
  width: 100px;
  text-align: right;
  padding-right: 10px;
}
.account_items {
  width: 100%;
  text-align: center;
  border: solid 1px #d1d1d1;
  background: #fff;
  position: absolute;
  top: 50px;
  left: -1px;
  z-index: 9;
}
.account_items li {
  height: 40px;
  line-height: 40px;
}
.account_items li:hover,
.home_page:hover {
  background: #e5e5e5;
}
</style>

