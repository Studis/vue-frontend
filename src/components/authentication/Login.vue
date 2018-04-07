<template>
  <div class="text-center">
    <b-row>
      <b-col>
        <b-form-text tag="h1" id="logintext">
          Prijava v sistem
        </b-form-text>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="2"></b-col>
      <b-col sm="8">
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="true">
        <b-form-group id="exampleInputGroup1"
          label="Študijska identiteta"
          label-for="exampleInput1">
          <b-form-input id="exampleInput1"
            type="email"
            required
            placeholder="">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup1"
            label="Geslo:"
            label-for="exampleInput3">
          <b-form-input id="exampleInput3"
            type="password"
            required
            >
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group  id="exampleChecks">
            <b-form-checkbox value="me">Prijava brez digitalnega potrdila</b-form-checkbox>
          </b-form-checkbox-group>
          <b-link @click.prevent="forgotPassword">Pozabil sem geslo</b-link>
        </b-form-group>
        <b-button type="submit" variant="primary">Prijava</b-button>
      </b-form>
      </b-col>
      <b-col sm="2"></b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'

@Component({
  components: {
  },
  methods: {
    onSubmit () {
      localStorage.setItem('loggedIn', 'true');
      this.$store.commit('cAuth', true)
      this.$router.push({name: 'home'})
    },
    onReset () {
    },
    forgotPassword () {
      this.$router.push({name: 'forgotPassword'})
    },
  },
})
export default class Login extends Vue {}
</script>

<style lang="scss">
 .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  #logintext {
    padding: 0.3em;
  }
</style>
