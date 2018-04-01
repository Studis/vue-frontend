<template>
  <div id="app">
    <studis-header></studis-header>
    <b-container class="main-content">
      <router-view></router-view>
    </b-container>
</div>
<!--
   <div id="app">
     <div id="nav">
       <b-navbar toggleable="md" type="dark" variant="info">
         <b-navbar-brand href="#">Studis - Študijski informacijski sistem</b-navbar-brand>
       </b-navbar>
      <b-container class="main-content">
        <router-view></router-view>
      </b-container>
     </div>
    </div>
  -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/header/Header.vue'
@Component({
  components: {
    'studis-header': Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-content {
  padding: 30px;
}
</style>
