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

      <b-nav-item-dropdown right v-if="isAuthorised">
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#" @click.prevent="goToProfile">Edit Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click.prevent="goToStudents">Search students</b-dropdown-item>
        <b-dropdown-item href="#" @click.prevent="signOut">Signout</b-dropdown-item>
        <b-dropdown-item><router-link :to="{ name: 'enrollment'}">Enrollment</router-link></b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>


<script>

import { mapState } from 'vuex';

export default {
  name: 'studis-header',
  components: {
  },
  methods: {
    signOut () {
      this.$router.push({name: 'login'})
      this.$store.commit('cAuth', false)
      this.isAuthorised = false
    },
    goToProfile () {
      this.$router.push({name: 'profile'})
    },
    goHome () {
      this.$router.push({name: 'home'})
    },
    goToStudents () {
      this.$router.push({name: 'search-students'})
    }
  },
  computed: {
    ...mapState({
      authChanged: (state) => state.isAuth
    }),
    isAuthorised: {
      get () {
        return this.$store.state.isAuth || localStorage.getItem('loggedIn') === 'true'
      },
      set (val) {
        localStorage.setItem('loggedIn', val)
      }
    }
  },
  created () {
  },
}

</script>
