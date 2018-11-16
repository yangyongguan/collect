<template>
  <div class="home">
    <header>
      <div class="logo"></div>
      <nav class="main-nav">
        <span class="main-nav-item" v-for="menu in homeMenus" @click="goLink(menu.link)">{{menu.name}}</span>
      </nav>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        homeMenus: [
          {
            name: 'threeJs',
            link: 'threejs'
          }
        ]
      }
    },
    methods: {
      goLink (url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    header {
      height: 80px;
      color: #fff;
      background-color: #33414a;
      line-height: 80px;
      .logo {
        float: left;
        width: 50px;
        height: 50px;
        margin-top: 15px;
        margin-left: 5%;
        border-radius: 50%;
        background-color: #FC5659;
        background-image: url("../assets/image/head-icon.jpg");
        background-size: cover;
      }
      .main-nav {
        margin-right: 5%;
        text-align: right;
        float: right;
        .main-nav-item {
          padding: 0 20px;
          &:hover {
            cursor: pointer;
            opacity: .8;
          }
        }
      }
    }
  }
</style>
