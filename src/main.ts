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

Vue.config.productionTip = false

Vue.filter('datum', function (value: any) {
  return moment(value).format('YYYY-MM-DD HH:mm')
})

if (process.env.NODE_ENV === 'production') {
  axiosDefaults.baseURL = 'http://api.studis.tk/v1'
} else if (process.env.PORT === "8100") { // If exposed port via docker image
  axiosDefaults.baseURL = 'http://studis-image/v1'  
} else {
  axiosDefaults.baseURL = 'http://localhost:8080/v1'
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
  console.log(error)
  if (!error.status) {
    localStorage.removeItem('token')
    router.push({name: 'login'})
    return Promise.reject(error)
  }
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


