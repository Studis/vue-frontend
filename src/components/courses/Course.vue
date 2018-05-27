<template>
  <div>
    
    
    
    <results 
      title="Course enrollments" 
      :indexes="true"
      :content="content"
      :details="details"
      entityName="student"
      sortByField="surname"
      v-on:b-click-id="showStudent"
      :actions="[{name: 'Open', classColor: 'btn-success'}]"
      v-model="content"></results>

     <br><br><br><br>
     <results 
      title="Exam applications"
      :indexes="true"
      :content="examEnrollments"
      entityName="examEnrollment"
      v-on:b-click-id="btnClicked"
      :details="details"
      v-model="examEnrollments"
      >
      <b-dropdown id="ddown1" :text="selectedExamTerm" class="m-md-2" >
          <b-dropdown-item @click.prevent="updateExamTerms(item)" :key="item" v-for="item in allExamTerms">{{item}}</b-dropdown-item>
         </b-dropdown>
      </results>
      <br><br><br><br>
      <results 
      title="Scheduled exams"
      :indexes="true"
      :details="details"
      :content="scheduledExams"
      v-on:b-click-id="toggleDeleteModal"
      :actions="[{name: 'Delete', classColor: 'btn-danger',vhide: false}]"
      sortByField="scheduledAt"
      v-model="scheduledExams"
      >
      </results>
     <b-btn class="float-right" variant="success" @click.prevent="show_addExam(data)">Add new exam term</b-btn>
     <div class="clearfix"></div>




    <b-modal ref="zbrisiRok" size="lg" @ok="deleteScheduledExam">
      <b-container fluid>
        <b-row>
        <h3>{{beforeScheduleDelete}}!</h3>
        </b-row>
      </b-container>    
    </b-modal>

      <b-modal ref="dodajRok" size="lg" @ok="scheduleExam">
      <b-container fluid>
        <h3>Dodaj izpitni rok</h3>
        <br>
        <p class="naslov">
          <b-dropdown id="ddown1" :text="examTerm" class="m-md-2">
            <b-dropdown-item @click.prevent="changeTerm(1)">1</b-dropdown-item>
            <b-dropdown-item @click.prevent="changeTerm(2)">2</b-dropdown-item>
            <b-dropdown-item @click.prevent="changeTerm(3)">3</b-dropdown-item>
          </b-dropdown>
          Izpitni rok
        </p>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Datum">
                    <b-form-input type="date" class="mb-3" v-model="examDate" required>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group label="Ura">
                    <b-form-input type="time" class="mb-3" v-model="examTime" required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Location">
                    <b-form-input type="text" class="mb-3" v-model="examLocation" required>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="4">
                <b-form-group label="Asking">
                    <b-form-select v-model="asking" :options="profesors" class="mb-3" />
                </b-form-group>
                
            </b-col>
        </b-row>
      </b-container>    
    </b-modal>

      
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
  computed: {
    scheduledAt () {
      return this.examDate + "T" + this.examTime + ":00Z"
    }
  },
  methods: {
    showStudent (s) {
      this.$router.push({ name: 'student', params: {id: s.clickedItem.id} })
    },
    changeTerm (e) {
      this.examTerm = e
    },
    deleteScheduledExam () {
      // TODO: find examId
      let postdata = {
        examId: this.examId
      }
      axios.delete(`/exams/scheduled/erase/${this.examId}`)
      .then(response => {
        if (!response.data.message) alert('Users are enrolled in this exam!')
        this.getScheduledExams()
      }).catch((err) => {
        alert(err.message)
      })
    },
    getScheduledExams () {
      axios.get(`exams/scheduled/courseExecution/${this.id}`)
      .then((response) => {
        let tableData = response.data.map((x)=>{
          console.log('hej ', x)
          let r = {
            id: x.id,
            location: x.location,
            asking: x.asking,
            written: x.written,
            scheduledAt: this.$options.filters.datum(x.scheduledAt),
            examTerm: x.examTerm,
            // name: x.enrollment.enrollment.token.student.name,
            // enrollment: x.enrollment.enrollment.token.student.enrollmentNumber,
            // scheduledAt: this.$options.filters.datum(x.exam.scheduledAt),
            // studyYear: x.enrollment.enrollment.curriculum.year.toString,
            // score: x.score,
            // mark: x.status === 'deleted' ? 'VP' : x.mark,
            // location: x.exam.location,
            // asking: x.exam.asking
            // course: x.enrollmentCourse.courseExecution.course.name,
            // professor: x.enrollmentCourse.courseExecution.lecturer1.name + " " + x.enrollmentCourse.courseExecution.lecturer1.surname || x.enrollmentCourse.courseExecution.lecturer2.name + " " + x.enrollmentCourse.courseExecution.lecturer2.surname || x.enrollmentCourse.courseExecution.lecturer3.name + " " + x.enrollmentCourse.courseExecution.lecturer3.surname,
            // date: this.$options.filters.datum(x.examsAvailable[0].scheduledAt)
          }
          return r
        })
        this.scheduledExams = {
          content: tableData,
          fieldNames: null
        };
      })
      .catch((error) => {
        console.log(error);
      });
    },
    scheduleExam () {
      let postdata = {
        courseExecution: this.id,
        scheduledAt: this.scheduledAt,
        location: this.examLocation,
        asking: this.asking,
        examTerm: this.examTerm
      }
      axios.post('/exams/scheduled', postdata)
      .then(response => {
        if (response.data.message) alert(response.data.message)
        this.getScheduledExams()
      }).catch((err) => {
        alert(err.message)
      })
    },
    show_addExam(data) {
      this.$refs.dodajRok.show()
    },
    toggleDeleteModal (exId) {
      this.examId = exId.clickedItem.id
      this.$refs.zbrisiRok.show()
    },
    updateExamTerms (ele) {
      this.examEnrollments = {
        content: this.originalContent.content.filter(el => el.examTerm == ele)
      }
      this.selectedExamTerm = this.baseText + ele
    },
    load(duplicate) {
      axios.get(`courses/${this.id}/enrollments`)
      .then((response) => {
        console.log("Got enrollments", response.data)
        let students = response.data.map((x)=>{
          let s = x.token.student;
          var r = {surname: s.surname, name: s.name, id: s.id, enrollment: s.enrollmentNumber};
          r["study type"] = x.studyType.name;
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
          // console.log('hej ', x)
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
            asking: x.exam.asking,
            attemptNo: x.totalExamAttempts + '-' + x.returnedExamAttempts + '=' + (x.totalExamAttempts - x.returnedExamAttempts),
            examTerm: x.exam.examTerm
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
        this.originalContent = this.examEnrollments
        this.allExamTerms = this.examEnrollments.content.map(e => e.examTerm).filter((value,index,self) => self.indexOf(value)===index).filter(el => el != null)
        this.selectedExamTerm = this.baseText
      })
      .catch((error) => {
        console.log(error);
      });

      this.getScheduledExams()
    },
    btnClicked () {}
  },
  mounted() {
    this.load(false);

    axios.get(`courses/${this.id}`)
      .then(response => {
        var x = response.data;

        // Set lecturers
        this.profesors = []
        
          // End set lecturers
        var d = [
            {title: "Name", value: x.course.name + " ("+x.course.id+")"},
            {title: "ECTS", value: x.course.ects},
            {title: "Lecturer 1", value: x.lecturer1.name + " " + x.lecturer1.surname + " ("+x.lecturer1.code+")"}
        ];
        this.profesors.push(x.lecturer1.name + " " + x.lecturer1.surname)

        if(x.lecturer2){
          d.push({title: "Lecturer 2", value: x.lecturer2.name + " " + x.lecturer2.surname + " ("+x.lecturer2.code+")"})
          this.profesors.push(x.lecturer2.name + " " + x.lecturer2.surname)

        }
        if(x.lecturer3){
          d.push({title: "Lecturer 3", value: x.lecturer3.name + " " + x.lecturer3.surname + " ("+x.lecturer3.code+")"})
          this.profesors.push(x.lecturer3.name + " " + x.lecturer3.surname)
        }
        if(x.curriculum){
          d.push({title: "Year", value: x.curriculum.year.toString});
        }
        if(x.module){
          d.push({title: "Year", value: x.module.curriculum.year.toString});
          d.push({title: "Module", value: x.module.name});
        }
        if (this.profesors.length === 1) this.asking = this.profesors[0]
        this.details = d;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      allExamTerms: [],
      selectedExamTerm: '',
      originalContent: {},
      baseText: 'Select exam term: ',
      beforeScheduleDelete: 'Ali ste prepričani, da želite izpitni rok.',
      onFailScheduleDelete: 'Za ta izpit še obstajajo prijave! Zato izpitnega roka ni mogoče zbrisati',
      examDate: '',
      examTerm: 1,
      examTime: '',
      examLocation: '',
      asking: null,
      oldScheduledExams: {},
      profesors: [],
      examId: null,
      content: {
        content: [],
        fieldNames: null
      },
      examEnrollments: {
        content: [],
        fieldNames: null
      },
      scheduledExams: {
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
