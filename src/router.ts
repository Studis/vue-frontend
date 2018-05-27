import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/authentication/Login.vue'
import Exams from './components/Exams.vue'
import ForgotPassword from './components/authentication/ForgotPassword.vue'
import Profile from './components/user/Profile.vue'
import SearchStudent from './components/user/SearchStudent.vue'
import Enrollment from './components/user/Enrollment.vue'
import SetPassword from './components/authentication/SetPassword.vue'
import Course from './components/courses/Course.vue'
import Courses from './components/courses/Courses.vue'
import UploadEnrollment from './components/user/UploadEnrollment.vue'
import EnrollmentTokens from './components/user/EnrollmentTokens.vue'
import EnrollmentToken from './components/user/EnrollmentToken.vue'
import Results from './components/Results.vue';
import EnrollmentConfirmation from './components/EnrollmentConfirmation.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Exams,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/forgot',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/profile/:id',
      name: 'student',
      component: Profile,
      meta: {
        forAuth: true
      },
    },
    {
      path: '/students',
      name: 'search-students',
      component: SearchStudent,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/enrollment/:id',
      name: 'enrollment',
      component: Enrollment,
      meta: {
        forAuth: true
      },
      props: true
    },
    {
      path: '/token/password/set/:token',
      component: SetPassword,
      meta: {
      }
    },
    {
      name: 'course',
      path: '/courses/:id',
      component: Course,
      props: true
    },
    {
      name: 'courses',
      path: '/courses',
      component: Courses
    },
    {
      name: 'results',
      path: '/results',
      component: Results,
    },
    {
      name: 'importStudents',
      path: '/importStudents',
      component: UploadEnrollment
    },
    {
      name: 'enrollmentTokens',
      path: '/enrollmentTokens',
      component: EnrollmentTokens
    },
    {
      name: 'enrollmentToken',
      path: '/enrollmentTokens/:id',
      component: EnrollmentToken,
      props: true
    },
    {
      name: 'enrollmentConfirmation',
      path: '/enrollmentConfirmation/:id',
      component: EnrollmentConfirmation,
      props:true
    },
  ],
  mode: 'history'
})
