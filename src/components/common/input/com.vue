<template>
  <div class="com-input"
       v-if="type!=='textarea'">
    <i v-if="type==='search'"
       class="iconfont icon-search"></i>
    <input :type="inputType"
           :style="style"
           :class="{error:errorMsg}"
           :placeholder="placeholder"
           :disabled="disabled"
           v-model="innerValue"
           :readonly="readonly"
           @focus="focusHandle"
           @blur="blurHandle">
    <i v-if="type==='search'"
       v-show="showDelete"
       class="iconfont icon-delete"
       @click="empty"></i>
    <i v-if="type==='password'||(type==='password'&&inputType==='text')"
       class="iconfont"
       :class="{'icon-guanbi-yanjing':inputType==='password','icon-faxian-yanjing':inputType==='text'}"
       @click="toggleShow"></i>
    <span class="limit"
          v-if="maxLength&&type==='input'">
      <i class="length"
         v-text="innerValue.gbLength()"
         :style="{ color: limitColor }">0</i>/
      <i>{{maxLength}}</i>
    </span>
    <span class="error-msg"
          v-if="errorMsg">{{errorMsg}}</span>
  </div>
  <div class="com-input area"
       v-else>
    <textarea ref="tarea"
              v-model="innerValue"
              :class="{error:errorMsg}"
              :placeholder="placeholder"
              :rows="rows"></textarea>
    <span class="limit area"
          v-if="maxLength&&type==='textarea'">
      <i class="length"
         v-text="innerValue.gbLength()"
         :style="{ color: limitColor }">0</i>/
      <i>{{maxLength}}</i>
    </span>
    <span class="error-msg"
          v-if="errorMsg">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  name: 'ComInput',
  props: {
    placeholder: String,
    value: String,
    type: {
      type: String,
      default: 'input'
    },
    maxLength: Number,
    rows: {
      type: Number,
      default: 2
    },
    autosize: Boolean,
    disabled: String,
    readonly: Boolean,
    errorTips: String
  },
  data () {
    return {
      isMobile: false,
      innerValue: '',
      showDelete: false,
      inputType: '',
      offsetHeight: 0,
      errorMsg: '',
      limitColor: '#555' // 文字字数颜色，0为#555,大于0为#4b5afe
    }
  },
  created () {
    this.inputType = this.getType()
  },
  mounted () {
    if (this.$refs.tarea) {
      this.offsetHeight = this.$refs.tarea.offsetHeight - this.$refs.tarea.clientHeight
    }
    this.innerValue = this.value
    this.inputType = this.getType()
  },
  methods: {
    focusHandle (e) {
      this.showDelete = true
      this.$emit('focus', e)
    },
    blurHandle (e) {
      this.hideDelete()
      this.$emit('blur', e)
    },
    empty () {
      this.innerValue = ''
    },
    toggleShow () {
      if (this.inputType === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    },
    hideDelete () {
      setTimeout(() => {
        this.showDelete = false
      }, 200)
    },
    getType () {
      let type = ''
      switch (this.type) {
        case 'password':
          type = 'password'
          break
        case 'mobile':
          this.isMobile = true
          type = 'text'
          break
        case 'number':
          type = 'number'
          break
        default:
          type = 'text'
          break
      }
      return type
    }
  },
  watch: {
    innerValue (value) {
      if (this.isMobile) {
        this.innerValue = value.replace(/\D/g, '')
        if (this.maxLength && value.length > this.maxLength) {
          this.innerValue = value.substring(0, this.maxLength)
        }
      } else if (this.maxLength && value.gbLength() > this.maxLength) {
        this.innerValue = value.substring(0, value.gbIndex(this.maxLength) + 1)
      }
      if (this.type === 'textarea' && this.autosize) {
        this.$refs.tarea.style.height = 'auto'
        this.$refs.tarea.style.height = `${this.$refs.tarea.scrollHeight + this.offsetHeight}px`
      }
      if (value.gbLength() === 0) {
        this.limitColor = '#555'
      } else {
        this.limitColor = '#4b5afe'
      }
      this.$emit('update:value', this.innerValue)
      this.$emit('input', this.innerValue)
    },
    value: {
      handler (value) {
        this.innerValue = value
        this.$emit('change')
      },
      immediate: true
    },
    type: {
      handler (value) {
        this.inputType = this.getType()
      },
      immediate: true
    },
    errorTips: {
      handler (value) {
        this.errorMsg = value
      },
      immediate: true
    }
  },
  computed: {
    style () {
      const ret = {}

      if (this.type === 'search') {
        ret.paddingLeft = '36px'
        ret.paddingRight = '30px'
      } else if (this.maxLength) {
        ret.paddingRight = '45px'
      } else if (this.type === 'password') {
        ret.paddingRight = '30px'
      }
      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
.com-input /deep/ {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  .error-msg {
    display: block;
    position: absolute;
    color: #fc5659;
    padding-left: 10px;
    font-size: 14px;
  }
  input {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 0 10px;
    &.error {
      border-color: #fc5659;
    }
    &:hover {
      border-color: #4b5afe;
    }
    /*&:focus {*/
    /*box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);*/
    /*}*/
    &::-moz-placeholder {
      color: #bfbfbf;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #bfbfbf;
    }
    &::-webkit-input-placeholder {
      color: #bfbfbf;
    }
    &[disabled] {
      cursor: not-allowed;
    }
  }
  .limit {
    font-size: 14px;
    color: #555555;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    .length {
      color: #4b5afe;
    }
    &.area {
      transform: none;
      top: auto;
      bottom: 10px;
    }
  }
  .icon-search {
    color: #555555;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
  }
  .icon-right-center {
    color: #555555;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    cursor: pointer;
  }
  .icon-delete {
    @extend .icon-right-center;
  }
  .icon-guanbi-yanjing {
    @extend .icon-right-center;
  }
  .icon-faxian-yanjing {
    @extend .icon-right-center;
  }

  textarea {
    display: inline-block;
    padding: 4px 11px;
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    font-size: inherit;
    &.error {
      border-color: #fc5659;
    }
    &:hover {
      border-color: #4b5afe;
    }
    &::-moz-placeholder {
      color: #bfbfbf;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #bfbfbf;
    }
    &::-webkit-input-placeholder {
      color: #bfbfbf;
    }
    &[disabled] {
      cursor: not-allowed;
    }
  }
}
</style>
