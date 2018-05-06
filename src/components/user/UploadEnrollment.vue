<template>
  <div>
    <h3>Students import</h3>
    <br>
    <b-form-group id="exampleInputGroup1"
      label="Import"
      label-for="exampleInput1">
      <b-form-file id="uvozVpis" accept="*.txt" v-model="datoteka" :state="Boolean(datoteka)" placeholder="Choose file..."></b-form-file>
    </b-form-group>
    <br>
    <b-button type="submit" variant="primary" @click.prevent="onSubmit()">Upload</b-button>
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
      <results v-if="zeNalozeno"
        title="Imported students"
        :indexes="true"
        :content="lala"
        :details="details"
        entityName="student">
      </results>
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
      lala: {content:[], fieldNames: null}
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
    content:{
      handler: function(newValue, old){
        console.log("Upload enrollment content changed")
        //this.content = newValue
        this.$set(this.content, "content", newValue.content)
        this.$set(this.content, "fieldNames", null)
        this.zeNalozeno = true
        
      },
      deep: true
    }
  },
  methods: {
    onFileChange(el) {
      //console.log(el)
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
        //this.items = response.data
        
        console.log(response.data)
        this.$set(this.lala, "content", response.data)
        this.$set(this.lala, "fieldNames", null)
        /*this.content = {
          content: response.data, 
          fieldNames: null
        }*/
        //this.$forceUpdate();
        //this.content = {content: [{"ime": "test"}], fieldNames: null};
      }).catch((err) => {

      })
    }
  }
}
</script>