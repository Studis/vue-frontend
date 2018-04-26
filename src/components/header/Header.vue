<template>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#" @click.prevent="goHome">Studis - Študijski informacijski sistem</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!--b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav-->

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <!--b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form-->

      <!--b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown-->
      <b-nav-item-dropdown right v-if="$store.state.role !== 'null'">
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>Uporabnik</em>
        </template>
        <b-dropdown-item href="#" v-if="getRole === 'STUDENT'" @click.prevent="goToProfile">Osebni podatki študenta</b-dropdown-item>
        <b-dropdown-item href="#" v-if="getRole === 'ADMIN' || getRole === 'LECTURER' || getRole === 'CLERK'" @click.prevent="goToStudents">Iskanje študentov</b-dropdown-item>
        <b-dropdown-item href="#" v-if="getRole === 'STUDENT'" @click.prevent="goToEnrollment">Vpisni list</b-dropdown-item>
        <b-dropdown-item href="#" v-if="getRole === 'LECTURER' || getRole === 'CLERK' || getRole === 'ADMIN'" @click.prevent="goToCourses">Predmeti</b-dropdown-item>
        <b-dropdown-item href="#" v-if="getRole === 'ADMIN' || getRole === 'CLERK'" @click.prevent="goToStudentsImport">Uvoz študentov</b-dropdown-item>
        <b-dropdown-item href="#" v-if="getRole === 'ADMIN' || getRole === 'CLERK'" @click.prevent="goToEnrollmentToken">Žetoni za vpis</b-dropdown-item>
        <b-dropdown-item href="#" @click.prevent="signOut">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import rest from './../../rest.js'
import axios from 'axios';

export default {
  name: 'studis-header',
  components: {
  },
  methods: {
    signOut () {
      this.$store.commit('cAuth', rest.setAuthorizationToken())
      this.$store.commit('updateRole', 'null')
      this.isAuthorised = false
      this.$router.push({name: 'login'})
    },
    goToProfile () {
      this.$router.push({name: 'profile'})
    },
    goHome () {
      this.$router.push({name: 'home'})
    },
    goToStudents () {
      this.$router.push({name: 'search-students'})
    },
    goToEnrollment () {
      this.$router.push({name: 'enrollment'})
    },
    goToCourses () {
      this.$router.push({name: 'courses'})
    },
    goToStudentsImport () {
      this.$router.push({name: 'importStudents'})
    },
    goToEnrollmentToken () {
      this.$router.push({name: 'enrollmentToken'})
    },
    setGetAuth () {
      axios.get(`students/me`).then((response) => {
        this.$store.commit('updateRole', response.data.role)
        this.$store.commit('updateUserId', response.data.id)
        return response.data.role
      })
    }
  },
  computed: {
    ...mapGetters([
      'getRole'
    ]),
    ...mapState({
      authChanged: (state) => state.isAuth
    }),
    isAuthorised: {
      get () {
        return this.setGetAuth()
      },
      set (val) {
        if (!val) {
          localStorage.removeItem('token')
        }
        if (val) this.setGetAuth()
      }
    }
  },
  mounted () {
    this.$store.commit('cAuth', localStorage.getItem('token'))
    this.isAuthorised = true
  },
}

</script>
