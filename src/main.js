import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate';


Vue.use(Vuelidate);
//import Axios from 'axios'

//Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
//  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  Vuelidate,
  router,
  store,
  render: h => h(App)
}).$mount('#app')