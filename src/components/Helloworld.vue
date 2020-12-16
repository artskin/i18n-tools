<template>
  <p>{{ msg }} </p>
  <button class="btn">点击</button>
</template>
<script>
  export default {
    name:'HelloWorld',
    props:{
      msg:String
    }
  }
</script>
<style lang="less">
button{
  background :#fff;
  padding: 20px;
}
.btn{
  background: rebeccapurple;
}
</style>