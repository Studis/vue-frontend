<template>
  <div>
       <b-row>
      <b-col sm="2"></b-col>
      <b-col sm="8">
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="true">
        <b-form-group id="exampleInputGroup1"
          label="Novo geslo geslo"
          label-for="exampleInput1">
          <b-form-input id="exampleInput1"
            type="password"
            required
            v-model="password"
            placeholder="">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Nastavi</b-button>
      </b-form>
      </b-col>
      <b-col sm="2"></b-col>
    </b-row>
    <div v-if="!validToken" class="help-block text-center">
      {{statusMsg}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    email: string
    token: string
  }
}
@Component({
  name: 'forgotPassword',
  components: {
  },
  methods: {
    onSubmit () {
      axios.put(`management/password/${this.$route.params.token}`, this.password, 
        {headers: {"Content-Type": "text/plain"}}).then((data) => {
        console.log(data)
      }).catch(e => {
        console.log(e)
      })
    this.$router.push({name: 'login'})
    },
    goBack () {
      this.$router.push({name: 'login'})
    },
    onReset () {
    }
  }
})
export default class ForgotPassword extends Vue {
  password: string = ''
}
</script>
