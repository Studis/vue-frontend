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
             @filtered="onFiltered">
             <template slot="enrollments" slot-scope="data">
             <b-btn @click="getVpis(data)">Show</b-btn>
             </template>
    </b-table>
    <b-modal ref="vpisiPodatki" id="vpisiPodatki" size="lg">
      <b-container fluid>
      <h3>Podatki o vseh vpisih</h3>
      <b-table stacked="md"
            :items="enrollments"
            :fields="modalFields">
      </b-table>
      </b-container>    
    </b-modal>
    <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
  </div>
</template>

<script lang="ts">

interface sortFieldsType {
  key: string;
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
    }).catch((err: any) => {
      console.log(err)
    })
  }
})



export default class SearchStudent extends Vue {
  
  message: string = 'Hello!'
  sortBy: string = 'first_name'
  sortDesc: boolean = false
  fields: Array<sortFieldsType> = [
    { key: 'enrollmentNumber', sortable: true },
    { key: 'name', sortable: true },
    { key: 'surname', sortable: true },
    { key: 'permanent', sortable: true },
    { key: 'temporary', sortable: true },
    { key: 'enrollments', sortable: false },
  ]
  modalFields: Array<sortFieldsType> = [
    { key: 'studijsko_leto', sortable: true },
    { key: 'letnik', sortable: true }, 
    { key: 'studijski_program', sortable: true },
    { key: 'vrsta_vpisa', sortable: true },
    { key: 'nacin_studija', sortable: true }
  ]
  items: Array<itemFieldsType> = [
    { EnrollmentNumber: 6318001, first_name: 'Bob', last_name: 'Bogi', address: "Celovska cesta 30", email: "bb0001@student.uni-lj.si", enrollments: "-"},
    { EnrollmentNumber: 6318002, first_name: 'Annie', last_name: 'Shaw', address: "Celovska cesta 2", email: "as0001@student.uni-lj.si", enrollments: "-" },
    { EnrollmentNumber: 6318003, first_name: 'Geneva', last_name: 'Wilson', address: "Celovska cesta 33", email: "gw0001@student.uni-lj.si", enrollments: "-" },
    { EnrollmentNumber: 6318004, first_name: 'Jami', last_name: 'Carney', address: "Celovska cesta 10", email: "jc0001@student.uni-lj.si", enrollments: "-" },
  ]
  enrollments: Array<enrollment> = []
  currentPage: number = 1
  perPage: number = 5
  pageOptions: Array<number> = [ 5, 10, 15 ]
  filter = null
}
</script>

<style lang="scss">
</style>
