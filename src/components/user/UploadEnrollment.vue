<template>
  <div>
    <h3>Uvoz podatkov</h3>
    <br>
          <b-form-group id="exampleInputGroup1"
            label="Uvozi podatke o vpisih"
            label-for="exampleInput1">
   


    <b-form-file :change="onFileChange(el)" id="uvozVpis" accept="*.txt" v-model="datoteka" :state="Boolean(datoteka)" placeholder="Choose a file..."></b-form-file>


    </b-form-group>
    <br>
    <b-button type="submit" variant="primary" @click.prevent="onSubmit()">Naloži</b-button>
    <br><br>
    <div v-if="zeNalozeno">
      <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :fields="fields">
    </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datoteka: null,
      zeNalozeno: false,
      sortBy: 'username',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'surname', sortable: true },
        { key: 'email', sortable: true },
        { key: 'username', sortable: true },
      ],
      items: []
    }
  },
  methods: {
    onFileChange(el) {
      console.log(el)
    },
    clearFiles () {

    },
    onSubmit () {
      console.log(this.datoteka)
      const formData = new FormData()
      formData.append('file', this.datoteka)
      axios.post('/import-students', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
          this.zeNalozeno = true
          this.items = response.data
        }).catch((err) => {

        })
      }
  }
}
</script>
