import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import global from './plugin'
import '@/style/index.scss'
import '@/utils/rem.js'

Vue.config.productionTip = false
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
