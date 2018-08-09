<template>
  <div >
    time
    <div v-on:click="f_"></div>
    <hello msg="1"></hello>
  </div>
</template>

<script>
import hello from '@/components/Hello'
import con from '@/conf.js'
import {$} from 'jquery'
export default {
  name: 'test2',
  data(){
    
  },
  mounted(){},
  methods:{
    f_(){
      
    }
  },
  template: '<hello/>',
  components: { hello }
}
</script>
<style>

</style>
