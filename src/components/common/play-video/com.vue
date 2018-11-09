<template>
  <transition name="fade" v-if="visible">
    <div class="video-modal-box">
      <div class="video-modal" @click="closePlay"></div>
      <div class="video-content">
        <div class="iframe-box" v-if="this.outLineLink">
          <div v-html="this.outLineLink" style="width:100%;height: 100%;"></div>
        </div>
        <span v-else-if="!this.recordId||playMsg">{{playMsg||'暂无视频'}}</span>
        <div :id="myVideoId" v-else style="width:100%; height:100%;"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 've-play-back',
    data () {
      return {
        playMsg: '',
        visible: false,
        myVideoId: `myVideo_${Math.random()}`
      }
    },
    props: {
      app_id: String, // 应用 ID ,必填
      accountId: '', // 第三方用户唯一标识,必填
      token: String, // token必填
      recordId: String, // 回放视频id
      outLineLink: String // 外链视频
    },
    watch: {
      sdk: {
        handler () {
          this.initPage()
        },
        immediate: true
      }
    },
    methods: {
      closePlay () {
        this.$emit('close')
      },
      initPage () {
        this.$nextTick(() => {
          if (!this.recordId) return
          window.Vhall.ready(() => {
            window.VhallPlayer.init({
              recordId: this.recordId,
              type: 'vod',
              videoNode: this.myVideoId,
              complete: function () {
                window.VhallPlayer.play()
              },
              fail: (msg) => {
                this.playMsg = `${msg}...`
              }
            })
          })
          /* 初始化配置 */
          window.Vhall.config({
            appId: this.app_id, // 应用 ID ,必填
            accountId: this.accountId, // 第三方用户唯一标识,必填
            token: this.token // token必填
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.video-modal-box {
  .video-modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .video-content {
    position: absolute;
    width: 800px;
    height: 450px;
    line-height: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: top;
    background-color: #333333;
    color: #fff;
    text-align: center;
    z-index: 11;
    .iframe-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
