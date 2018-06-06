<template>
  <div>
    <results 
      title="Seznam vpisanih v letnik" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      sortByField="course"
      v-on:b-click-id="btnClicked"
      :landscape="true"
      >
      <b-dropdown id="ddown1" :text="selectedYear+'/'+(parseInt(selectedYear)+1)" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateYears(item)" :key="item" v-for="item in allYears">{{item}}/{{item+1}}</b-dropdown-item>
      </b-dropdown>
      <b-dropdown id="ddown2" :text="selectedStudyYear" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateStudyYear(item)" :key="item" v-for="item in ['1', '2', '3']">{{item}}</b-dropdown-item>
      </b-dropdown>
      </results>
      <br>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'
import axios from 'axios';
import rest from './../../rest.js'
import Results from '../Results.vue'
import ListOfEnrolled from './ListOfEnrolled.vue'

export default {
  components: {
    'results': Results
  },
  methods: {
    btnClicked (el) {
      if (el.actionName=="Odpri") this.$router.push({name: 'course', params: { id: el.clickedItem.id }})
    },
    updateYears (ele) {
      // alert(JSON.stringify(this.content.content.filter(el => el.year == ele)))
      this.selectedYear = ele
      this.fetch(ele, this.selectedStudyYear)
    },
    updateStudyYear(ele){
      this.selectedStudyYear = ele
      // this.fetch(2017, 1)
      this.fetch(this.selectedYear,ele)
    },
    fetch (year, studyYear) {
      axios.get(`enrollments/list/${year}/${studyYear}`)
      .then((response) => {
        this.content.content = response.data.map((x) => {
          return {
            Vpisna_Številka: x.token.student.enrollmentNumber,
            Ime:x.token.student.name,
            Priimek: x.token.student.surname,
            Naslov_Stalnega_Bivalisca: x.token.student.permanent.placeOfResidence,
            Naslov_Zacasnega_Bivalisca: x.token.student.temporary.placeOfResidence,
            Telefon: x.token.student.phoneNumber,
            Elektronska_Posta: x.token.student.universityEmail
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.fetch(2017, 1)
  },
  data() {
    // TODO: sorting on Module Name and Year is not working properly
    return {
      selectedYear: '2017',
      selectedStudyYear: '1',
      allYears: [2016, 2017, 2018],
      originalContent: {},
      content: {
        content: [],
        fieldNames: null
      },
      details:[]
    };
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
