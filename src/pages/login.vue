<template>
  <div class="login-box">
    44444444444444
  </div>
</template>

<script>
  export default {
    name: 'login'
  }
</script>

<style lang="scss" scoped>
  .login-box {
    height: 100%;
    height: 100%;
    overflow: hidden;
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-image: url("../assets/image/login-bg.jpg");
      background-size: cover;
      background-position: center center;
    }
    &:hover{
      cursor: pointer;
      filter: blur(10px);
      transition: filter .2s;
    }
  }
</style>
