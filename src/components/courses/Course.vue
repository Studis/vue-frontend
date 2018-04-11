<template>
  <div>
    <!--<b-table striped hover :items="items"></b-table>-->
    <h2>{{course.name}}</h2>
    <p>Course code: {{course.code}}</p>
    <p>Module: {{course.module.name}}</p>
    <p>Semester: {{course.module.semester.toString}}</p>
    <ul>
      <li v-for="l in course.lecturers">
        {{ l.name }} {{l.surname}}
      </li>
    </ul>
    <b-button variant="primary" v-bind:href="'http://localhost:8080/v1/courses/'+this.courseId+'/enrollments/pdf'">PDF</b-button> 
    <b-button variant="primary" v-bind:href="'http://localhost:8080/v1/courses/'+this.courseId+'/enrollments/csv'">CSV</b-button>
    <br><br>
    <h3>Enrolled students</h3>
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
  computed(){
    return []
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
