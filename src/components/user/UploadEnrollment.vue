<template>
  <div>
    <h3>Students import</h3>
    {{content}}
    <br>
    <b-form-group id="exampleInputGroup1"
      label="Import"
      label-for="exampleInput1">
      <b-form-file id="uvozVpis" accept="*.txt" v-model="datoteka" :state="Boolean(datoteka)" placeholder="Choose file..."></b-form-file>
    </b-form-group>
    <br>
    <b-button type="submit" variant="primary" @click.prevent="submitUpload">Upload</b-button>
    <br><br>
    <div>
    <!-- 
      <b-table stacked="md"
             :items="items"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered">
              <template slot="index" slot-scope="data">
                {{data.index + 1}}
              </template>
    </b-table>-->
    <div v-show="zeNalozeno">
      <results
        title="Imported students"
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
      details: [],
      /*sortBy: 'name',
      filter: null,
      sortDesc: false,
      sortDesc: false,
      fields: [
        { key: 'index', sortable: true, label: 'Zaporedje'},
        { key: 'name', sortable: true },
        { key: 'surname', sortable: true },
        { key: 'email', sortable: true },
        { key: 'username', sortable: true },
      ],
      items: []*/
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
        //this.items = response.data
        
        console.log(response.data)
    
        this.content = Object.assign({}, this.content,{ content: response.data, fieldNames: null })
        this.zeNalozeno = true

    
      }).catch((err) => {

      })
    }
  }
}
</script>