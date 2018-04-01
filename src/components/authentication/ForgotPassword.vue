<template>
  <div class="text-center">
    <b-row>
      <b-col>
        <b-form-text tag="h1" id="logintext">
          Pošlji mi pozabljeno geslo
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
      </b-form>
      
      </b-col>
      <b-col sm="2"></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click.prevent="goBack" class="forgotBtn">Nazaj</b-button>
        <b-button type="submit" variant="primary" class="pull-right">Pošlji</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'forgotPassword',
  components: {
  },
  methods: {
    onSubmit () {
    this.$router.push({name: 'welcome'})
    },
    goBack () {
      this.$router.push({name: 'welcome'})
    },
    onReset () {
    }
  }
})
export default class ForgotPassword extends Vue {}
</script>

<style lang="scss">
  #logintext {
    padding: 0.3em;
  }
  .forgotBtn {
    margin-right: 36em;
  }
</style>
