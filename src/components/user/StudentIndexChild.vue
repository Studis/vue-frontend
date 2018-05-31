<template>
  <div class="kartotecni-list">
    <div class="text-center">
      <b>{{vpis.enrollment.token.program.title}}</b>
    </div>
    <br>
    <b-row>
    <b-col sm="3">
    <div class="text-left">
       Študijsko leto: {{vpis.enrollment.curriculum.year.toString}}
       <br>
       Letnik: {{vpis.enrollment.token.studyYear.id}}
       <br>
       Način: {{vpis.enrollment.studyType.name}}
    </div>
    </b-col>
    <b-col sm="6">
    <div class="text-center">
      Smer: Ni smeri<br>
      Vrsta vpisa: {{vpis.enrollment.type.name}}<br>
      Skupina: LJUBLJANA
    </div>
    </b-col>
    </b-row>
    <br><br>

    <div>
      <b-table stacked="md"
            :items="items"
            :fields="fields"
            ref="indexTable">
      </b-table>
    </div>
    KT: {{vpis.ects}}, povprečje: {{((vpis.average && !isNaN(vpis.average))?(Math.round(vpis.average*10)/10):"/")}}
  </div>
</template>

<script>
import Router from "vue-router";

export default {
  components: {},
  mounted() {
    // this.items.push(row.examEnrollment.exam.asking)
    // this.items.push(this.formatDate(new Date(Date.parse(row.examEnrollment.exam.scheduledAt))))
    // this.items.push(row.examEnrollment.mark)
    // this.items.push(row.examEnrollment.totalExamAttempts)
    // this.items.push(row.examEnrollment.returnedExamAttempts)  
    for (let a of this.vpis.index) {
      if(a.examEnrollment) a.examEnrollment.exam.scheduledAt = this.$options.filters.datum(a.examEnrollment.exam.scheduledAt)
    }
    
  },
  data() {
    return {
      response: null,
      fields: [
          { key: 'courseExecution.course.id', label: 'Šifra' },
          { key: 'courseExecution.course.name', label: 'Predmet' },
          { key: 'courseExecution.course.ects', label: 'KT' },
          { key: 'examEnrollment.exam.asking', label: 'Izpraševalec'},
          { key: 'examEnrollment.exam.scheduledAt', label: 'Datum' },
          { key: 'examEnrollment.mark', label: 'Ocena'},
          { key: 'examEnrollment.totalExamAttempts', label: 'Št. polaganj'},
          { key: 'examEnrollment.totalAttempts', label: 'V študijskem letu'}

      ],
      items: this.vpis.index
    };
  },
  computed: {
    student() {
      if (this.vpis) return this.vpis.enrollment.token.student || false
    }
  },
  props: ["vpis"]
};
</script>

<style lang="scss">
.actionBtn {
  margin: 0.2em;
}
.kartotecni-list {
  margin-bottom: 5em;
}
</style>
