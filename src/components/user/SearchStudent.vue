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
    </b-table>
    
  </div>
</template>

<script lang="ts">

interface sortFieldsType {
  key: string;
  sortable: boolean;
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
  }
}
import { Component, Vue } from 'vue-property-decorator';


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
    saveProfile () {
      this.$snotify.async('Saved', 'saved', () => new Promise((resolve, reject) =>
        resolve({
          config: {
            closeOnClick: true,
            timeout: 2000
          }
        })
      ));
    },
  },
})



export default class SearchStudent extends Vue {
  
  message: string = 'Hello!'
  sortBy: string = 'first_name'
  sortDesc: boolean = false
  fields: Array<sortFieldsType> = [
    { key: 'EnrollmentNumber', sortable: true },
    { key: 'first_name', sortable: true },
    { key: 'last_name', sortable: true },
    { key: 'address', sortable: true },
    { key: 'email', sortable: true },
    { key: 'enrollments', sortable: true },
  ]
  items: Array<itemFieldsType> = [
    { EnrollmentNumber: 6318001, first_name: 'Bob', last_name: 'Bogi', address: "Celovska cesta 30", email: "bb0001@student.uni-lj.si", enrollments: "-"},
    { EnrollmentNumber: 6318002, first_name: 'Annie', last_name: 'Shaw', address: "Celovska cesta 2", email: "as0001@student.uni-lj.si", enrollments: "-" },
    { EnrollmentNumber: 6318003, first_name: 'Geneva', last_name: 'Wilson', address: "Celovska cesta 33", email: "gw0001@student.uni-lj.si", enrollments: "-" },
    { EnrollmentNumber: 6318004, first_name: 'Jami', last_name: 'Carney', address: "Celovska cesta 10", email: "jc0001@student.uni-lj.si", enrollments: "-" },
  ]
  currentPage: number = 1
  perPage: number = 5
  // @ts-ignore
  // totalRows: number = items.length
  pageOptions: Array<number> = [ 5, 10, 15 ]
  filter = null
}
</script>

<style lang="scss">
</style>
