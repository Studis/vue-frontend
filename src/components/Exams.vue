<template>
  <div class="">
    <b-alert show>Pozdravljeni v sistemu Studis TPO 7</b-alert>
    <div v-if="anyTokens">
      <br><br>
      <b-alert variant="success" show>Na voljo imate {{token_num}} vpisnih žetonov.</b-alert>
      <h3>Žetoni za vpis</h3>
      <b-table class="my" stacked="md" hover
              :items="enrollmentTokens"
              :fields="fields"
              :filter="filter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc">
              <template slot="signup" slot-scope="data">
                <b-btn size="sm" variant="success" @click="goToEnrollment(data)">Vpiši se</b-btn>
              </template>
      </b-table>
      <br><br>
    </div>
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
      anyTokens: false,
      enrollmentTokens: [],
      sortBy: 'id',
      sortDesc: false,
      filter: null,
      fields: [
        { key: 'program.title', label: 'Študijski program', sortable: true },
        { key: 'studyYear.id', label: 'Letnik', sortable: true },
        { key: 'enrollmentType.name', label: 'Vrsta vpisa', sortable: true },
        { key: 'studyType.name', label: 'Način študija', sortable: true },
        { key: 'studyForm.name', label: 'Oblika študija', sortable: true },
        { key: 'freeChoice', label: 'Prosta izbira predmetov', sortable: true },
        { key: 'signup', label: ''}
      ],
    }
  },
  components: {
    'exam-sign-up': ExamSignUp
  },
  methods: {
    goToEnrollment(data) {
      this.$router.push({name: 'enrollment', params: { id: data.item.id } })
    }
  },
  mounted() {
    axios.get(`students/me`).then((response) => {
      this.userid = response.data.id
      this.role = response.data.role
      if(this.role == "STUDENT") {
        axios.get(`tokens/${this.userid}`).then((response) => {
          for(var x = 0; x < response.data.length; x++) {
            if(response.data[x].status == 'OPEN' || response.data[x].status == 'NEW') {
              if(response.data[x].freeChoice) response.data[x].freeChoice = "Da";
              else response.data[x].freeChoice = "Ne";
              response.data[x].program.title = response.data[x].program.id + " " + response.data[x].program.title;
              response.data[x].enrollmentType.name = response.data[x].enrollmentType.id + " " + response.data[x].enrollmentType.name;
              response.data[x].studyType.name = response.data[x].studyType.id + " " + response.data[x].studyType.name;
              response.data[x].studyForm.name = response.data[x].studyForm.id + " " + response.data[x].studyForm.name;
              this.enrollmentTokens.push(response.data[x])
              this.anyTokens = true
              this.token_num++
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
  .my {
    font-size: 0.85em;
  }
</style>
