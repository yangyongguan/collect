<script>
export default {
  props: {
    panels: {
      type: Array,
      required: true
    },
    currentName: [String, Number]
  },
  methods: {
    handleClick (index) {
      this.$parent.change(index)
    }
  },
  render () {
    const tabs = this.panels.map((panel, index) => {
      const tab = panel.$slots.label || <span>{panel.label}</span>
      const classNames = {
        'tab-item': true,
        active: this.currentName === panel.index
      }
      return (
        <li class={classNames} on-click={() => { this.handleClick(panel.index) }}>
          {tab}
        </li>
      )
    })
    return (
      <ul class="tab-header-wrap">
        {tabs}
      </ul>
    )
  }
}
</script>

<style lang="scss" scoped>
.tab-item {
  display: inline-block;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 14px;
  color: #303133;
  cursor: pointer;
  &.active {
    color: #409eff;
  }
}
.slider {
  .tab-header-wrap {
    margin-bottom: -2px;
    position: relative;
    z-index: 1;
  }
  .tab-item.active {
    & > * {
      display: inline-block;
      height: 100%;
      border-bottom: 2px solid #409eff;
    }
  }
  &.left {
    .tab-header-wrap {
      float: left;
      margin-bottom: 0;
    }
    .tab-item {
      display: block;
      text-align: right;
      border-right: 2px solid transparent;
      &.active {
        border-right: 2px solid #409eff;
      }
      & > * {
        display: inline-block;
        border-bottom: 0;
      }
    }
  }
}
.card {
  .tab-header-wrap {
    margin-bottom: -1px;
    position: relative;
    z-index: 1;
  }
  .tab-item {
    &.active {
      border-bottom: 1px solid transparent;
      border-left: 1px solid #e4e7ed;
      border-right: 1px solid #e4e7ed;
      background-color: white;
      &:first-child {
        border-left: 0;
      }
    }
  }
  &.left {
    .tab-header-wrap {
      float: left;
      margin-right: -1px;
      margin-bottom: 0;
    }
    .tab-item {
      display: block;
      border-left: 0;
      &.active {
        border-right: 1px solid transparent;
        border-top: 1px solid #e4e7ed;
        border-bottom: 1px solid #e4e7ed;
        &:first-child {
          border-top: 0;
        }
      }
    }
  }
}
</style>
