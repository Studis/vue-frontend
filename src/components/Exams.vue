<template>
  <div class="">
    <b-alert show>Pozdravljeni v sistemu Studis TPO 7</b-alert>
    <b-alert variant="success" :show="anyTokens">Na voljo imate {{token_num}} vpisnih žetonov. <a href="#">Vpiši se</a></b-alert>
    <exam-sign-up></exam-sign-up>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import ExamSignUp from './exams/ExamSignUp.vue'
import axios from 'axios'
export default {
  name: 'Exams',
  data() {
    return {
      userid: 0,
      token_num: 0,
      tokens: [],
      anyTokens: false
    }
  },
  components: {
    'exam-sign-up': ExamSignUp
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    axios.get(`students/me`).then((response) => {
      this.userid = response.data.id
      this.role = response.data.role
      if(this.role == "STUDENT") {
        axios.get(`tokens/${this.userid}`).then((response) => {
          for(var x = 0; x < response.data.length; x++) {
            if(response.data[x].status == 'OPEN' || response.data[x].status == 'NEW') {
              this.anyTokens = true
              this.token_num++
              this.tokens.push(response.data[x])
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
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
</style>
