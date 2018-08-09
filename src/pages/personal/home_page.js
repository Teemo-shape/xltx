import Vue from 'vue'
import headerCart from '../../components/headerCart.vue'
import leftMenu from '../../components/leftMenu.vue'
import commonFooter from '../../components/footer.vue'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  data: {
    menu_name: 'home_page'
  },
  components: {
    headerCart,
    leftMenu,
    commonFooter
  },
  mounted(){

  },
  methods:{
    
  }
})