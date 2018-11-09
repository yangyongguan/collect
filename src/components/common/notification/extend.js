import Com from './com.vue'

export default {
  extends: Com,
  props: {
    position: {
      type: String,
      default: 'top-center'
    }
  },
  data () {
    return {
      verticalOffset: 0,
      height: 0,
      width: 0,
      halfWidth: 0,
      visible: false,
      autoClose: 3000,
      timerId: 0
    }
  },
  mounted () {
    this.createTask()
    // 加延迟处理fade动画导致的无法获取宽度,没法计算居中
    setTimeout(() => {
      this.width = this.$el.offsetWidth
      this.halfWidth = this.$el.offsetWidth / 2
      this.height = this.$el.offsetHeight
    }, 50)
  },
  beforeDestory () {
    this.clearTask()
  },
  methods: {
    createTask () {
      if (!this.autoClose) return
      this.timerId = setTimeout(() => {
        this.$emit('close')
        // this.visible = false
      }, this.autoClose)
    },
    clearTask () {
      if (!this.timerId) return
      clearTimeout(this.timerId)
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  computed: {
    style () {
      const ret = {
        position: 'fixed'
      }
      switch (this.position) {
        case 'top-center':
          ret.left = '50%'
          ret.marginLeft = `-${this.halfWidth}px`
          ret.top = `${this.verticalOffset}px`
          break
        case 'bottom-center':
          ret.left = '50%'
          ret.marginLeft = `-${this.halfWidth}px`
          ret.bottom = `${this.verticalOffset}px`
          break
        case 'right-bottom':
          ret.right = '20px'
          ret.bottom = `${this.verticalOffset}px`
          break
        case 'right-top':
          ret.right = '20px'
          ret.top = `${this.verticalOffset}px`
          break
        case 'center':
          ret.left = '50%'
          ret.top = '50%'
          ret.marginLeft = `-${this.halfWidth}px`
          ret.marginTop = `-${this.height + this.verticalOffset}px`
          break
        case 'left-bottom':
          ret.left = '20px'
          ret.bottom = `${this.verticalOffset}px`
          break
        case 'left-top':
          ret.left = '20px'
          ret.top = `${this.verticalOffset}px`
          break
        default:
          break
      }
      return ret
    }
  }

}
