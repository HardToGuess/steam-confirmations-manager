import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.min.js'
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'

Vue.use(VModal)

window.jQuery = require('jquery')
window.$ = require('jquery')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')

/*
materialize-css steam-totp steamcommunity steam-user steam-tradeoffers
*/
