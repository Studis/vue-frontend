<template>
  <div>
    <h3>Search students</h3>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :fields="fields">
    </b-table>
  </div>
</template>

<script lang="ts">
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
  data () {
    return {
      sortBy: 'first_name',
      sortDesc: false,
      fields: [
        { key: 'EnrollmentNumber', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'last_name', sortable: true },
        { key: 'address', sortable: true },
        { key: 'email', sortable: true },
        { key: 'enrollments', sortable: true },
      ],
      items: [
        { EnrollmentNumber: 6318001, first_name: 'Bob', last_name: 'Bogi', address: "Celovska cesta 30", email: "bb0001@student.uni-lj.si", enrollments: "-"},
        { EnrollmentNumber: 6318002, first_name: 'Annie', last_name: 'Shaw', address: "Celovska cesta 2", email: "as0001@student.uni-lj.si", enrollments: "-" },
        { EnrollmentNumber: 6318003, first_name: 'Geneva', last_name: 'Wilson', address: "Celovska cesta 33", email: "gw0001@student.uni-lj.si", enrollments: "-" },
        { EnrollmentNumber: 6318004, first_name: 'Jami', last_name: 'Carney', address: "Celovska cesta 10", email: "jc0001@student.uni-lj.si", enrollments: "-" },
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
