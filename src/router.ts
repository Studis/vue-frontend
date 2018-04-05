import Vue from 'vue';
import Router from 'vue-router';
import WelcomePage from './views/WelcomePage.vue';
import About from './views/About.vue';
import Home from './views/Home.vue';
import ForgotPassword from './components/authentication/ForgotPassword.vue';
import Profile from './components/user/Profile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
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
