<template>
  <div>
    <results 
      title="Courses" 
      :indexes="false"
      :content="content"
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
    this.content = {
      content: [
        { name: "a" },
        { name: "Domen" },
        { name: "Jaka", surname: "Kordez" },
        { name: "RobiČŠŽčšž" }
      ],
      fieldNames: null,
      details: [{ title: "Year", value: "201/18" }, {title: "Lecturer", value: "Viljan Mahnič"}],
      entityName: false
    };
    
    /*axios.get(`courses/`)
      .then((response) => {
        console.log(response.data)
        this.items = response.data
      })
      .catch((error) => {
        console.log(error)
      })*/
  },
  data(){
    return {
      content: {
        content: [],
        fieldNames: null,
        details: [],
        entityName: false
      }
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
