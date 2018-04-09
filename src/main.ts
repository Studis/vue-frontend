import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import Snotify from 'vue-snotify';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(Snotify);

Vue.config.productionTip = false;

router.beforeEach(
  (to:any, from:any, next:any) => {
    if (to.matched.some((record:any) => record.meta.forVisitors)) {
      if (isAuthenticated()) {
        next({name: 'home'})
      } else {
        next()
      }
    } else if (to.matched.some((record:any) => record.meta.forAuth)) {
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

function isAuthenticated ():boolean {
  return localStorage.getItem('loggedIn') === 'true' && store.getters.getRole !== 'none'
}


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
