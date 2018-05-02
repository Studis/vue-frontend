<template>
  <div>
    <results 
      title="Courses" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      v-model="content"></results>
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
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    // TODO: sorting on Module Name and Year is not working properly
    return {
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
