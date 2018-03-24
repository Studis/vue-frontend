<template>
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
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  // padding: 30px;
}
.main-content {
  padding: 30px;
}
</style>
