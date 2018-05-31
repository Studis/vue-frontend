<template>
  <div>

    <div v-if="getRole !== 'ADMIN' && getRole !== 'LECTURER' && getRole !== 'CLERK'">
      <results v-show="doRefresh" 
        title="Exam terms" 
        :indexes="true"
        :content="content"
        :details="details"
        entityName="exam"
        :landscape="true"
        v-on:b-click-id="btnClicked"
        :actions="[{name: 'Prijava',classColor: 'btn-success',vhide: 'enrolled'},{name: 'Odjava',classColor: 'btn-danger',vshow: 'enrolled'}]"
        >
         <b-dropdown id="ddown1" :text="selectedExamTerm" class="m-md-2" >
          <b-dropdown-item @click.prevent="updateExamTerms(item)" :key="item" v-for="item in allExamTerms">{{item}}</b-dropdown-item>
         </b-dropdown>
        <!-- dropdown: {id: 'examDates',items: [{name: 'dfsl',id: 1},{name: 'fds', id: 2}]}} -->
        </results>
    </div>
    <b-modal ref="eraseExam" size="lg" @ok="acceptOffer">
      <b-container fluid>
        <b-row>
        <h3>Zahtevan je bil izbris za izpitni rok {{deletionCourse.message}}!</h3>
        </b-row>
      </b-container>    
    </b-modal>
  
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
      responseData: {},
      deletionCourse: { message: '', data: {}},
      allExamTerms: [],
      selectedExamTerm: '',
      originalContent: {},
      baseText: 'Select exam term: ',
      doRefresh: true,
      baseText: 'Izberite izpitni rok: '
    }
  },
   components: {
    'results': Results
  },
  computed: {
    ...mapGetters([
      'getRole',
      'getFullName'
    ])
  },
  methods: {
    updateExamTerms (ele) {
      this.content = {
        content: this.originalContent.content.filter(el => el.examTerm == ele)
      }
      this.selectedExamTerm = this.baseText + ele
    },
    deleteExamApplicaton(examEnrollmentId) {
      axios.post('/exams/enrollments/cancel', { "examEnrollmentId": examEnrollmentId })
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message)
          } else {
            alert('Uspešno odstranjena prijava!')
          }
          this.prepareComponent()
        }).catch((err) => {
          alert(err.message)
        });  
    },
    acceptOffer () {
      this.deleteExamApplicaton(this.deletionCourse.data)
    },
    btnClicked(el) {
      this.rowData = el
      if(el.actionName == "Prijava") {
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
        this.doRefresh = false
        axios.post('/exams/enrollments', { "enrollmentCourseId": enrollmentCourseId, "examId": examId })
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message)
          } else {
            if (this.getFullName == 'Jože Dobravec') alert('You will need to pay exam! If you are not okay with that please remove enrollement!')
            alert('Prijava uspešna!')
          }
        }).catch((err) => {
          alert(err.message)
        });  
        this.doRefresh = true
      } else if (el.actionName == 'Odjava') {
        let examId = el.clickedItem.id
        var examDateSelected = el.clickedItem.date
        // filter(a => a.examsAvailable.filter(b => b.id == mojId)).map(c => c.enrollmentCourse.id)
        
        let examEnrollmentId = this.responseData
        .find(ek => ek.examsAvailable.find(en => en.id == examId)).examEnrollment.id
        //.map(c => c.enrollmentCourse.id)
        
        //.map(e => e.examsAvailable)
        // .find(em => {
        //   console.log(examDateSelected + "," + this.$options.filters.datum(em.scheduledAt))
        //   if (examDateSelected === this.$options.filters.datum(em.scheduledAt))
        //   return em
        // })// .map(ev => ev.scheduledAt)
        // alert(JSON.stringify(examId))
        console.log(examEnrollmentId)
        this.deleteExamApplicaton(examEnrollmentId)
      }
    },
    prepareComponent () {
      axios.get('courses/me').then((response) => {
        this.responseData = response.data
        console.log('ta',response.data)
        var tableData = response.data.map(xx => xx.examsAvailable).reduce((a,c) => {
            return a.concat(c)
          }).map((x)=>{
          console.log(x)
          // let passed = this.responseData.find(ek => ek.passed)
          // let mark = this.responseData.find(ek => ek.examsAvailable.find(en => en.id == x.id)).examEnrollment.mark
          
        
          if (x.examEnrollment && x.examEnrollment.status == null && x.deletionRequestedByUserId != null) {
            this.deletionCourse.data = x.examEnrollment.id
            this.deletionCourse.message = x.courseExecution.course.name + " at " + this.$options.filters.datum(x.scheduledAt)
            this.$refs.eraseExam.show()
          }

          var r = {
            id: x.id, // examId
            course: x.courseExecution.course.name,
            professor: x.courseExecution.lecturer1.name + " " + x.courseExecution.lecturer1.surname || x.courseExecution.lecturer2.name + " " + x.courseExecution.lecturer2.surname || x.courseExecution.lecturer3.name + " " + x.courseExecution.lecturer3.surname,
            date: this.$options.filters.datum(x.scheduledAt),
            mark: ((x.examEnrollment && x.examEnrollment.mark) ? `${x.examEnrollment.mark}` : ''),
            enrolled: (x.examEnrollment && x.examEnrollment.status == null) ? `Yes` : '', // enrolled has to be checked like this!!
            asking: x.asking,
            location: x.location,
            studyYear: (x.courseExecution.year) ? x.courseExecution.year.toString : '',
            totalExamAttempts: (x.examEnrollment) ? x.examEnrollment.totalAttempts : '',
            returnedAttempts: (x.examEnrollment) ? x.examEnrollment.totalExamAttempts : '', // V študijskem letu
            examTerm: (x.examTerm) ? x.examTerm : ''
          }
          
          return r;
        });

        let namesToFilter = tableData.filter(el => {
          return (el.mark && el.mark > 5 
          // && moment(el.scheduledAt).isBefore(moment.now().subtract(1, 'months'))
          )
        }).map(e => e.course)
        console.log('ntf ', namesToFilter)
        tableData = tableData.filter(td => {
          console.log(namesToFilter.indexOf(td.course) )
          return (namesToFilter.indexOf(td.course) == -1) && td.mark != 5
        }) // filter to only those that have no mark
        this.$set(this.content, 'content', tableData)
        this.$set(this.content, 'fieldNames', null)
        this.originalContent = this.content
        this.allExamTerms = this.content.content.map(e => e.examTerm).filter((value,index,self) => self.indexOf(value)===index).filter(el => el != null)
        this.selectedExamTerm = this.baseText
        // this.updateExamTerms(this.allExamTerms[this.allExamTerms.length-1])

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
