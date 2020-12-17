<template>

  <!-- <HelloWorld msg="hello Vue3"></HelloWorld> -->
  <HomePage></HomePage>

</template>
<script>
  import HelloWorld from './components/Helloworld.vue'
  import HomePage from './page/home.vue'
  export default {
    name:'App',
    components:{
      HelloWorld,HomePage
    }
  }
</script>

<style lang="less">
.app{
  border:1px solid #ccc;
}
</style>