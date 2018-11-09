import Vue from 'vue'
import Extend from './extend'

const ComConstructor = Vue.extend(Extend)
const instances = []
const queue = []
const spacing = 16
let id = 1
let workState = false

const removeInstance = (instance) => {
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len > 1) {
    const height = instance.vm.height
    for (let i = index; i < len - 1; i++) {
      instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - height - spacing
    }
  }
}
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const doWork = async () => {
  const instance = queue.shift()
  if (instance) {
    workState = true
    instance.vm.visible = false
    await sleep(500)
    doWork()
  } else {
    workState = false
  }
}
export default (options) => {
  const {
    autoClose,
    close,
    closed,
    ...rest
  } = options
  const instance = new ComConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  instance.id = `notification_${id++}`
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.map((item) => {
    verticalOffset += item.$el.offsetHeight + spacing
  })
  verticalOffset += spacing
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('close', () => {
    close && close()
    queue.push(instance)
    if (!workState) {
      doWork()
    }
  })
  instance.vm.$on('closed', () => {
    closed && closed()
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  return instance.vm
}
