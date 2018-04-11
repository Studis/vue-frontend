<template>
  <div>
    <!--<b-table striped hover :items="items"></b-table>-->
    <h2>{{course.name}}</h2>
    <!--<b-badge v-for="l in course.lecturers">
      {{ l.name }} {{l.surname}}
    </b-badge>-->
    <b-badge>EE</b-badge>
    <br><br>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :fields="fields">
    </b-table>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'
import axios from 'axios';
import rest from './../../rest.js'

export default {
  components: {
  },
  methods: {
     load() {
      
    },
  },
  mounted(){
    axios.get(`courses/${this.courseId}/enrollments`)
      .then((response) => {
        let students = response.data.map((x)=>{
          let s = x.enrollment.token.student;
          return {name: s.name, surname: s.surname, enrollment: s.enrollmentNumber};
        });
        console.log(students);
        this.items = students;
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`courses/${this.courseId}`)
      .then((response) => {
        console.log(response);
        this.course = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data(){
    return {
      sortBy: 'name',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'surname', sortable: true },
        { key: 'enrollment', sortable: true },
      ],
      items: [],
      course: {}
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
