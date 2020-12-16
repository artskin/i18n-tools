<template>
  <div class="app">
    <HelloWorld msg="hello Vue3"></HelloWorld>
  </div>
</template>
<script>
  import HelloWorld from './components/Helloworld.vue'
  export default {
    name:'App',
    components:{
      HelloWorld
    }
  }
</script>

<style lang="less">
.app{
  border:1px solid #ccc;
}
</style>