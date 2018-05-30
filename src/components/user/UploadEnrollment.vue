<template>
  <div>
    <h3>Uvoz študentov</h3>
    <br>
    <b-form-group id="exampleInputGroup1"
      label-for="exampleInput1">
      <b-form-file id="uvozVpis" accept="*.txt" v-model="datoteka" :state="Boolean(datoteka)" placeholder="Izberite datoteko..."></b-form-file>
    </b-form-group>
    <br>
    <b-button type="submit" variant="primary" @click.prevent="submitUpload">Naloži</b-button>
    <br><br>
    <div>
    <div v-show="zeNalozeno">
      <results
        title="Uvoženi študenti"
        :indexes="true"
        :content="content"
        :details="details"
        entityName="student">
      </results>
    </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Results from '../Results.vue'
export default {
  components: {
    'results': Results
  },
  data () {
    return {
      datoteka: null,
      zeNalozeno: false,
      content: {content:[], fieldNames: null},
      details: []
    }
  },
  watch: {
  },
  methods: {
    onFileChange(el) {
      //console.log(el)
    },
    clearFiles () {

    },
    submitUpload () {
      console.log(this.datoteka)
      const formData = new FormData()
      formData.append('file', this.datoteka)
      axios.post('/import-students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.data)
    
        this.content = Object.assign({}, this.content,{ content: response.data, fieldNames: null })
        this.zeNalozeno = true

    
      }).catch((err) => {

      })
    }
  }
}
</script>