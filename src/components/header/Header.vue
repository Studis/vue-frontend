<template>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Studis - Študijski informacijski sistem</b-navbar-brand>

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
        <b-dropdown-item href="#" @click.prevent="signOut">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  name: 'studis-header',
  components: {
  },
  methods: {
    signOut () {
      this.$router.push({name: 'welcome'})
      this.$store.commit('cAuth', false)
    },
    goToProfile () {
      this.$router.push({name: 'profile'})
    }
  },
  computed: {
    ...mapState({
      isAuthorised: (state: any) => state.isAuth
    })
  },
  created () {
  }
})
export default class Header extends Vue {}
</script>
