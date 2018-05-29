<template>
  <div>

    <h3>Osnovni podatki študentov</h3>
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
             <b-btn size="sm" variant="success" @click="getVpis(data)">Prikaži</b-btn>
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
        <template slot="potrdila" slot-scope="data">
          <router-link v-if="data.item.potrjen" :to="{ name: 'enrollmentConfirmation', params: { id: data.item.id }}">Prenesi</router-link>
          <b-button v-else-if="data.item.status == 'ACTIVE'" @click="potrdiVpis(data.item.id, data.item.studentId)">Potrdi</b-button>
        </template>
      </b-table>
      <b-btn variant="primary" @click="goIndex()">Kartotečni list</b-btn>
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
  enrollmentNumber: number;
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
    hide: any
    loadData: any
    getVpis: any
    studentId: any
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
    goIndex() {
      this.$router.push({name: 'index', params: {id: this.studentId}});
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    potrdiVpis(id, studentId){
      axios.post(`/enrollments/${id}/confirm`)
      .then(response => {
        //@ts-ignore
        this.$refs.vpisiPodatki.hide()
        this.loadData()
        this.getVpis({item: {id: studentId}})
      }).catch((err) => {
        alert(err.message)
      })
    },
    getVpis (data) {
      axios.get(`students/${data.item.id}/enrollments`).then((response: any) => {
        console.table(response.data)
        this.enrollments = response.data.map((x: any) => {
              this.studentId = x.id
              return {
                studijski_program: x.curriculum.program.id + " - " + x.curriculum.program.title,
                letnik: x.curriculum.studyYear.id,
                vrsta_vpisa: x.type.id + " - " + x.type.name,
                nacin_studija: x.studyType.id + " - " + x.studyType.name,
                studijsko_leto: x.curriculum.year.toString,
                id: x.id,
                status: x.token.status,
                potrjen: x.confirmed,
                studentId: x.token.student.id
              }
            })
        //@ts-ignore
        this.$refs.vpisiPodatki.show();

      }).catch((err: any) => {
        console.log(err)
      })
    },
    loadData(){
      axios.get(`students`).then((response: any) => {
        this.items = response.data;
        this.totalRows = response.data.length
      }).catch((err: any) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.loadData()
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
    { key: 'nacin_studija', label: 'Način študija', sortable: true },
    { key: 'potrdila', label: 'Potrdila o vpisih', sortable: false }
  ]
  enrollments: Array<enrollment> = []
  currentPage: number = 1
  perPage: number = 5
  pageOptions: Array<number> = [ 5, 10, 15 ]
  filter = null
  totalRows: number = 0
  items= []
  studentId = 0
}
</script>

<style lang="scss">
  table { 
    font-size: 14px; 
  }
</style>
