import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/authentication/Login.vue';
import Exams from './components/Exams.vue';
import ForgotPassword from './components/authentication/ForgotPassword.vue';
import Profile from './components/user/Profile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Exams,
    },
    {
      path: '/forgot',
      name: 'forgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    }
  ],
  mode: 'history'
});
