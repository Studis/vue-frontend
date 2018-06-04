<template>

  <div class="text-center login-form botMarg">
    <!-- <div>
      <img src="https://petra-education.eu/wp-content/uploads/sites/29/2016/07/111.png" class="img-thumbnail smaller-login">
    </div> -->
    <div class="card text-center login-form">

    <b-row class="padding-context">
      <b-col>
        <b-form-text tag="h1" id="logintext">
          Prijava v sistem
        </b-form-text>
      </b-col>
    </b-row>
    <b-row class="padding-context">
      <b-col sm="2"></b-col>
      <b-col sm="8">
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="true">
        <b-form-group id="exampleInputGroup1"
          label="Študijska identiteta"
          label-for="exampleInput1">
          <b-form-input id="exampleInput1"
            type="text"
            required
            v-model="username"
            placeholder="">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup1"
            label="Geslo:"
            label-for="exampleInput3">
          <b-form-input id="exampleInput3"
            type="password"
            v-model="password"
            required
            >
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleGroup4">
          <b-link @click.prevent="forgotPassword">Pozabil sem geslo</b-link>
        </b-form-group>
        <b-alert show dismissible v-if="wrong">
          Napačni prijavni podatki
        </b-alert>
        <b-alert show dismissible v-if="locked">
          You ip address is locked!
        </b-alert>
        <b-button type="submit" variant="primary">Prijava</b-button>
      </b-form>
      </b-col>
      <b-col sm="2"></b-col>
    </b-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'
import axios from 'axios';
// @ts-ignore
import rest from './../../rest.js'
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    username: string
    password: string
    setGetAuth: any
    locked: boolean
    wrong: boolean
  }
}

@Component({
  components: {
  },
  methods: {
    onSubmit () {
      this.$store.commit('cAuth', rest.setAuthorizationToken({
        username: this.username,
        password: this.password
      }))
      axios.get('students/me').then((d) => {
        if (!d) {
          localStorage.removeItem('token')
//           this.$router.push({ name: 'login' })
          this.wrong = true
          setTimeout(() => {
            this.wrong = false
          }, 2000);
        }
        this.$router.push({name: 'home'})
        this.setGetAuth()
        this.$store.commit('cAuth', localStorage.getItem('token'))
      }).catch(err => {
        console.log(err)
        if (err == 'Error: Request failed with status code 406') {
          this.locked = true
          setTimeout(() => {
            this.locked = false
          }, 24*1000);
        } else {
          this.wrong = true
          setTimeout(() => {
            this.wrong = false
          }, 2000);
        }
        localStorage.removeItem('token')
      })
    },
    setGetAuth () {
      axios.get(`students/me`).then((response) => {
        if (response) {
          this.$store.commit('updateRole', response.data.role)
          this.$store.commit('updateUserId', response.data.id)
          this.$store.commit('updateFullName', response.data.fullName)
          return response.data.role
        }
      }).catch(e => {
        if (e.status) alert(e.status)
      })
    },
    onReset () {
    },
    forgotPassword () {
      this.$router.push({name: 'forgotPassword'})
    },
  },
})
export default class Login extends Vue {
  username: string = ''
  password: string = ''
  locked: boolean = false
  wrong: boolean = false
}
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
  .login-form {
    margin-top: 10em;
  }
  .smaller-login {
    width: 50%;
  }
  .padding-context {
    padding: 1em;
  }
  .botMarg {
    margin-bottom: 3em;
  }
</style>
