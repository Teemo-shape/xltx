import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'
import  '../../../static/js/libs/jquery-1.9.1.min.js'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  data: {
    menu_name: 'member_index',
    roles: [],
    selectArray: [], //选中的多选框
  },
  components: {
    headerCart,
    leftMenu,
    commonFooter
  },
  mounted(){
    var self = this;
    this.loadRoles();
    //动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
  },
  methods:{
    loadRoles: function () {
      var self = this;
      $.ajax({
        url: ctx + '/manager/all/roles',
        type:"get",
        cache:false,
        async:false,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success:function (data) {
          if (handleResponseData(data)) {
            if (data.res == "s") {
              if (data.roles) {
                data.roles.map((n,i)=>{
                  n.check=false;
                })
                self.roles = data.roles;
              }
            } else if (data.res == "f") {
              $(".fail_tip").html('<i class="iconfont">&#xe657;</i>' + data.msg).css("visibility","visible");
            }
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          $(".fail_tip").html('<i class="iconfont">&#xe657;</i>网络异常，请重试一次').css("visibility","visible");
          console.log(errorThrown);
        }
      })
    },
    check: function (index) {
      var self = this;
      self.roles[index].check = !self.roles[index].check;
      if (self.roles[index].check) {
        self.selectArray.push(self.roles[index].role_id);
      } else {
        self.removeByValue(self.selectArray,self.roles[index].role_id);
      }
    },
    removeByValue: function (arr, val) {
      for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    }
  },
  computed: {
    selectValue: function () {  //选中的多选框的值
      var self = this;
      var str = self.selectArray.join("-");
      return str;
    }
  }
})