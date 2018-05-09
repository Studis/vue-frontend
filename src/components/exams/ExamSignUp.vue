<template>
  <div>
    {{rowData}}
    <results v-if="getRole !== 'ADMIN'"
      title="Exams" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="course"
      v-on:b-click-id="btnClicked"
      :actions="[{name: 'Apply',classColor: 'btn-success'},{name: 'Delete',classColor: 'btn-danger'}]"
      >
      </results>

  
  </div>
</template>

<script>
import axios from 'axios'
import Results from '../Results.vue'
import { mapState, mapGetters } from 'vuex';


export default {
  data () {
    return {
      content: {
        content: [],
        fieldNames: null
      },
      details:[],
      rowData: {}
    }
  },
   components: {
    'results': Results
  },
  computed: {
    ...mapGetters([
      'getRole'
    ])
  },
  methods: {
    btnClicked(el) {
      this.rowData = el
      if(el.actionName == "Apply") {
        var enrollmentCourseId = el.clickedItem.id
        console.log(enrollmentCourseId)
        axios.post('/exams/enrollments', { "enrollmentCourseId": enrollmentCourseId, "examId": examId })
        .then(function(response){
          
        });  
      }
    }
  },
  mounted () {
    axios.get('courses/me').then((response) => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    axios.get('/exams/enrollments').then((response) => {
        var tableData = response.data.map((x)=>{
            console.log(x.exam.courseExecution)
            var r = {
              id: x.id,
              // studyYear: (x.exam.courseExecution.curriculum) ? x.exam.courseExecution.curriculum.studyYear.id : '',
              course: x.exam.courseExecution.course.name,
              professor: x.exam.courseExecution.lecturer1.name + " " + x.exam.courseExecution.lecturer1.surname || x.exam.courseExecution.lecturer2.name + " " + x.exam.courseExecution.lecturer2.surname || x.exam.courseExecution.lecturer3.name + " " + x.exam.courseExecution.lecturer3.surname,
              date: this.$options.filters.datum(x.exam.scheduledAt)
            }
            return r;
          });
        this.content = {
          content: tableData,
          fieldNames: null
        };
      }).catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss">
 .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  #logintext {
    padding: 0.3em;
  }
</style>
