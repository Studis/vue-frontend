<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <h3>Osebni podatki študenta</h3>
      <b-form-group label="Vpisna številka:">
        <b-form-input v-bind:placeholder="student.vpisna_stevilka"
                      id="exampleInput1"
                      type="number"
                      disabled>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Ime in priimek:"
                    label-for="exampleInput2">
        <b-form-input v-bind:placeholder="student.ime_priimek"
                      id="exampleInput2"
                      type="text"
                      disabled>
        </b-form-input>
        
      </b-form-group>
      <b-form-group label="Naslov stalnega bivališča:"
                    label-for="exampleInput2">
        <b-form-input v-bind:placeholder="student.naslov_sb"
                      id="exampleInput2"
                      type="text"
                      disabled>
        </b-form-input>
        
      </b-form-group>
      <b-form-group label="Naslov za prejemanje pošte:"
                    label-for="exampleInput2">
        <b-form-input v-bind:placeholder="student.naslov_pp"
                      id="exampleInput2"
                      type="text"
                      disabled>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Telefonska številka:"
                    label-for="exampleInput2">
        <b-form-input v-bind:placeholder="student.tel_st"
                      id="exampleInput2"
                      type="number"
                      disabled>
        </b-form-input>
        
      </b-form-group>
      <b-form-group label="Elektronska pošta:"
                    label-for="exampleInput2">
        <b-form-input v-bind:placeholder="student.email"
                      id="exampleInput2"
                      type="number"
                      disabled>
        </b-form-input>
        
      </b-form-group>
      <h3>Podatki o vseh vpisih</h3>
      <b-table stacked="md"
            :items="student.vpisi"
            :fields="student.polja">
      </b-table>
      <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
    </b-form>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

export default {
  name: 'forgotPassword',
  components: {
  },
  props: ['id'],
  data() {
    return {
      userid: '',
      student: {
        vpisna_stevilka: '',
        ime_priimek: '',
        naslov_sb: '',
        naslov_pp: '',
        tel_st: '',
        email: '',
        polja: [
          { key: 'študijsko_leto', label: 'Študijsko leto' },
          { key: 'letnik' },
          { key: 'študijski_program', label: 'Študijski program' },
          { key: 'vrsta_vpisa', label: 'Vrsta vpisa' },
          { key: 'način_študija', label: 'Način študija' }
        ],
        vpisi: [
          { študijsko_leto: '', letnik: '', študijski_program: '', vrsta_vpisa: "", način_študija: "" },
          { študijsko_leto: '', letnik: '', študijski_program: '', vrsta_vpisa: "", način_študija: "" },
        ],
      }
    }
  },
  methods: {
    onSubmit() {
    this.$router.push({name: 'login'});
    },
    goBack() {
      this.$router.push({name: 'login'});
    },
    onReset() {
    },
    goHome() {
      this.$router.push({name: 'home'});
    },
    goIndex() {
      this.$router.push({name: 'index', params: {id: this.userid}});
    },
    saveProfile() {
      // this.$snotify.async('Saved', 'saved', () => new Promise((resolve, reject) =>
      //   resolve({
      //     config: {
      //       closeOnClick: true,
      //       timeout: 2000,
      //     },
      //   })
      // ));
    },
  },
  mounted () {
    axios.get(`students/me`).then((response) => {
      this.userid = response.data.id;
      if (this.$route.params.id) this.userid = this.$route.params.id
      axios.get(`students/${this.userid}`).then((response) => {
        this.student.vpisna_stevilka = response.data.enrollmentNumber
        this.student.ime_priimek = response.data.name + ' ' + response.data.surname
        this.student.email = response.data.eMail;
        this.student.naslov_sb = response.data.permanent.placeOfResidence + ', ' + response.data.permanent.postalNumber + ' ' + response.data.permanent.municipality.name;
        this.student.naslov_pp = response.data.temporary.placeOfResidence + ', ' + response.data.temporary.postalNumber + ' ' + response.data.temporary.municipality.name;
        this.student.tel_st = response.data.phoneNumber;
        this.student.email = response.data.universityEmail;

        axios.get(`students/${this.userid}/enrollments`).then((response) => {
          this.student.vpisi = response.data.map(x => {
            console.log(x.curriculum.year.toString)
            return {
              študijski_program: x.curriculum.program.id + " - " + x.curriculum.program.title,
              letnik: x.curriculum.studyYear.id,
              vrsta_vpisa: x.type.id + " - " + x.type.name,
              način_študija: x.studyType.id + " - " + x.studyType.name,
              študijsko_leto: x.curriculum.year.toString
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
  #logintext {
    padding: 0.3em;
  }
  .backBtn {
    position: absolute;
    left: 0;
    box-sizing: border-box;
  }
  .forgotBtn {
    position: absolute;
    right: 0;
    box-sizing: border-box;
  }
</style>
