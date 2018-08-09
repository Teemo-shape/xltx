import Vue from 'vue'
import headersim from '../../components/headersim.vue'

Vue.config.productionTip = false //阻止提示

new Vue({
  el: '#app',
  template: '<headersim/>',
  components: {
    headersim
  },
  mounted(){

  },
  methods:{
    
  }
})