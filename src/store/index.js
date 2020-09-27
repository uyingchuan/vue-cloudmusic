import Vue from 'vue'
import Vuex from 'vuex'
import musicModule from './modules/music'
import globalModule from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music: musicModule,
    global: globalModule
  }
})
