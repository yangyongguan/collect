<template>
  <div v-show="visible" class="com-notification" :style="style">
    <div class="inner-wrap">
      <i class="iconfont icon-Loading"></i>
      <span class="loading-txt">{{loadingText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComLoading',
  props: {
    loadingText: {
      type: String,
      default: 'Loading'
    },
    relative: Boolean
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      const ret = {}
      if (this.relative) {
        ret.position = 'absolute'
      }
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
.com-notification /deep/ {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .inner-wrap {
    color: #409eff;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 14px;
    opacity: 0.9;
    .iconfont {
      display: inline-block;
      animation: com-rotating 1s linear infinite;
    }
    .loading-txt {
      margin-top: 3px;
      display: block;
    }
  }

  @keyframes com-rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
