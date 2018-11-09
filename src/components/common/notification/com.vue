<template>
  <transition name="fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
    class="com-notification"
    :style="style"
    v-show="visible"
    @mouseenter="clearTask"
    @mouseleave="createTask"
    >
      <div class="header">
        <span class="title" v-if="!this.$slots.header&&header">{{header}}</span>
        <slot name="header"></slot>
        <i @click.prevent="handleClose" class="iconfont icon-close"></i>
      </div>
      <div class="content">
        <span v-if="!this.$slots.default" >{{content}}</span>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ComNotification',
  props: {
    header: String,
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: true
    }
  },
  created () {

  },
  methods: {
    handleClose (e) {
      this.$emit('close')
    },
    afterEnter () {},
    afterLeave () {
      this.$emit('closed')
    },
    createTask () {},
    clearTask () {}
  },
  computed: {
    style () {
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.com-notification /deep/ {
  display: inline-block;
  position: relative;
  line-height: 1.5;
  background: #fff;
  padding: 16px 20px;
  border-radius: 4px;
  width: 380px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  z-index: 3000;
  .header {
    color: rgba(0, 0, 0, 0.85);
    .title {
      display: inline-block;
      margin-bottom: 8px;
    }
    .icon-close {
      position: absolute;
      cursor: pointer;
      top: 14px;
      right: 20px;
    }
  }
  .content {
    color: rgba(0, 0, 0, 0.65);
    padding: 0;
    font-size: 14px;
  }
}
</style>
