<template>
  <div class="text-center login-form botMarg">
        <div class="card text-center login-form">

    <b-row class="padding-context">
      <b-col>
        <b-form-text tag="h1" id="logintext">
          Pozabljeno geslo
        </b-form-text>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col sm="8">
        <b-form @reset.prevent="onReset" v-if="true">
          <b-form-group id="exampleInputGroup1"
            label="Študijska identiteta"
            label-for="exampleInput1">
            <b-form-input id="exampleInput1"
              type="email"
              v-model="email"
              required
              placeholder="">
            </b-form-input>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col sm="2"></b-col>
    </b-row>
    <b-row>
      <b-col sm="2"></b-col>
      <b-col sm="8">
        <b-button @click.prevent="goBack" class="backBtn">Nazaj</b-button>
        <b-button type="submit" variant="primary" class="forgotBtn" @click.prevent="onSubmit">Pošlji</b-button>
        <br><br><br><br>
       <b-alert show dismissible v-if="showed">
         Mail was sent </b>
        </b-alert>
      </b-col>
      <b-col sm="2"></b-col>
       
    </b-row>
    </div>
   
   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
declare module 'vue/types/vue' {

  interface Vue {
    email: string
    showed: boolean
  }
}
@Component({
  name: 'forgotPassword',
  components: {
  },
  methods: {
    onSubmit () {
      axios.put('management/password', this.email, 
        {headers: {'Content-Type': 'text/plain'}}).then((data) => {
        console.log(data)
        this.showed = true
      }).catch(e => {
        console.log(e)
      })
    // this.$router.push({name: 'login'})
    },
    goBack () {
      this.$router.push({name: 'login'})
    },
    onReset () {
    }
  }
})
export default class ForgotPassword extends Vue {
  email: string = ''
  showed: boolean = false
}
</script>

<style lang="scss">
  #logintext {
    padding: 0.3em;
  }
  .backBtn {
    position: absolute;
    left: 0;
    box-sizing: border-box;
    margin: 1em;
  }
  .forgotBtn {
    margin: 1em;
    position: absolute;
    right: 0;
    box-sizing: border-box;
  }
</style>
