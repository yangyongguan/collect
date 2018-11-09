import Vue from 'vue'
import Vuex from 'vuex'
import appModules from './modules/app'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: isDev,
  modules: {
    app: appModules
  }
})

export default store
