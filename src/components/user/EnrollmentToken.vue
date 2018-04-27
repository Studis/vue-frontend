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
             <b-btn size="sm" variant="success" @click="newToken(data)">Ustvari</b-btn>
             </template>
             <template slot="edit_token" slot-scope="data">
             <b-btn size="sm" variant="outline-primary" @click="editToken(data)">Uredi</b-btn>
             </template>
             <template slot="delete_token" slot-scope="data">
             <b-btn size="sm" variant="danger" @click="deleteToken(data)">Izbriši</b-btn>
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
      <h3>Ustvari nov žeton</h3>
      <br>
        <b-form-group label="Študijski program" label-for="exampleInput2">
          <b-form-select :options="courses" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Letnik" label-for="exampleInput2">
          <b-form-select :options="study_year" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Vrsta vpisa" label-for="exampleInput2">
          <b-form-select :options="enrollment_types" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Način študija" label-for="exampleInput2">
          <b-form-select :options="study_type" class="mb-3">
          </b-form-select>
        </b-form-group>
        <b-form-group label="Oblika študija" label-for="exampleInput2">
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
  poljubni_predmeti: string
}
interface itemFieldsType {
  enrollmentNumber: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  enrollmentTokens: string;
}
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    totalRows: number
    currentPage: number
    enrollmentTokens: Array<itemFieldsType>
    $axios: any
    tokens: Array<enrollment>
    show: any
  }
}
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({
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
    newToken (data) {
      // get pre-defined values...
      axios.get(`students/${data.item.id}/enrollments`).then((response: any) => {
      this.tokens = response.data.map((x: any) => {
            return {
              studijski_program: x.semester1.program.title,
              letnik: Math.floor(x.semester1.number/2),
              vrsta_vpisa: x.type.name,
              nacin_studija: 'na daljavo',
              studijsko_leto: x.semester1.year.toString
            }
          })
      // @ts-ignore
      this.$refs.vpisiPodatki.show();

    }).catch((err: any) => {
      console.log(err)
    })
    }
  },
  mounted() {
    axios.get(`students`).then((response: any) => {
      this.enrollmentTokens = response.data;
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
    { key: 'new_token', label: 'Možnosti', sortable: false },
    { key: 'edit_token', label: '', sortable: false },
    { key: 'delete_token', label: '', sortable: false }
  ]
  modalFields: Array<sortFieldsType> = [
    { key: 'studijsko_leto', label: 'Študijsko leto', sortable: true },
    { key: 'letnik', label: 'Letnik', sortable: true },
    { key: 'studijski_program', label: 'Študijski program', sortable: true },
    { key: 'vrsta_vpisa', label: 'Vrsta vpisa', sortable: true },
    { key: 'nacin_studija', label: 'Način in oblika študija', sortable: true },
    { key: 'poljubni_predmeti', label: 'Pravica do proste izbire predmetov', sortable: true }
  ]
  tokens: Array<enrollment> = []
  currentPage: number = 1
  perPage: number = 5
  pageOptions: Array<number> = [ 5, 10, 15 ]
  filter = null
  enrollmentTokens = []
  enrollments = []
  totalRows: number = 0
}
</script>

<style lang="scss">
</style>
