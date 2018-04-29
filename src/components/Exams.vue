<template>
  <div class="">
    <b-alert show>Pozdravljeni v sistemu Studis TPO 7</b-alert>
    <exam-sign-up></exam-sign-up>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExamSignUp from './exams/ExamSignUp.vue'
@Component({
  components: {
    'exam-sign-up': ExamSignUp
  },
  methods: {
  },
})
export default class Exams extends Vue {}
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
