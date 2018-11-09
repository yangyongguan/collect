import Com from './com'
import fun from './fun'

export default (Vue) => {
  Vue.component(Com.name, Com)
  Vue.prototype.$playVideo = fun
}

export const PlayVideo = fun
