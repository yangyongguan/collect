import Vue from 'vue'
import Com from './com.vue'

const ComConstructor = Vue.extend(Com)
export default (options) => {
  const {
    close,
    ...rest
  } = options
  const instance = new ComConstructor({
    propsData: {
      shareLink: { ...rest
      }
    }
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.vm.$on('close', (event) => {
    if (close) close(event)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  return instance.vm
}
