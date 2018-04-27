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
import EnrollmentToken from './components/user/EnrollmentToken.vue'
Vue.use(Router)

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
      path: '/students',
      name: 'search-students',
      component: SearchStudent,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/enrollment',
      name: 'enrollment',
      component: Enrollment,
      meta: {
        forAuth: true
      }
    },
    {
      path: '/token/password/set/:token',
      component: SetPassword,
      meta: {
      }
    },
    {
      name: 'course',
      path: '/courses/:courseId',
      component: Course,
      props: true
    },
    {
      name: 'courses',
      path: '/courses',
      component: Courses
    },
    {
      name: 'importStudents',
      path: '/importStudents',
      component: UploadEnrollment
    },
    {
      name: 'enrollmentToken',
      path: '/enrollmentToken',
      component: EnrollmentToken
    }

  ],
  mode: 'history'
})
