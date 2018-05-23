<template>
  <div>
    <h3>Urejanje žetonov za vpis</h3>
    <b-table class="my" stacked="md" hover responsive
             :items="enrollmentTokens"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             @filtered="onFiltered">
             <template slot="edit_token" slot-scope="data">
             <b-btn size="sm" variant="success" @click="showModal(data)">Uredi žeton</b-btn>
             </template>
    </b-table>
     <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
     <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    <b-modal @ok="editToken" ref="urediZeton" size="lg">
      <b-container fluid>
      <h3>Uredi žeton</h3>
      <br>
        <b-form-group label="Študijski program">
          <b-form-select :options="courses" class="mb-3" v-model="studijski_program">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Letnik">
          <b-form-select :options="study_year" class="mb-3" v-model="letnik">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Vrsta vpisa">
          <b-form-select :options="enrollment_types" class="mb-3" v-model="vrsta_vpisa">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Način študija">
          <b-form-select :options="study_type" class="mb-3" v-model="nacin_studija">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Oblika študija">
          <b-form-select :options="study_form" class="mb-3" v-model="oblika_studija">
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="mb-3" v-model="pravica">
            Pravica do proste izbire predmetov
          </b-form-checkbox>
        </b-form-group>
      </b-container>    
    </b-modal>
    <br><br>
    <b-button type="reset" variant="danger" @click.prevent="goBack">Nazaj</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnrollmentToken',
  data() {
    return {
      studijski_program: '',
      letnik: '',
      vrsta_vpisa: '',
      nacin_studija: '',
      oblika_studija: '',
      pravica: '',
      courses: [
        '1001001 Multimedija UNI',
        '1000407 Računalništvo in matematika UNI',
        '1000468 Računalništvo in informatika UNI',
        '1000469 Upravna informatika UNI',
        '1000470 Računalništvo in informatika VS',
        '1000471 Računalništvo in informatika MAG',
        '1000472 Kognitivna znanost MAG',
        '1000934 Računalništvo in matematika MAG',
        '7002801 Pedagoško računalništvo in informatika MAG',
        '1000474 Računalništvo in informatika DR',
      ],
      course_types: [
        '16203 Visokošolska strokovna izobrazba (prva bolonjska stopnja)',
        '16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)',
        '17003 Magistrska izobrazba (druga bolonjska stopnja)',
        '18202 Doktorat znanosti (tretja bolonjska stopnja)',
      ],
      enrollment_types: [
        '1 Prvi vpis v letnik/dodatno leto',
        '2 Ponavljanje letnika',
        '3 Nadaljevanje letnika',
        '4 Podaljšanje statusa študenta',
        '5 Vpis po merilih za prehode v višji letnik',
        '6 Vpis v semester skupnega št. programa',
        '7 Vpis po merilih za prehode v isti letnik',
      ],
      study_year: ['1', '2', '3', '4', '5', '6', 'dodatno leto',],
      study_type: ['1 Redni', '3 Izredni'],
      study_form: ['1 Na lokaciji', '2 Na daljavo', '3 E-študij'],
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'program.title', label: 'Študijski program', sortable: true },
        { key: 'studyYear.id', label: 'Letnik', sortable: true },
        { key: 'enrollmentType.name', label: 'Vrsta vpisa', sortable: true },
        { key: 'studyType.name', label: 'Način študija', sortable: true },
        { key: 'studyForm.name', label: 'Oblika študija', sortable: true },
        { key: 'freeChoice', label: 'Pravica do proste izbire predmetov', sortable: true },
        { key: 'edit_token', label: ''}
      ],
      tokens: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      enrollmentTokens: [],
      totalRows: 0,
      show: false,
      props: ["id"]
    }
  },
  components: {
  },
  methods: {
    onSubmit () {
    this.$router.push({name: 'login'})
    },
    goBack () {
      this.$router.push({name: 'enrollmentTokens'})
    },
    onReset () {
    },
    goHome () {
      this.$router.push({name: 'home'})
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showModal(data) {
      axios.get(`tokens/${this.$route.params.id}`)
      .then((response) => {
        for(var x = 0; x < response.data.length; x++) {
          if(response.data[x].id == data.item.id) {
            this.studijski_program = response.data[x].program.id + " " + response.data[x].program.title;
            this.letnik = response.data[x].studyYear.id;
            this.vrsta_vpisa = response.data[x].enrollmentType.id + " " + response.data[x].enrollmentType.name;
            this.nacin_studija = response.data[x].studyType.id + " " + response.data[x].studyType.name;
            this.oblika_studija = response.data[x].studyForm.id + " " + response.data[x].studyForm.name;
            this.pravica = response.data[x].freeChoice;
          }
        }
        this.$refs.urediZeton.show();
      }).catch((err) => {
        console.log(err)
      })
    },
    editToken() {
      axios.put(`tokens/${this.$route.params.id}`, {
        program: {
          title: this.studijski_program.split(" ")[0]
        },
        status: "ACTIVE",
        studyYear: {
          id: this.letnik
        },
        enrollmentType: {
          id: this.vrsta_vpisa.split(" ")[0]
        },
        studyType: {
          id: this.nacin_studija.split(" ")[0]
        },
        studyForm: {
          id: this.oblika_studija.split(" ")[0]
        },
        freeChoice: this.pravica
      })
      .then(function (response) {
        console.log(response);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
    // Get this student's tokens
    axios.get(`tokens/${this.$route.params.id}`)
      .then((response) => {
        for(var x = 0; x < response.data.length; x++) {
          if(response.data[x].status != null) {
            if(response.data[x].freeChoice) response.data[x].freeChoice = "Da";
            else response.data[x].freeChoice = "Ne";
            response.data[x].program.title = response.data[x].program.id + " " + response.data[x].program.title;
            response.data[x].enrollmentType.name = response.data[x].enrollmentType.id + " " + response.data[x].enrollmentType.name;
            response.data[x].studyType.name = response.data[x].studyType.id + " " + response.data[x].studyType.name;
            response.data[x].studyForm.name = response.data[x].studyForm.id + " " + response.data[x].studyForm.name;
            this.enrollmentTokens.push(response.data[x])
          }
        }
        /*.map(x => {
          if (x.status != null) {
            return {
              studijski_program: x.program.id + " - " + x.program.title,
              letnik: x.studyYear.id,
              vrsta_vpisa: x.enrollmentType.name,
              nacin_studija: x.studyType.name + ", " + x.studyForm.name,
              studijsko_leto: "2018/2019"
            }
          }
        })*/
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>



<style lang="scss">
.my {
  font-size: 0.75em;
}
</style>
