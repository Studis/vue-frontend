<template>
  <div>

    <results 
      title="Seznam predmetov" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      sortByField="course"
      v-on:b-click-id="btnClicked"
      :actions="[{name: 'Open',classColor: 'btn-success'}]"
      >
      <b-dropdown id="ddown1" :text="selectedYear" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateYears(item)" :key="item" v-for="item in allYears">{{item}}</b-dropdown-item>
      </b-dropdown>
      <b-dropdown id="ddown2" :text="selectedStudyYear" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateStudyYear(item)" :key="item" v-for="item in ['Vsi', '1', '2', '3']">{{item}}</b-dropdown-item>
      </b-dropdown>
      </results>
      <br>
      <h3>Generiranje izpitnih rokov</h3>
       <b-dropdown id="ddown2" :text="safrLetnik+''" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateRok(item)" :key="item" v-for="item in ['2016', '2017', '2018']">{{item}}</b-dropdown-item>
      </b-dropdown>
       <b-dropdown id="ddown2" :text="safrProgram+''" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateProgram(item)" :key="item" v-for="item in ['1000468', '1000470']">{{item}}</b-dropdown-item>
      </b-dropdown>
      <b-col sm="12">
        <b-col sm="4">
          Zacetek zimskega izpitnega obdobja
          <b-form-input v-model="zacetekZimskegaObdobja" type="date"/>
          Konec zimskega izpitnega obdobja
          <b-form-input v-model="konecZimskegaObdobja" type="date"/>
        </b-col>
        <b-col sm="4">
          Zacetek poletnega izpitnega obdobja
          <b-form-input v-model="zacetekPoletnegaObdobja" type="date"/>
          Konec poletnega izpitnega obdobja
          <b-form-input v-model="konecPoletnegaObdobja" type="date"/>
        </b-col>
        <b-col sm="4">
          Zacetek jesenskega izpitnega obdobja
          <b-form-input v-model="zacetekJesenskegaObdobja" type="date"/>
          Konec jesenskega izpitnega obdobja
          <b-form-input v-model="konecJesenskegaObdobja" type="date"/>
        </b-col>
      </b-col>
      <b-btn style="margin-top:10px" @click.prevent="generateRoki()">Generiraj roke</b-btn>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'
import axios from 'axios';
import rest from './../../rest.js'
import Results from '../Results.vue'

export default {
  components: {
    'results': Results
  },
  methods: {
    updateRok (item) {
      this.safrLetnik = item
    },
    updateProgram (item) {
      this.safrProgram = item
    },
    generateRoki () {
      axios.post(`exams/scheduled/generate/${this.safrProgram}`,
      {
        year: this.safrLetnik,
        winterStart: this.zacetekZimskegaObdobja,
        winterEnd: this.konecZimskegaObdobja,
        springStart: this.zacetekPoletnegaObdobja,
        springEnd: this.konecPoletnegaObdobja,
        autumnStart: this.zacetekJesenskegaObdobja,
        autumnEnd: this.konecJesenskegaObdobja
      })
      .then((response) => {
        alert('Uspešno :)')
      }).catch(err => {
        alert(JSON.stringify(err))
      })
    },
    btnClicked (el) {
      if (el.actionName=="Open") this.$router.push({name: 'course', params: { id: el.clickedItem.id }})
    },
    updateYears (ele) {
      // alert(JSON.stringify(this.content.content.filter(el => el.year == ele)))
      this.selectedYear = ele
      this.update();
    },
    updateStudyYear(ele){
      this.selectedStudyYear = ele
      this.update();
    },
    update(){
      console.log("update")
      
      this.content = {
        content: this.originalContent
          .filter(el => {
            if(el.module){
              return this.selectedYear == el.module.curriculum.year.toString;
            }
            if(el.curriculum){
              return this.selectedYear == el.curriculum.year.toString
            }
            if(el.curriculums){
              console.log(JSON.stringify(el))
              return this.selectedYear == el.curriculums[0].year.toString
            }
            return false
          })
          .filter(el => {
            if(this.selectedStudyYear == "Vsi") return true;
            if(el.curriculum){
              return el.curriculum.studyYear.id == parseInt(this.selectedStudyYear)
            }
            else if(el.module){
              console.log(el)
              return el.module.curriculum.studyYear.id == parseInt(this.selectedStudyYear)
            }
            else{
              for(var i = 0; i < el.curriculums.length; i++){
                if(el.curriculums[i].studyYear.id == parseInt(this.selectedStudyYear)) return true;
              }
            }
            return false
          })
          .map((x)=>{
            var r = {id: x.id};
            r["Šifra predmeta"] = x.course.id;
            r.predmet = x.course.name;
            r["Število vpisanih"] = x.enrollmentsCount;
            if(x.module){
              r.modul = x.module.name;
              r.Šolsko_leto = x.module.curriculum.year.toString;
            }
            else if(x.curriculum){
              r.Šolsko_leto = x.curriculum.year.toString
            }
            else if(x.curriculums){
              r.Šolsko_leto = x.curriculums[0].year.toString
            }
            return r;
          }),
        fieldNames: null
      }
      console.log(this.content)
    }
  },
  mounted(){
    axios.get(`courses/`)
      .then((response) => {
        this.originalContent = response.data
        
        this.allYears = this.originalContent.map(el => {
          if(el.module){
              return el.module.curriculum.year.toString;
          }
          if(el.curriculum){
            return el.curriculum.year.toString
          }
          if(el.curriculums){
            return el.curriculums[0].year.toString
          }
        }).filter((value,index,self) => self.indexOf(value)===index).filter(el => el != null)
        this.selectedYear = this.allYears[this.allYears.length-1]
        this.updateYears(this.allYears[this.allYears.length-1])
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    // TODO: sorting on Module Name and Year is not working properly
    return {
      zacetekZimskegaObdobja: '2018-01-22',
      konecZimskegaObdobja: '2018-02-16',
      zacetekPoletnegaObdobja: '2018-06-11',
      konecPoletnegaObdobja: '2018-07-06',
      zacetekJesenskegaObdobja: '2018-08-20',
      konecJesenskegaObdobja: '2018-09-14',
      selectedYear: '',
      selectedStudyYear: 'Vsi',
      allYears: [],
      originalContent: {},
      safrLetnik: 2018,
      safrProgram: '1000468',
      content: {
        content: [],
        fieldNames: null
      },
      details:[]
    };
  },
  props:["courseId"]
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
