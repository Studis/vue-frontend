<template>
  <div>
    <h3>Kreiranje, urejanje in brisanje žetonov za vpis</h3>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Iskanje" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Vpišite iskalni niz..." />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Izbriši</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    <b-table stacked="md" hover
             :items="enrollmentTokens"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             @filtered="onFiltered">
             <template slot="new_token" slot-scope="data">
             <b-btn size="sm" variant="success" @click="show_newToken()">Ustvari nov žeton</b-btn>
             </template>
             <template slot="edit_token" slot-scope="data">
             <b-btn size="sm" variant="secondary" @click="show_editTokens(data.item.id)">Uredi žetone</b-btn>
             </template>
    </b-table>
     <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
     <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    <b-modal ref="novZeton" size="lg">
      <b-container fluid>
      <h3>Ustvari nov žeton</h3>
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
    <b-modal ref="urediZetone" size="lg">
      <b-container fluid>
      <h3>Uredi žetone</h3>
      <br>
        <b-table stacked="md"
          :items="tokens"
          :fields="modalFields">
        </b-table>
      </b-container>    
    </b-modal>
    <br><br>
    <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EnrollmentTokens',
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
      message: 'Hello!',
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', label: '#', sortable: true },
        { key: 'enrollmentNumber', label: 'Vpisna številka', sortable: true },
        { key: 'name', label: 'Ime', sortable: true },
        { key: 'surname', label: 'Priimek', sortable: true },
        { key: 'new_token', label: 'Možnosti', sortable: false },
        { key: 'edit_token', label: '', sortable: false },
      ],
      modalFields: [
        { key: 'studijsko_leto', label: 'Študijsko leto', sortable: true },
        { key: 'letnik', label: 'Letnik', sortable: true },
        { key: 'studijski_program', label: 'Študijski program', sortable: true },
        { key: 'vrsta_vpisa', label: 'Vrsta vpisa', sortable: true },
        { key: 'nacin_studija', label: 'Način in oblika študija', sortable: true },
        { key: 'poljubni_predmeti', label: 'Pravica do proste izbire predmetov', sortable: true }
      ],
      tokens: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      enrollmentTokens: [],
      enrollments: [],
      totalRows: 0,
      show: false
    }
  },
  components: {
  },
  methods: {
    onSubmit () {
    this.$router.push({name: 'login'})
    },
    goBack () {
      this.$router.push({name: 'login'})
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
    show_newToken() {this.$refs.novZeton.show();},
    show_editTokens(data) {
      this.$router.push({name: 'enrollmentToken', params: { id: data } })
    }
  },
  mounted() {
    axios.get(`students`).then((response) => {
      this.enrollmentTokens = response.data;
      this.totalRows = response.data.length
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
</style>
