<template>
  <div>
    <b-table striped hover :items="items">
      <h3>Search students</h3>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const items = [
  { EnrollmentNumber: 6318001, first_name: 'Bob', last_name: 'Bogi', address: "Celovska cesta 30", email: "bb0001@student.uni-lj.si", enrollments: "-"},
  { EnrollmentNumber: 6318002, first_name: 'Annie', last_name: 'Shaw', address: "Celovska cesta 2", email: "as0001@student.uni-lj.si", enrollments: "-" },
  { EnrollmentNumber: 6318003, first_name: 'Geneva', last_name: 'Wilson', address: "Celovska cesta 33", email: "gw0001@student.uni-lj.si", enrollments: "-" },
  { EnrollmentNumber: 6318004, first_name: 'Jami', last_name: 'Carney', address: "Celovska cesta 10", email: "jc0001@student.uni-lj.si", enrollments: "-" }
]


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
      items: items
    }
  }
}
</script>

<style lang="scss">
</style>
