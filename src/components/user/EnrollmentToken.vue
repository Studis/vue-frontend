<template>
  <div>
    <h3>Urejanje žetonov za vpis</h3>
    <b-table class="my" stacked="md" hover
             :items="enrollmentTokens"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             @filtered="onFiltered">
             <template slot="edit_token" slot-scope="data">
             <b-btn size="sm" variant="success" @click="editToken(data)">Uredi žeton</b-btn>
             </template>
             <template slot="delete_token" slot-scope="data">
             <b-btn size="sm" variant="danger" @click="deleteToken(data)">Uredi žeton</b-btn>
             </template>
    </b-table>
     <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
     <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    <b-modal ref="urediZeton" size="lg">
      <b-container fluid>
      <h3>Uredi žeton</h3>
      <br>
        <b-form-group label="Študijski program">
          <b-form-select :options="courses" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Letnik">
          <b-form-select :options="study_year" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Vrsta vpisa">
          <b-form-select :options="enrollment_types" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Način študija">
          <b-form-select :options="study_type" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Oblika študija">
          <b-form-select :options="study_form" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox class="mb-3">
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
      courses: [
        '1001001 Multimedija UN-I. ST',
        '1000407 Računalništvo in matematika UN-I. ST',
        '1000468 Računalništvo in informatika UN-I. ST',
        '1000469 Upravna informatika UN-I. ST',
        '1000470 Računalništvo in informatika VS-I. ST',
        '1000471 Računalništvo in informatika MAG-II. ST',
        '1000472 Kognitivna znanost MAG-II. ST',
        '1000934 Računalništvo in matematika MAG-II. ST',
        '7002801 Pedagoško računalništvo in informatika MAG-II. ST',
        '1000474 Računalništvo in informatika DR-III. ST',
      ],
      course_types: [
        '16203 Visokošolska strokovna izobrazba (prva bolonjska stopnja)',
        '16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)',
        '17003 Magistrska izobrazba (druga bolonjska stopnja)',
        '18202 Doktorat znanosti (tretja bolonjska stopnja)',
      ],
      enrollment_types: [
        '01 Prvi vpis v letnik/dodatno leto',
        '02 Ponavljanje letnika',
        '03 Nadaljevanje letnika',
        '04 Podaljšanje statusa študenta',
        '05 Vpis po merilih za prehode v višji letnik',
        '06 Vpis v semester skupnega št. programa',
        '07 Vpis po merilih za prehode v isti letnik',
      ],
      study_year: ['1.', '2.', '3.', '4.', '5.', '6.', 'dodatno leto',],
      study_type: ['1 redni', '3 izredni'],
      study_form: ['1 na lokaciji', '2 na daljavo', '3 e-študij'],
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'program.title', label: 'Študijski program', sortable: true },
        { key: 'studyYear.id', label: 'Letnik', sortable: true },
        { key: 'enrollmentType.name', label: 'Vrsta vpisa', sortable: true },
        { key: 'studyType.name', label: 'Način študija', sortable: true },
        { key: 'studyForm.name', label: 'Oblika študija', sortable: true },
        { key: 'freeChoice', label: 'Pravica do proste izbire predmetov', sortable: true }
      ],
      tokens: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      enrollmentTokens: [],
      totalRows: 0,
      show: false,
      props: ["id"],
      t: []
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
    editToken(data) {
      axios.get(`students/${route.params.id}/enrollments`).then((response) => {
      this.enrollmentToken = response.data.map((x) => {
        return {
          // Fill modal with token data
        }
      })
      this.$refs.urediZetone.show();
      }).catch((err) => {
        console.log(err)
      })
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
        console.log(this.enrollmentTokens)
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>



<style lang="scss">
.my {
  font-size: 0.85em;
}
</style>
