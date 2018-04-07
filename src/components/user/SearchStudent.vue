<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <h3>Spremeni kontaktne podatke</h3>
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="email"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Mobile phone:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Station phone:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
        
      </b-form-group>
    
      <h3>Naslov za dostavo pošte</h3>
      <b-form-group id="exampleInputGroup2"
                    label="Država:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Ulica:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Pošta:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Občina:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      required>
        </b-form-input>
        
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="saveProfile">Shrani</b-button>
      <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  methods: {
    onSubmit () {
    this.$router.push({name: 'login'})
    },
    goBack () {
      this.$router.push({name: 'login'})
    },
    onReset () {
    },
    goHome () {
      this.$router.push({name: 'home'})
    },
    saveProfile () {
      this.$snotify.async('Saved', 'saved', () => new Promise((resolve, reject) =>
        resolve({
          config: {
            closeOnClick: true,
            timeout: 2000
          }
        })
      ));
    },
  },
})
export default class SearchStudent extends Vue {}
</script>

<style lang="scss">
</style>
