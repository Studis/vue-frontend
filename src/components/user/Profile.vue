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
  data() {
    return {
      userid: '',
      student: {
        vpisna_stevilka: '6318022',
        ime_priimek: 'Bob Klobasa',
        naslov_sb: 'Večna Pot 113',
        naslov_pp: 'Večna Pot 113',
        tel_st: '031 255 011',
        email: 'bb0001@student.uni-lj.si',
        polja: [
          { key: 'študijsko_leto' },
          { key: 'letnik' },
          { key: 'študijski_program' },
          { key: 'vrsta_vpisa' },
          { key: 'način_študija'}
        ],
        vpisi: [
          { študijsko_leto: '2016/2017', letnik: '1', študijski_program: '', vrsta_vpisa: "Prvi vpis v letnik/dodatno leto", način_študija: "redni" },
          { študijsko_leto: '2017/2018', letnik: '2', študijski_program: 'Računalništvo in informatika UN-I. ST', vrsta_vpisa: "Prvi vpis v letnik/dodatno leto", način_študija: "redni" },
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
      axios.get(`students/${this.userid}`).then((response) => {
        this.student.vpisna_stevilka = response.data.enrollmentNumber
        this.student.ime_priimek = response.data.name + ' ' + response.data.surname
        this.student.email = response.data.eMail;
        this.student.naslov_sb = response.data.permanent;
        this.student.naslov_pp = response.data.temporary;
        this.student.tel_st = response.data.phoneNumber;
        axios.get(`students/${this.userid}/enrollments`).then((response) => {
          this.student.vpisi = response.data.map(x => {
            return {
              študijski_program: x.semester1.program.title,
              letnik: Math.floor(x.semester1.number/2),
              vrsta_vpisa: x.type.name,
              način_študija: 'na daljavo',
              študijsko_leto: x.semester1.year.toString
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
