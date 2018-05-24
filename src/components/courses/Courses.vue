<template>
  <div>

    <results 
      title="Courses" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      v-on:b-click-id="btnClicked"
      :actions="[{name: 'Open',classColor: 'btn-success'}]"
      >
      <b-dropdown id="ddown1" :text="selectedYear" class="m-md-2" >
        <b-dropdown-item @click.prevent="updateYears(item)" :key="item" v-for="item in allYears">{{item}}</b-dropdown-item>
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
      this.content = {
        content: this.originalContent.content.filter(el => el.year == ele)
      }
      this.selectedYear = ele
    }
  },
  mounted(){
    axios.get(`courses/`)
      .then((response) => {
        var tableData = response.data.map((x)=>{
            var r = {id: x.id};
            r["Course number"] = x.course.id;
            r.course = x.course.name;
            r["Enrollments"] = x.enrollmentsCount;
            if(x.module){
              r.module = x.module.name;
              r.year = x.module.curriculum.year.toString;
            }
            if(x.curriculum){
              r.year = x.curriculum.year.toString
            }
            return r;
          });
        this.content = {
          content: tableData,
          fieldNames: null
        };
        this.originalContent = this.content
        this.allYears = this.content.content.map(e => e.year).filter((value,index,self) => self.indexOf(value)===index).filter(el => el != null)
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
