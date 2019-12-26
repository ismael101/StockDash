import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import quotes from '../services/quote'
import series from '../services/series'
import technical from '../services/technical'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$quotes = quotes
Vue.prototype.$series = series
Vue.prototype.$technical = technical

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
