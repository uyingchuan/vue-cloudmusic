import Vue from 'vue'
import Vuex from 'vuex'
import musicModule from './modules/music'
import globalModule from './modules/global'
import userModule from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music: musicModule,
    global: globalModule,
    user: userModule
  }
})
