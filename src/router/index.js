import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
const router = new Router({
  base: '/web/',
  routes
  // , mode: 'history'
})

export default router
