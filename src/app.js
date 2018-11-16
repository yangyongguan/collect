import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import './utils/extend'
import 'assets/css/index.scss'
import 'assets/fonts/iconfont.scss'

import Ajax from './utils/ajax'
import Notification from './components/common/notification'
import Input from './components/common/input'
import Marquee from './components/common/marquee'
import MessageBox from './components/common/message-box'
import Share from './components/common/share'
import Upload from './components/common/upload'
import Loading from './components/common/loading'
import Dialog from './components/common/dialog'
import Button from './components/common/button'
import Tabs from './components/common/tabs'

Vue.use(Ajax)
Vue.use(Notification)
Vue.use(Input)
Vue.use(Marquee)
Vue.use(MessageBox)
Vue.use(Share)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Tabs)

Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.filter('isEmpty', function (value, replaceStr) {
  replaceStr = replaceStr || '-'
  return value || replaceStr
})

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})

window.callbackResize = null
let timeout = null
window.onresize = function callbackResizeFn () {
  if (timeout) return
  if (window.callbackResize) {
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      timeout = null
      window.callbackResize()
    }, 500)
  }
}
