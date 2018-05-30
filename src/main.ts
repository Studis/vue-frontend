import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
let axiosDefaults = require('axios/lib/defaults')
import moment from 'moment'

// @ts-ignore
import rest from './rest'

Vue.use(BootstrapVue)
Vue.use(Snotify)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.filter('datum', function (value: any) {
  return moment(value).format('DD-MM-YYYY HH:mm')
})

if (process.env.VUE_APP_API_URL) {
  axiosDefaults.baseURL = `http://${process.env.VUE_APP_API_URL}/v1`
} else if (process.env.NODE_ENV === 'production') { // If exposed port via docker image
  axiosDefaults.baseURL = 'http://api.studis.tk/v1'
} else {
  axiosDefaults.baseURL = 'http://localhost:8080/v1'//'http://api.studis.tk/v1'
}

router.beforeEach(
  (to: any, from: any, next: any) => {

    axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('token')}`

    if (to.matched.some((record: any) => record.meta.forVisitors)) {
      if (isAuthenticated()) {
        next({name: 'home'})
      } else {
        next()
      }
    } else if (to.matched.some((record: any) => record.meta.forAuth)) {
      if (isAuthenticated()) {
        next()
      } else {
        next({name: 'login'})
      }
    } else {
      next()
    }
  }
)

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {

// if (process.env.NODE_ENV === 'development') { // If exposed port via docker image

  if (!error.response) {
    localStorage.removeItem('token')
    router.push({name: 'login'})
    return Promise.reject(error)
  }
// }
})


function isAuthenticated (): boolean {
  return localStorage.getItem('token') !== null
}

new Vue({
  // @ts-ignore
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')


