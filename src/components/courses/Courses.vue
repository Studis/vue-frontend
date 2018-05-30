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
      selectedYear: '',
      selectedStudyYear: 'Vsi',
      allYears: [],
      originalContent: {},
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

</style>
