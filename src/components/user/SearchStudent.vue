<template>
  <div>

    <h3>Search students</h3>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Search students" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    <b-table stacked="md"
             :items="items"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             @filtered="onFiltered">
             <template slot="enrollments" slot-scope="data">
             <b-btn @click="getVpis(data)">Show</b-btn>
             </template>
    </b-table>
     <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
     <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    <b-modal ref="vpisiPodatki" id="vpisiPodatki" size="lg">
      <b-container fluid>
      <h3>Podatki o vseh vpisih</h3>
      <b-table stacked="md"
            :items="enrollments"
            :fields="modalFields">
      </b-table>
      </b-container>    
    </b-modal>
    <br><br>
    <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
  </div>
</template>

<script lang="ts">

interface sortFieldsType {
  key: string;
  label: string;
  sortable: boolean;
}
interface enrollment {
  studijsko_leto: string
  letnik: string
  studijski_program: string
  vrsta_vpisa: string
  nacin_studija: string 
}
interface itemFieldsType {
  EnrollmentNumber: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  enrollments: string;
}
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    totalRows: number
    currentPage: number
    items: Array<itemFieldsType>
    $axios: any
    enrollments: Array<enrollment>
    show: any
  }
}
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({
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
    getVpis (data) {
      axios.get(`students/${data.item.id}/enrollments`).then((response: any) => {

      this.enrollments = response.data.map((x: any) => {
            return {
              studijski_program: x.semester1.program.title,
              letnik: Math.floor(x.semester1.number/2),
              vrsta_vpisa: x.type.name,
              nacin_studija: 'na daljavo',
              studijsko_leto: x.semester1.year.toString
            }
          })
      //@ts-ignore
      this.$refs.vpisiPodatki.show();

    }).catch((err: any) => {
      console.log(err)
    })
    }
  },
  mounted() {
    axios.get(`students`).then((response: any) => {
      this.items = response.data;
      this.totalRows = response.data.length
    }).catch((err: any) => {
      console.log(err)
    })
  }
})



export default class SearchStudent extends Vue {
  
  message: string = 'Hello!'
  sortBy: string = 'id'
  sortDesc: boolean = false
  fields: Array<sortFieldsType> = [
    { key: 'id', label: '#', sortable: true },
    { key: 'enrollmentNumber', label: 'Vpisna številka', sortable: true },
    { key: 'name', label: 'Ime', sortable: true },
    { key: 'surname', label: 'Priimek', sortable: true },
    { key: 'permanent.placeOfResidence', label: 'Naslov stalnega prebivališča', sortable: true },
    { key: 'temporary.placeOfResidence', label: 'Naslov začasnega prebivališča', sortable: true },
    { key: 'phoneNumber', label: 'Telefonska številka', sortable: true },
    { key: 'universityEmail', label: 'Elektronski naslov', sortable: true},
    { key: 'enrollments', label: 'Podatki o vpisih', sortable: false },
  ]
  modalFields: Array<sortFieldsType> = [
    { key: 'studijsko_leto', label: 'Študijsko leto', sortable: true },
    { key: 'letnik', label: 'Letnik', sortable: true }, 
    { key: 'studijski_program', label: 'Študijski program', sortable: true },
    { key: 'vrsta_vpisa', label: 'Vrsta vpisa', sortable: true },
    { key: 'nacin_studija', label: 'Način študija', sortable: true }
  ]
  enrollments: Array<enrollment> = []
  currentPage: number = 1
  perPage: number = 5
  pageOptions: Array<number> = [ 5, 10, 15 ]
  filter = null
  totalRows: number = 0
}
</script>

<style lang="scss">
  table { font-size: 14px; }
</style>
