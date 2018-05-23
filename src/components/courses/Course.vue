<template>
  <div>
    <results 
      title="Course" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="student"
      sortByField="surname"
      v-model="content"></results>
    <button @click.prevent="load(true)">Duplicate</button>
     <br><br><br><br>
     <results 
      title="Exam applications"
      :indexes="true"
      :content="examEnrollments"
      entityName="exam"
      v-on:b-click-id="btnClicked"
      :actions="[{name: 'Open',classColor: 'btn-success'}]"
      >
      </results>
      
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
    load(duplicate) {
      axios.get(`courses/${this.id}/enrollments`)
      .then((response) => {
        if(duplicate){
          response.data = response.data.reduce(function (res, cur, index, 
          array) {
              return res.concat([cur, cur, cur, cur, cur, cur, cur, cur, cur, cur, cur]);
          }, []); 
        }
        let students = response.data.map((x)=>{
          let s = x.enrollment.token.student;
          var r = {surname: s.surname, name: s.name, id: s.id, enrollment: s.enrollmentNumber};
          r["study type"] = x.enrollment.studyType.name;
          return r;
        });
        console.log(students);
        this.content = {content: students, fieldNames: false};
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get(`exams/enrollments/${this.id}`)
      .then((response) => {
        let tableData = response.data.map((x)=>{
          console.log('hej ', x)
          let r = {
            id: x.id,
            surname: x.enrollment.enrollment.token.student.surname,
            name: x.enrollment.enrollment.token.student.name,
            enrollment: x.enrollment.enrollment.token.student.enrollmentNumber,
            scheduledAt: this.$options.filters.datum(x.exam.scheduledAt),
            studyYear: x.enrollment.enrollment.curriculum.year.toString,
            score: x.score,
            mark: x.status === 'deleted' ? 'VP' : x.mark,
            location: x.exam.location,
            asking: x.exam.asking
            // course: x.enrollmentCourse.courseExecution.course.name,
            // professor: x.enrollmentCourse.courseExecution.lecturer1.name + " " + x.enrollmentCourse.courseExecution.lecturer1.surname || x.enrollmentCourse.courseExecution.lecturer2.name + " " + x.enrollmentCourse.courseExecution.lecturer2.surname || x.enrollmentCourse.courseExecution.lecturer3.name + " " + x.enrollmentCourse.courseExecution.lecturer3.surname,
            // date: this.$options.filters.datum(x.examsAvailable[0].scheduledAt)
          }
          return r
        })
        this.examEnrollments = {
          content: tableData,
          fieldNames: null
        };
      })
      .catch((error) => {
        console.log(error);
      });
    },
    btnClicked () {}
  },
  mounted() {
    this.load(false);

    axios.get(`courses/${this.id}`)
      .then(response => {
        var x = response.data;
        var d = [
            {title: "Name", value: x.course.name + " ("+x.course.id+")"},
            {title: "ECTS", value: x.course.ects},
            {title: "Lecturer 1", value: x.lecturer1.name + " " + x.lecturer1.surname + " ("+x.lecturer1.code+")"}
        ];
        if(x.lecturer2){
          d.push({title: "Lecturer 2", value: x.lecturer2.name + " " + x.lecturer2.surname + " ("+x.lecturer2.code+")"})
        }
        if(x.lecturer3){
          d.push({title: "Lecturer 3", value: x.lecturer3.name + " " + x.lecturer3.surname + " ("+x.lecturer3.code+")"})
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
      examEnrollments: {
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
