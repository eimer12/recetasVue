import Vue from 'vue'
import App from './App.vue'
import store from './store'
import LazyYoutube from "vue-lazytube";

Vue.use(LazyYoutube);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
