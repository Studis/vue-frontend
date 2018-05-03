<template>
  <div>

    <results 
      title="Courses" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      >
      <b-dropdown id="ddown1" text="Študijsko leto" class="m-md-2" >
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
    updateYears (ele) {
      // alert(JSON.stringify(this.content.content.filter(el => el.year == ele)))
      this.content = {
        content: this.originalContent.content.filter(el => el.year == ele)
      }
    }
  },
  mounted(){
    axios.get(`courses/`)
      .then((response) => {
        var tableData = response.data.map((x)=>{
            var r = {course: x.course.name, id: x.id};
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
        this.updateYears(this.allYears[this.allYears.length-1])
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    // TODO: sorting on Module Name and Year is not working properly
    return {
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
