import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/authentication/Login.vue';
import Exams from './components/Exams.vue';
import ForgotPassword from './components/authentication/ForgotPassword.vue';
import Profile from './components/user/Profile.vue';
import SearchStudent from './components/user/SearchStudent.vue';
import Enrollment from './components/user/Enrollment.vue';

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
    },
    {
      path: '/students',
      name: 'search-students',
      component: SearchStudent,
    },
    {
      path: '/enrollment',
      name: 'enrollment',
      component: Enrollment,
    },
  ],
  mode: 'history',
});
