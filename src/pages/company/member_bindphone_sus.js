import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  data: {
    menu_name: 'member_index',
    num: 3
  },
  components: {
    headerCart,
    leftMenu,
    commonFooter
  },
  mounted(){
    var self = this;
    window.uptphone = setInterval(function () {
      if (self.num <= 1) {
        clearInterval(window.uptphone);
        location.href = ctx + "/company/member_info.html";
        return;
      }
      self.num--;
    },1000);
    //动态设置背景高度
		var cont_height = $(".container").height();
		$(".bg").height(cont_height-100);
  },
  methods:{
    
  }
})