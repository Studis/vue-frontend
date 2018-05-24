<template>
  <div>

    <div v-if="getRole !== 'ADMIN' && getRole !== 'LECTURER' && getRole !== 'CLERK'">
      <results 
        title="Exams" 
        :indexes="true"
        :content="content"
        :details="details"
        entityName="course"
        v-on:b-click-id="btnClicked"
        :actions="[{name: 'Apply',classColor: 'btn-success',vhide: 'enrolled'},{name: 'Delete application',classColor: 'btn-danger',vshow: 'enrolled'}]"
        >
        <!-- dropdown: {id: 'examDates',items: [{name: 'dfsl',id: 1},{name: 'fds', id: 2}]}} -->
        </results>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'
import Results from '../Results.vue'
import { mapState, mapGetters } from 'vuex';
import moment from 'moment'

export default {
  data () {
    return {
      content: {
        content: [],
        fieldNames: null
      },
      details:[],
      rowData: {},
      responseData: {}
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
        let examId = el.clickedItem.id
        var examDateSelected = el.clickedItem.date
        // filter(a => a.examsAvailable.filter(b => b.id == mojId)).map(c => c.enrollmentCourse.id)
        
        let enrollmentCourseId = this.responseData
        .find(ek => ek.examsAvailable.find(en => en.id == examId)).enrollmentCourse.id
        //.map(c => c.enrollmentCourse.id)

        // alert(JSON.stringify(`examId ${examId} enrollmentCourseId ${JSON.stringify(enrollmentCourseId)}`))
        //.map(e => e.examsAvailable)
        // .find(em => {
        //   console.log(examDateSelected + "," + this.$options.filters.datum(em.scheduledAt))
        //   if (examDateSelected === this.$options.filters.datum(em.scheduledAt))
        //   return em
        // })// .map(ev => ev.scheduledAt)
        // alert(JSON.stringify(examId))
        console.log('eid', examId)
        axios.post('/exams/enrollments', { "enrollmentCourseId": enrollmentCourseId, "examId": examId })
        .then(function(response){
          if (response.data.message) {
            alert(response.data.message)
          } else {
            alert('Successfully applied!')
          }
        }).catch((err) => {
          alert(err.message)
        });  
      } else if (el.actionName == 'Delete application') {
        let examId = el.clickedItem.id
        var examDateSelected = el.clickedItem.date
        // filter(a => a.examsAvailable.filter(b => b.id == mojId)).map(c => c.enrollmentCourse.id)
        
        let examEnrollmentId = this.responseData
        .find(ek => ek.examsAvailable.find(en => en.id == examId)).examEnrollment.id
        alert(examEnrollmentId)
        //.map(c => c.enrollmentCourse.id)
        
        //.map(e => e.examsAvailable)
        // .find(em => {
        //   console.log(examDateSelected + "," + this.$options.filters.datum(em.scheduledAt))
        //   if (examDateSelected === this.$options.filters.datum(em.scheduledAt))
        //   return em
        // })// .map(ev => ev.scheduledAt)
        // alert(JSON.stringify(examId))
        console.log(examEnrollmentId)
        axios.post('/exams/enrollments/cancel', { "examEnrollmentId": examEnrollmentId })
        .then(function(response){
          if (response.data.message) {
            alert(response.data.message)
          } else {
            alert('Successfully deleted application!')
          }
        }).catch((err) => {
          alert(err.message)
        });  
      }
      this.prepareComponent()
    },
    prepareComponent () {
      axios.get('courses/me').then((response) => {
        this.responseData = response.data
        console.log('ta',response.data)
        var tableData = response.data.map(xx => xx.examsAvailable).reduce((a,c) => {
            return a.concat(c)
          }).map((x)=>{
          console.log(x)
          let isEnrolled = this.responseData.find(ek => ek.examsAvailable.find(en => en.id == x.id)).enrolled
          var r = {
            id: x.id, // examId
            course: x.courseExecution.course.name,
            professor: x.courseExecution.lecturer1.name + " " + x.courseExecution.lecturer1.surname || x.courseExecution.lecturer2.name + " " + x.courseExecution.lecturer2.surname || x.courseExecution.lecturer3.name + " " + x.courseExecution.lecturer3.surname,
            date: this.$options.filters.datum(x.scheduledAt),
            mark: ((x.passed) ? `${x.mark}` : ''),
            enrolled: (x.enrolled) ? `Yes` : '',
            asking: x.asking,
            location: x.location,
            studyYear: (x.courseExecution.year) ? x.courseExecution.year.toString : ''
          }
          return r;
        });
        this.$set(this.content, 'content', tableData)
        this.$set(this.content, 'fieldNames', null)
        // this.content = {
        //   content: tableData,
        //   fieldNames: null
        // };
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.prepareComponent()
    // axios.get('/exams/enrollments').then((response) => {
    //     var tableData = response.data.map((x)=>{
    //         console.log(x.exam.courseExecution)
    //         var r = {
    //           id: x.id,
    //           // studyYear: (x.exam.courseExecution.curriculum) ? x.exam.courseExecution.curriculum.studyYear.id : '',
    //           course: x.exam.courseExecution.course.name,
    //           professor: x.exam.courseExecution.lecturer1.name + " " + x.exam.courseExecution.lecturer1.surname || x.exam.courseExecution.lecturer2.name + " " + x.exam.courseExecution.lecturer2.surname || x.exam.courseExecution.lecturer3.name + " " + x.exam.courseExecution.lecturer3.surname,
    //           date: this.$options.filters.datum(x.exam.scheduledAt)
    //         }
    //         return r;
    //       });
    //     this.content = {
    //       content: tableData,
    //       fieldNames: null
    //     };
    //   }).catch(err => {
    //     console.log(err)
    //   })
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
