<template>
  <div>
    <results 
      title="Course" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="student"
      v-model="content"></results>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";
import axios from "axios";
import rest from "./../../rest.js";
import Results from "../Results.vue";

export default {
  components: {
    results: Results
  },
  methods: {
    load() {}
  },
  mounted() {
    axios.get(`courses/${this.id}/enrollments`)
      .then((response) => {
        let students = response.data.map((x)=>{
          let s = x.enrollment.token.student;
          return {name: s.name, surname: s.surname, enrollment: s.enrollmentNumber};
        });
        console.log(students);
        this.content = {content: students, fieldNames: false};
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`courses/${this.id}`)
      .then(response => {
        var x = response.data;
        var d = [
            {title: "Name", value: x.course.name},
            {title: "ECTS", value: x.course.ects},
            {title: "Lecturer 1", value: x.lecturer1.name + " " + x.lecturer1.surname + " "+x.lecturer1.code}
        ];
        if(x.lecturer2){
          d.push({title: "Lecturer 2", value: x.lecturer2.name + " " + x.lecturer2.surname + " "+x.lecturer2.code})
        }
        if(x.lecturer3){
          d.push({title: "Lecturer 3", value: x.lecturer3.name + " " + x.lecturer3.surname + " "+x.lecturer3.code})
        }
        if(x.curriculum){
          d.push({title: "Year", value: x.curriculum.year.toString});
        }
        if(x.module){
          d.push({title: "Year", value: x.module.curriculum.year.toString});
          d.push({title: "Module", value: x.module.name});
        }
        this.details = d;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      content: {
        content: [],
        fieldNames: null
      },
      details:[]
    };
  },
  props: ["id"]
};
</script>

<style lang="scss">

</style>
