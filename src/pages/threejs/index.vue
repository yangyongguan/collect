<template>
  <el-container class="container">
    <el-aside class="left-container"
              :class="{close:close}">
      <com-menu :close.sync="close"></com-menu>
    </el-aside>
    <el-container class="main-box">
      <div class="top-notice"
           v-show="msg">
        <div class="notice-box clearfix">
          <div class="fl notice-icon">
            <i class="iconfont icon-youcegonggao_icon"></i>
          </div>
          <div class="text-box fl">
            <span class="notice-con">{{msg}}</span>
          </div>
        </div>
        <i class="el-icon-close"></i>
      </div>
      <section class="main-container"
               :class="{close:close}">
        <transition>
          <router-view class="app-view"></router-view>
        </transition>
      </section>
    </el-container>
  </el-container>
</template>

<script>
  import menu from '../common/yyg-menu'

  export default {
    data () {
      return {
        name: '',
        timer: '',
        msg: '',
        update: false,
        tipInfo: {},
        tipType: null,
        close: false,
        isShow: false // 头像下拉是否显示
      }
    },
    created: function () {
      let body = document.querySelector('body')
      body.addEventListener('click', (e) => {
        if (e.target.id === 'toggler-div' || e.target.id === 'toggler-img' || e.target.id === 'toggler-span' || e.target.id === 'preventClick') {
          this.isShow = true
        } else {
          this.isShow = false
        }
      }, false)
    },
    components: {
      'com-menu': menu
    },
    methods: {
      changeState () {
        this.isShow = !this.isShow
      }
    }
  }
</script>


<style scoped lang="scss">
  .main-box {
    background-color: #f5f5f5;
  }
  .container {
    height: 100%;
    min-width: 1000px;
  }
  .left-container {
    width: 220px !important;
    &.close {
      width: 85px !important;
      transition: width 0.5s;
    }
    overflow: visible;
    height: 100%;
    color: #f5f5f5;
    background-color: #212221;
  }
  .header-container {
    height: 70px;
    padding-top: 20px;
    text-align: right;
    position: relative;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e2e2;
    span {
      cursor: pointer;
    }
  }
  .main-container /deep/ {
    padding: 0;
    position: absolute;
    left: 220px;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    min-width: 1160px;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }
  }
  .main-container.close {
    left: 85px;
  }
  .top-notice {
    width: 100%;
    height: 51px;
    background: #fcece1;
    color: #444;
    font-size: 14px;
    line-height: 51px;
    position: relative;
    top: 0;
    left: 0;
    border-top: 1px solid #ff9f5b;
    border-bottom: 1px solid #ff9f5b;
    opacity: 0;
    transition: 1s ease-in-out;
    z-index: 99;
    padding: 0 50px 0 50px;
    margin-bottom: 51px;
    &.show {
      opacity: 1;
    }
    &.out {
      opacity: 0;
    }
    .notice-box {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .notice-icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      text-align: center;
      line-height: 22px;
      margin: 13px 10px 0 0;
      background: #eb7e4d;
      i {
        font-size: 12px;
        color: #fff8f5;
      }
    }
    .text-box {
      overflow: hidden;
      width: auto;
      height: 51px;
      span {
        display: inline-block;
        white-space: nowrap;
      }
    }
    .el-icon-close {
      font-size: 20px;
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;
      color: #ff9f5b;
      &:hover {
        color: #e58039;
      }
    }
  }
  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
  .url,
  .bg {
    width: 540px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    box-shadow: 0 6px 12px 0 rgba(17, 28, 22, 0.5);
    cursor: pointer;
  }
  .bg {
    text-align: center;
    cursor: default;
    img {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    p {
      color: #444;
      font-size: 20px;
      position: relative;
      margin: 220px 0 10px;
    }
    .text {
      color: #444;
      font-size: 14px;
      position: relative;
    }
    .go-btn {
      width: 150px;
      height: 35px;
      border-radius: 100px;
      background-color: #52cc90;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 35px;
      position: relative;
      margin: 20px auto 0;
      cursor: pointer;
    }
  }
  .icon-guanbi {
    font-size: 18px;
    position: absolute;
    right: 20px;
    top: 10px;
    color: #fff;
    z-index: 10;
    cursor: pointer;
  }
</style>
