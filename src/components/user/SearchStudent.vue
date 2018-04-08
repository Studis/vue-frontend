<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <h3>Search students</h3>
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
