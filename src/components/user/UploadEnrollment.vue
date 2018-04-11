<template>
  <div>
          <b-form-group id="exampleInputGroup1"
            label="Uvozi podatke o vpisih"
            label-for="exampleInput1">
            <form method="POST" action="import-students" enctype="multipart/form-data">
<input type="file" name="fileName1"><br><br>
<input type="submit" value="Submit">
</form>
    <b-form-file :change="onFileChange(el)" id="uvozVpis" accept="*.txt" v-model="datoteka" :state="Boolean(datoteka)" placeholder="Choose a file..."></b-form-file>
     <div class="mt-3">Selected file: {{datoteka && datoteka.name}}</div>
    <b-button type="submit" variant="primary" @click.prevent="onSubmit(dat)">Naloži</b-button>
    </b-form-group>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datoteka: null
    }
  },
  methods: {
    onFileChange(el) {
      console.log(el)
    },
    clearFiles () {

    },
    onSubmit (dat) {
      axios.post('/import-students', this.datoteka, {
      headers: {
        'Content-Type': 'multipart/form-data'
        }
      }).then((data) => {
          console.log(data)
        }).catch((err) => {

        })
      }
  }
}
</script>
