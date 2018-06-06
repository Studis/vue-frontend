<template>
<div>
  <b-form v-on:submit.prevent="checkForm" @reset="onReset" v-if="true" @submit="onSubmit">
    <h3>VPISNI LIST {{(new Date()).getFullYear()}}/{{(new Date()).getFullYear()+1}} za študente</h3>
    <h4>Fakulteta za računalništvo in informatiko</h4>
    <div>
      <img src="https://petra-education.eu/wp-content/uploads/sites/29/2016/07/111.png" class="img-thumbnail">
    </div>
 
    <div v-if="errors.length">
      <div class="alert alert-danger">Med vnašanjem podatkov je prišlo do naslednjih napak:
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>

    <h3>OSEBNI PODATKI</h3>
    <br>

    <b-row class="my-1">
      <b-col sm="2"><label>Vpisna številka: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.vpisnaStevilka" :state="null" type="text" disabled required/>
      </b-col>
      <b-col sm="2"><label>Ime: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.ime" :state="null" type="text" ref="errmsg" required/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Priimek: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.priimek" :state="null" type="text" required/>
      </b-col>
      <b-col sm="2"><label>Datum rojstva: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="izracunajDatumRojstva" :state="null" type="date" disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Kraj rojstva: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.krajRojstva" :state="null" type="text" required/>
      </b-col>
      <b-col sm="2"><label>Država: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.drzava" :options="countries" :state="null" type="text" required/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Občina: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.regija" :options="posts" :state="null" type="text" :disabled=isDisabled1 />
      </b-col>
      <b-col sm="2"><label>Spol: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="izracunajSpol" :options="['Moški', 'Ženska']" :state="null" type="text" disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>EMŠO: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.emso" :options="countries" :state="null" type="text" pattern="\d*" required maxlength="13"/>
      </b-col>
      <b-col sm="2"><label>Davčna številka: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.davcnaStevilka" type="text" pattern="\d*" maxlength="8" required :state="null"/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Elektronski naslov: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.elektronskiNaslov" :options="countries" :state="null" type="email" required/>
      </b-col>
      <b-col sm="2"><label>Telefonska številka: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.telefonskaStevilka" pattern="\d*" required :state="null"/>
      </b-col>
    </b-row>

    <br>
    <b-row class="my-1">
      <b-col sm="6"><h4>Stalno prebivališče</h4></b-col>
      <b-col sm="6"><h4>Začasno prebivališče</h4></b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Država: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.stalnoPrebivalisceDrzava" :options="countries" required/>
      </b-col>
      <b-col sm="2"><label>Država: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.zacasnoPrebivalisceDrzava" :options="countries"/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Občina: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.stalnoPrebivalisceObcina" :options="posts" type="text" :disabled=isDisabled2 />
      </b-col>

      <b-col sm="2"><label>Občina: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.zacasnoPrebivalisceObcina" :options="posts" type="text" :disabled=isDisabled3 />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Poštna številka: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.stalnoPrebivaliscePosta" :options="postNumbers" required :state="null"/>
      </b-col>
      <b-col sm="2"><label>Poštna številka: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.zacasnoPrebivaliscePosta" :options="postNumbers" :state="null"/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Naslov: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.stalnoPrebivalisceNaslov" :state="null" type="text" required/>
      </b-col>
      <b-col sm="2"><label>Naslov: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.zacasnoPrebivalisceNaslov" :state="null" type="text"/>
      </b-col>
    </b-row>
    
    <br>
    
    <b-row class="my-1">
      <b-col sm="2"><label>Naslov za vročanje: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.naslovZaVrocanje" :options="['Stalno prebivališče', 'Začasno prebivališče']" class="mb-3" required/>
      </b-col>
    </b-row>
    <br>

    <h3>PODATKI O VPISU</h3>
    <br>

    <b-row class="my-1">
      <b-col sm="2"><label>Študijski program: </label></b-col>
      <b-col sm="10">
        <b-form-select v-model="vpisniList.studijskiProgram" :options="courses" :state="null" type="text" required disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Vrsta študija: </label></b-col>
      <b-col sm="10">
        <b-form-select :value="getStudyType" :options="course_types" type="text" required disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Vrsta vpisa: </label></b-col>
      <b-col sm="10">
        <b-form-select v-model="vpisniList.vrstaVpisa" :options="enrollment_types" required disabled/>
      </b-col>
    </b-row>
  

    <b-row class="my-1">
      <b-col sm="2"><label>Kraj izvajanja: </label></b-col>
      <b-col sm="4">
        <b-form-input v-model="vpisniList.krajIzvajanja" placeholder="Ljubljana" type="text" disabled required/>
      </b-col>
      <b-col sm="2"><label>Izbirna skupina: </label></b-col>
      <b-col sm="4">
        <b-form-input disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Letnik študija: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.letnikStudija" :options="study_year" required disabled/>
      </b-col>
      <b-col sm="2"><label>Način študija: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.nacinStudija" :options="study_type" required disabled/>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2"><label>Oblika študija: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.oblikaStudija" :options="study_form" required disabled/>
      </b-col>
      <b-col sm="2"><label>Študijsko leto prvega vpisa v ta program: </label></b-col>
      <b-col sm="4">
        <b-form-select v-model="vpisniList.studijskoLetoPrvegaVpisaVTaProgram" :options="studyYears" required disabled/>
      </b-col>
    </b-row>
    <br>

    <h3>PODATKI O PREDMETIH</h3>
    <br>

    <b-row class="my-1">
      <b-col sm="8"><h5>Predmetnik</h5></b-col>
      <b-col sm="4" v-if="vpisniList.letnikStudija != 1"><h5>Splošni izbirni predmeti: </h5></b-col>
    </b-row>


    <b-row class="my-1">
      <b-col sm="8">
        <b-table :items="predmeti" :fields="polja"/>
        <div class="col-md-4">
            <b-button :variant="btnClass">
                Število kreditnih točk: {{ ects_sum }} / 60
            </b-button>
        </div>
      </b-col>
      <b-col sm="4" v-if="vpisniList.letnikStudija != 1">
        <multiselect @select="add" @remove="remove" v-model="value_splosni" :options="splosni" :multiple="true" :close-on-select=true :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name"  track-by="name"/>
        <h5 class="boi" v-if="vpisniList.letnikStudija != 1">Strokovni izbirni predmeti: </h5>
        <multiselect v-if="vpisniList.letnikStudija != 1" @select="add" @remove="remove" v-model="value_strokovni" :options="strokovni" :multiple="true" :close-on-select=true :clear-on-select="false" :hide-selected="true" :preserve-search="true" label="name"  track-by="name"/>
        <h5 class="boi"  v-if="vpisniList.letnikStudija == 3">Modulski izbirni predmeti</h5>
        <multiselect v-if="vpisniList.letnikStudija == 3" @select="add" @remove="remove" v-model="value_modulski" :options="modulski" :multiple="true" :close-on-select=true group-values="subjects" group-label="module_name" :group-select="true" track-by="name" label="name" />
      </b-col>
    </b-row>
    <br>

    <b-row class="my-1">
      <b-form-checkbox v-model="vpisniList.soglasjeKnjiz" type="checkbox" >
        Soglasje za koriščenje storitev knjižničnega sistema
      </b-form-checkbox>
    </b-row>

    <b-row class="my-1">
      <b-form-checkbox v-model="vpisniList.soglasjeObves" type="checkbox" >
        Soglasje za obveščanje o aktualnih študijskih zadevah ter za karierno svetovanje in za druge aktivnosti, povezane z zagotavljanjem kakovosti
      </b-form-checkbox>
    </b-row>
    <br>
    <b-row class="my-1 vanish">
      <b-col sm="4">
        <b-button onClick="window.print()" variant="warning">Natisni</b-button>
      </b-col>
      <b-col sm="4"></b-col>
      <b-col sm="4">
        <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
        <b-button type="submit" variant="success" style="margin-left: 1em">Potrdi</b-button>
      </b-col>
    </b-row>
  </b-form>
</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect'
import { Component, Vue } from 'vue-property-decorator';
export default {
  name: 'forgotPassword',
  components: {
    Multiselect,
  },
  data () {
    var studyYears = [];
    for(var year = 1990; year < 2019; year++) {
      studyYears.push(year + '/' + (year+1));
    } 
    return {
      predmeti: [],
      splosni: [],
      strokovni: [],
      modulski: [],
      polja: [
        { key: 'id', label: 'Šifra predmeta', sortable: true },
        { key: 'name', label: 'Ime predmeta', sortable: true },
        { key: 'lecturer', label: 'Izvajalec', sortable: true },
        { key: 'ects', label: 'ECTS', sortable: true },
      ],
      value_splosni: [],
      value_strokovni: [],
      value_modulski: [],
      ects_sum: null,
      ects_button: 'secondary',
      selectedCountry: '',
      selectedPost: '',
      countries: [
        { tag: 'AF',  value: 'Afganistan', text: 'Afganistan' },
        { tag: 'AX',  value: 'Alandski otoki', text: 'Alandski otoki' },
        { tag: 'AL',  value: 'Albanija', text: 'Albanija' },
        { tag: 'DZ',  value: 'Alžirija', text: 'Alžirija' },
        { tag: 'AS',  value: 'Ameriška Samoa', text: 'Ameriška Samoa' },
        { tag: 'AD',  value: 'Andora', text: 'Andora' },
        { tag: 'AO',  value: 'Angola', text: 'Angola' },
        { tag: 'AI',  value: 'Angvila', text: 'Angvila' },
        { tag: 'AQ',  value: 'Antarktika', text: 'Antarktika' },
        { tag: 'AG',  value: 'Antigva in Barbuda', text: 'Antigva in Barbuda' },
        { tag: 'AR',  value: 'Argenitna', text: 'Argenitna' },
        { tag: 'AM',  value: 'Armenija', text: 'Armenija' },
        { tag: 'AW',  value: 'Aruba', text: 'Aruba' },
        { tag: 'AU',  value: 'Avstralija', text: 'Avstralija' },
        { tag: 'AT',  value: 'Avstrija', text: 'Avstrija' },
        { tag: 'AZ',  value: 'Azerbajdžan', text: 'Azerbajdžan' },
        { tag: 'BS',  value: 'Bahami', text: 'Bahami' },
        { tag: 'BH',  value: 'Bahrajn', text: 'Bahrajn' },
        { tag: 'BD',  value: 'Bangladeš', text: 'Bangladeš' },
        { tag: 'BB',  value: 'Barbados', text: 'Barbados' },
        { tag: 'BY',  value: 'Belorusija', text: 'Belorusija' },
        { tag: 'BE',  value: 'Belgija', text: 'Belgija' },
        { tag: 'BZ',  value: 'Belize', text: 'Belize' },
        { tag: 'BJ',  value: 'Benin', text: 'Benin' },
        { tag: 'BM',  value: 'Bermudi', text: 'Bermudi' },
        { tag: 'BT',  value: 'Butan', text: 'Butan' },
        { tag: 'BO',  value: 'Bolivija', text: 'Bolivija' },
        { tag: 'BQ',  value: 'Otočje Bonaire, Sv. Eustatij in Saba', text: 'Otočje Bonaire, Sv. Eustatij in Saba' },
        { tag: 'BA',  value: 'Bosna in Hercegovina', text: 'Bosna in Hercegovina' },
        { tag: 'BW',  value: 'Bocvana', text: 'Bocvana' },
        { tag: 'BV',  value: 'Bouvetov otok', text: 'Bouvetov otok' },
        { tag: 'BR',  value: 'Brazilija', text: 'Brazilija' },
        { tag: 'IO',  value: 'Britansko ozemlje v Indijskem oceanu', text: 'Britansko ozemlje v Indijskem oceanu' },
        { tag: 'BN',  value: 'Brunej', text: 'Brunej' },
        { tag: 'BG',  value: 'Bolgarija', text: 'Bolgarija' },
        { tag: 'BF',  value: 'Burkina Faso', text: 'Burkina Faso' },
        { tag: 'BI',  value: 'Burundi ', text: 'Burundi ' },
        { tag: 'KH',  value: 'Kambodža', text: 'Kambodža' },
        { tag: 'CM',  value: 'Kamerun', text: 'Kamerun' },
        { tag: 'CA',  value: 'Kanada', text: 'Kanada' },
        { tag: 'CV',  value: 'Kapverdski otoki (Zelenortski otoki)', text: 'Kapverdski otoki (Zelenortski otoki)' },
        { tag: 'KY',  value: 'Kajmanski otoki', text: 'Kajmanski otoki' },
        { tag: 'CF',  value: 'Srednjeafriška republika', text: 'Srednjeafriška republika' },
        { tag: 'TD',  value: 'Čad', text: 'Čad' },
        { tag: 'CL',  value: 'Čile', text: 'Čile' },
        { tag: 'CN',  value: 'Kitajska', text: 'Kitajska' },
        { tag: 'CX',  value: 'Božični otok', text: 'Božični otok' },
        { tag: 'CC',  value: 'Kokosovi in Keelingovi otoki', text: 'Kokosovi in Keelingovi otoki' },
        { tag: 'CO',  value: 'Kolumbija', text: 'Kolumbija' },
        { tag: 'KM',  value: 'Komori', text: 'Komori' },
        { tag: 'CG',  value: 'Kongo', text: 'Kongo' },
        { tag: 'CD',  value: 'Demokratična republika Kongo', text: 'Demokratična republika Kongo' },
        { tag: 'CK',  value: 'Cookovi otoki', text: 'Cookovi otoki' },
        { tag: 'CR',  value: 'Kostarika', text: 'Kostarika' },
        { tag: 'CI',  value: 'Slonokoščena obala', text: 'Slonokoščena obala' },
        { tag: 'HR',  value: 'Hrvaška', text: 'Hrvaška' },
        { tag: 'CU',  value: 'Kuba', text: 'Kuba' },
        { tag: 'CW',  value: 'Kurasao', text: 'Kurasao' },
        { tag: 'CY',  value: 'Ciper', text: 'Ciper' },
        { tag: 'CZ',  value: 'Češka', text: 'Češka' },
        { tag: 'DK',  value: 'Danska', text: 'Danska' },
        { tag: 'DJ',  value: 'Džibuti', text: 'Džibuti' },
        { tag: 'DM',  value: 'Dominika', text: 'Dominika' },
        { tag: 'DO',  value: 'Dominikanska republika', text: 'Dominikanska republika' },
        { tag: 'EC',  value: 'Ekvador', text: 'Ekvador' },
        { tag: 'EG',  value: 'Egipt', text: 'Egipt' },
        { tag: 'SV',  value: 'Salvador', text: 'Salvador' },
        { tag: 'GQ',  value: 'Ekvatorialna Gvineja', text: 'Ekvatorialna Gvineja' },
        { tag: 'ER',  value: 'Eritreja', text: 'Eritreja' },
        { tag: 'EE',  value: 'Estonija', text: 'Estonija' },
        { tag: 'ET',  value: 'Etiopija', text: 'Etiopija' },
        { tag: 'FK',  value: 'Falkalndski otoki', text: 'Falkalndski otoki' },
        { tag: 'FO',  value: 'Ferski otoki', text: 'Ferski otoki' },
        { tag: 'FJ',  value: 'Fidži', text: 'Fidži' },
        { tag: 'FI',  value: 'Finska', text: 'Finska' },
        { tag: 'FR',  value: 'Francija', text: 'Francija' },
        { tag: 'GF',  value: 'Francoska Gvajana', text: 'Francoska Gvajana' },
        { tag: 'PF',  value: 'Francoska Polinezija', text: 'Francoska Polinezija' },
        { tag: 'TF',  value: 'Francoska južna ozemlja', text: 'Francoska južna ozemlja' },
        { tag: 'GA',  value: 'Gabon', text: 'Gabon' },
        { tag: 'GM',  value: 'Gambija', text: 'Gambija' },
        { tag: 'GE',  value: 'Gruzija', text: 'Gruzija' },
        { tag: 'DE',  value: 'Nemčija', text: 'Nemčija' },
        { tag: 'GH',  value: 'Gana', text: 'Gana' },
        { tag: 'GI',  value: 'Gibraltar', text: 'Gibraltar' },
        { tag: 'GR',  value: 'Grčija', text: 'Grčija' },
        { tag: 'GL',  value: 'Grenlandija', text: 'Grenlandija' },
        { tag: 'GD',  value: 'Grenada', text: 'Grenada' },
        { tag: 'GP',  value: 'Guadeloupe', text: 'Guadeloupe' },
        { tag: 'GU',  value: 'Guam', text: 'Guam' },
        { tag: 'GT',  value: 'Gvatemala', text: 'Gvatemala' },
        { tag: 'GG',  value: 'Otok Guernsey', text: 'Otok Guernsey' },
        { tag: 'GN',  value: 'Gvineja', text: 'Gvineja' },
        { tag: 'GW',  value: 'Gvineja-Bissau', text: 'Gvineja-Bissau' },
        { tag: 'GY',  value: 'Gvajana', text: 'Gvajana' },
        { tag: 'HT',  value: 'Haiti', text: 'Haiti' },
        { tag: 'HM',  value: 'Otok Heard in otočje McDonald', text: 'Otok Heard in otočje McDonald' },
        { tag: 'VA',  value: 'Vatikan', text: 'Vatikan' },
        { tag: 'HN',  value: 'Honduras', text: 'Honduras' },
        { tag: 'HK',  value: 'Hong Kong', text: 'Hong Kong' },
        { tag: 'HU',  value: 'Madžarska', text: 'Madžarska' },
        { tag: 'IS',  value: 'Islandija', text: 'Islandija' },
        { tag: 'IN',  value: 'Indija', text: 'Indija' },
        { tag: 'ID',  value: 'Indonezija', text: 'Indonezija' },
        { tag: 'IR',  value: 'Iran', text: 'Iran' },
        { tag: 'IQ',  value: 'Irak', text: 'Irak' },
        { tag: 'IE',  value: 'Irska', text: 'Irska' },
        { tag: 'IM',  value: 'Otok Man', text: 'Otok Man' },
        { tag: 'IL',  value: 'Izrael', text: 'Izrael' },
        { tag: 'IT',  value: 'Italija', text: 'Italija' },
        { tag: 'JM',  value: 'Jamajka', text: 'Jamajka' },
        { tag: 'JP',  value: 'Japonska', text: 'Japonska' },
        { tag: 'JE',  value: 'Otok Jersey', text: 'Otok Jersey' },
        { tag: 'JO',  value: 'Jordanija', text: 'Jordanija' },
        { tag: 'KZ',  value: 'Kazahstan', text: 'Kazahstan' },
        { tag: 'KE',  value: 'Kenija', text: 'Kenija' },
        { tag: 'KI',  value: 'Kiribati', text: 'Kiribati' },
        { tag: 'KP',  value: 'Severna Koreja', text: 'Severna Koreja' },
        { tag: 'KR',  value: 'Južna Koreja', text: 'Južna Koreja' },
        { tag: 'KW',  value: 'Kuvajt', text: 'Kuvajt' },
        { tag: 'KG',  value: 'Kirgizistan (Kirgizija)', text: 'Kirgizistan (Kirgizija)' },
        { tag: 'LA',  value: 'Laos', text: 'Laos' },
        { tag: 'LV',  value: 'Latvija', text: 'Latvija' },
        { tag: 'LB',  value: 'Libanon', text: 'Libanon' },
        { tag: 'LS',  value: 'Lesoto', text: 'Lesoto' },
        { tag: 'LR',  value: 'Liberija', text: 'Liberija' },
        { tag: 'LY',  value: 'Libija', text: 'Libija' },
        { tag: 'LI',  value: 'Lihtenštajn', text: 'Lihtenštajn' },
        { tag: 'LT',  value: 'Litva', text: 'Litva' },
        { tag: 'LU',  value: 'Luksemburg', text: 'Luksemburg' },
        { tag: 'MO',  value: 'Makao', text: 'Makao' },
        { tag: 'MK',  value: 'Makedonija', text: 'Makedonija' },
        { tag: 'MG',  value: 'Madagaskar', text: 'Madagaskar' },
        { tag: 'MW',  value: 'Malavi', text: 'Malavi' },
        { tag: 'MY',  value: 'Malezija', text: 'Malezija' },
        { tag: 'MV',  value: 'Maldivi', text: 'Maldivi' },
        { tag: 'ML',  value: 'Mali', text: 'Mali' },
        { tag: 'MT',  value: 'Malta', text: 'Malta' },
        { tag: 'MH',  value: 'Maršalovi otoki', text: 'Maršalovi otoki' },
        { tag: 'MQ',  value: 'Martinik', text: 'Martinik' },
        { tag: 'MR',  value: 'Mavretanija', text: 'Mavretanija' },
        { tag: 'MU',  value: 'Mauricius (Moris)', text: 'Mauricius (Moris)' },
        { tag: 'YT',  value: 'Francoska skupnost Mejot', text: 'Francoska skupnost Mejot' },
        { tag: 'MX',  value: 'Mehika', text: 'Mehika' },
        { tag: 'FM',  value: 'Mikronezija', text: 'Mikronezija' },
        { tag: 'MD',  value: 'Moldavija', text: 'Moldavija' },
        { tag: 'MC',  value: 'Monako', text: 'Monako' },
        { tag: 'MN',  value: 'Mongolija', text: 'Mongolija' },
        { tag: 'ME',  value: 'Črna Gora', text: 'Črna Gora' },
        { tag: 'MS',  value: 'Montserat', text: 'Montserat' },
        { tag: 'MA',  value: 'Maroko', text: 'Maroko' },
        { tag: 'MZ',  value: 'Mozambik', text: 'Mozambik' },
        { tag: 'MM',  value: 'Mjanmar', text: 'Mjanmar' },
        { tag: 'NA',  value: 'Namibija', text: 'Namibija' },
        { tag: 'NR',  value: 'Nauru', text: 'Nauru' },
        { tag: 'NP',  value: 'Nepal', text: 'Nepal' },
        { tag: 'NL',  value: 'Nizozemska', text: 'Nizozemska' },
        { tag: 'NC',  value: 'Nova Kaledonija', text: 'Nova Kaledonija' },
        { tag: 'NZ',  value: 'Nova Zelandija', text: 'Nova Zelandija' },
        { tag: 'NI',  value: 'Nikaragva', text: 'Nikaragva' },
        { tag: 'NE',  value: 'Niger ', text: 'Niger ' },
        { tag: 'NG',  value: 'Nigerija', text: 'Nigerija' },
        { tag: 'NU',  value: 'Niu', text: 'Niu' },
        { tag: 'NF',  value: 'Otok Norflok', text: 'Otok Norflok' },
        { tag: 'MP',  value: 'Severni Marianski otoki', text: 'Severni Marianski otoki' },
        { tag: 'NO',  value: 'Norveška', text: 'Norveška' },
        { tag: 'OM',  value: 'Oman', text: 'Oman' },
        { tag: 'PK',  value: 'Pakistan', text: 'Pakistan' },
        { tag: 'PW',  value: 'Palau ', text: 'Palau ' },
        { tag: 'PS',  value: 'Palestina', text: 'Palestina' },
        { tag: 'PA',  value: 'Panama', text: 'Panama' },
        { tag: 'PG',  value: 'Papua Nova Gvineja', text: 'Papua Nova Gvineja' },
        { tag: 'PY',  value: 'Paragvaj', text: 'Paragvaj' },
        { tag: 'PE',  value: 'Peru', text: 'Peru' },
        { tag: 'PH',  value: 'Filipini', text: 'Filipini' },
        { tag: 'PN',  value: 'Pitcairnovi otoki', text: 'Pitcairnovi otoki' },
        { tag: 'PL',  value: 'Poljska', text: 'Poljska' },
        { tag: 'PT',  value: 'Portugalska', text: 'Portugalska' },
        { tag: 'PR',  value: 'Portoriko', text: 'Portoriko' },
        { tag: 'QA',  value: 'Katar', text: 'Katar' },
        { tag: 'RE',  value: 'Francoska skupnost Reunion', text: 'Francoska skupnost Reunion' },
        { tag: 'RO',  value: 'Romunija', text: 'Romunija' },
        { tag: 'RU',  value: 'Ruska federacija', text: 'Ruska federacija' },
        { tag: 'RW',  value: 'Ruanda', text: 'Ruanda' },
        { tag: 'BL',  value: 'Sveti Bartolomej', text: 'Sveti Bartolomej' },
        { tag: 'SH',  value: 'Sveta Helena', text: 'Sveta Helena' },
        { tag: 'KN',  value: 'Sveti Kits in Nevis', text: 'Sveti Kits in Nevis' },
        { tag: 'LC',  value: 'Sveta Lucija', text: 'Sveta Lucija' },
        { tag: 'MF',  value: 'Otok svetega Martina', text: 'Otok svetega Martina' },
        { tag: 'PM',  value: 'Sveta Pierre in Miquelon', text: 'Sveta Pierre in Miquelon' },
        { tag: 'VC',  value: 'Sveti Vincent in Grenadini', text: 'Sveti Vincent in Grenadini' },
        { tag: 'WS',  value: 'Samoa', text: 'Samoa' },
        { tag: 'SM',  value: 'San Marino', text: 'San Marino' },
        { tag: 'ST',  value: 'Sao Tome in Principe', text: 'Sao Tome in Principe' },
        { tag: 'SA',  value: 'Savdska Arabija', text: 'Savdska Arabija' },
        { tag: 'SN',  value: 'Senegal', text: 'Senegal' },
        { tag: 'RS',  value: 'Srbija', text: 'Srbija' },
        { tag: 'SC',  value: 'Sejšeli', text: 'Sejšeli' },
        { tag: 'SL',  value: 'Siera Leone', text: 'Siera Leone' },
        { tag: 'SG',  value: 'Singapur', text: 'Singapur' },
        { tag: 'SX',  value: 'Otok svetega.Martina (Nizozemska)', text: 'Otok svetega.Martina (Nizozemska)' },
        { tag: 'SK',  value: 'Slovaška', text: 'Slovaška' },
        { tag: 'SI',  value: 'Slovenija', text: 'Slovenija' },
        { tag: 'SB',  value: 'Solomonovi otoki', text: 'Solomonovi otoki' },
        { tag: 'SO',  value: 'Somalija', text: 'Somalija' },
        { tag: 'ZA',  value: 'Južna afrika', text: 'Južna afrika' },
        { tag: 'GS',  value: 'Južna Georgia in Južni Sandwichevi otoki', text: 'Južna Georgia in Južni Sandwichevi otoki' },
        { tag: 'SS',  value: 'Južni Sudan', text: 'Južni Sudan' },
        { tag: 'ES',  value: 'Španija', text: 'Španija' },
        { tag: 'LK',  value: 'Šri Lanka', text: 'Šri Lanka' },
        { tag: 'SD',  value: 'Sudan', text: 'Sudan' },
        { tag: 'SR',  value: 'Surinam', text: 'Surinam' },
        { tag: 'SJ',  value: 'Svalbard in Jan Majen ', text: 'Svalbard in Jan Majen ' },
        { tag: 'SZ',  value: 'Svazi', text: 'Svazi' },
        { tag: 'SE',  value: 'Švedska', text: 'Švedska' },
        { tag: 'CH',  value: 'Švica', text: 'Švica' },
        { tag: 'SY',  value: 'Sirija', text: 'Sirija' },
        { tag: 'TW',  value: 'Tajvan', text: 'Tajvan' },
        { tag: 'TJ',  value: 'Tadžikistan', text: 'Tadžikistan' },
        { tag: 'TZ',  value: 'Tanzanija', text: 'Tanzanija' },
        { tag: 'TH',  value: 'Tajska', text: 'Tajska' },
        { tag: 'TL',  value: 'Vzhodni Timor', text: 'Vzhodni Timor' },
        { tag: 'TG',  value: 'Togo', text: 'Togo' },
        { tag: 'TK',  value: 'Tokelau', text: 'Tokelau' },
        { tag: 'TO',  value: 'Tonga', text: 'Tonga' },
        { tag: 'TT',  value: 'Trinidad in Tobago', text: 'Trinidad in Tobago' },
        { tag: 'TN',  value: 'Tunizija', text: 'Tunizija' },
        { tag: 'TR',  value: 'Turčija', text: 'Turčija' },
        { tag: 'TM',  value: 'Turkmenistan', text: 'Turkmenistan' },
        { tag: 'TC',  value: 'Tirški in Kajkoški otoki', text: 'Tirški in Kajkoški otoki' },
        { tag: 'TV',  value: 'Tuvalu', text: 'Tuvalu' },
        { tag: 'UG',  value: 'Uganda', text: 'Uganda' },
        { tag: 'UA',  value: 'Ukrajina', text: 'Ukrajina' },
        { tag: 'AE',  value: 'Združeni Arabski Emirati', text: 'Združeni Arabski Emirati' },
        { tag: 'GB',  value: 'Velika Britanija', text: 'Velika Britanija' },
        { tag: 'US',  value: 'Združene države Amerike', text: 'Združene države Amerike' },
        { tag: 'UM',  value: 'ZDA zunanji otoki', text: 'ZDA zunanji otoki' },
        { tag: 'UY',  value: 'Urugvaj', text: 'Urugvaj' },
        { tag: 'UZ',  value: 'Uzbekistan', text: 'Uzbekistan' },
        { tag: 'VU',  value: 'Republika Vanuatu', text: 'Republika Vanuatu' },
        { tag: 'VE',  value: 'Venezuela', text: 'Venezuela' },
        { tag: 'VN',  value: 'Vietnam', text: 'Vietnam' },
        { tag: 'VG',  value: 'Britanski Deviški otoki', text: 'Britanski Deviški otoki' },
        { tag: 'VI',  value: 'Ameriški Deviški otoki', text: 'Ameriški Deviški otoki' },
        { tag: 'WF',  value: 'Otočje Valis in Futuna', text: 'Otočje Valis in Futuna' },
        { tag: 'EH',  value: 'Zahodna Sahara', text: 'Zahodna Sahara' },
        { tag: 'YE',  value: 'Jemen', text: 'Jemen' },
        { tag: 'ZM',  value: 'Zambija', text: 'Zambija' },
        { tag: 'ZW',  value: 'Zimbabve', text: 'Zimbabve' },
      ],
      posts: [
      { value: 'Ankaran', text: 'Ankaran' },
      { value: 'Ajdovščina ', text: 'Ajdovščina ' },
      { value: 'Apače ', text: 'Apače ' },
      { value: 'Beltinci ', text: 'Beltinci ' },
      { value: 'Benedikt ', text: 'Benedikt ' },
      { value: 'Bistrica ob Sotli ', text: 'Bistrica ob Sotli ' },
      { value: 'Bled ', text: 'Bled ' },
      { value: 'Bloke ', text: 'Bloke ' },
      { value: 'Bohinj ', text: 'Bohinj ' },
      { value: 'Borovnica ', text: 'Borovnica ' },
      { value: 'Bovec ', text: 'Bovec ' },
      { value: 'Braslovče ', text: 'Braslovče ' },
      { value: 'Brda ', text: 'Brda ' },
      { value: 'Brezovica ', text: 'Brezovica ' },
      { value: 'Brežice ', text: 'Brežice ' },
      { value: 'Cankova ', text: 'Cankova ' },
      { value: 'Celje ', text: 'Celje ' },
      { value: 'Cerklje na Gorenjskem ', text: 'Cerklje na Gorenjskem ' },
      { value: 'Cerknica ', text: 'Cerknica ' },
      { value: 'Cerkno ', text: 'Cerkno ' },
      { value: 'Cerkvenjak ', text: 'Cerkvenjak ' },
      { value: 'Cirkulane ', text: 'Cirkulane ' },
      { value: 'Črenšovci ', text: 'Črenšovci ' },
      { value: 'Črna na Koroškem ', text: 'Črna na Koroškem ' },
      { value: 'Črnomelj ', text: 'Črnomelj ' },
      { value: 'Destrnik ', text: 'Destrnik ' },
      { value: 'Divača ', text: 'Divača ' },
      { value: 'Dobje ', text: 'Dobje ' },
      { value: 'Dobrepolje ', text: 'Dobrepolje ' },
      { value: 'Dobrna ', text: 'Dobrna ' },
      { value: 'Dobrova - Polhov Gradec ', text: 'Dobrova - Polhov Gradec ' },
      { value: 'Dobrovnik ', text: 'Dobrovnik ' },
      { value: 'Dol pri Ljubljani ', text: 'Dol pri Ljubljani ' },
      { value: 'Dolenjske Toplice ', text: 'Dolenjske Toplice ' },
      { value: 'Domžale ', text: 'Domžale ' },
      { value: 'Dornava ', text: 'Dornava ' },
      { value: 'Dravograd ', text: 'Dravograd ' },
      { value: 'Duplek ', text: 'Duplek ' },
      { value: 'Gorenja vas - Poljane ', text: 'Gorenja vas - Poljane ' },
      { value: 'Gorišnica ', text: 'Gorišnica ' },
      { value: 'Gorje ', text: 'Gorje ' },
      { value: 'Gornja Radgona ', text: 'Gornja Radgona ' },
      { value: 'Gornji Grad ', text: 'Gornji Grad ' },
      { value: 'Gornji Petrovci ', text: 'Gornji Petrovci ' },
      { value: 'Grad ', text: 'Grad ' },
      { value: 'Grosuplje ', text: 'Grosuplje ' },
      { value: 'Hajdina ', text: 'Hajdina ' },
      { value: 'Hoče - Slivnica ', text: 'Hoče - Slivnica ' },
      { value: 'Hodoš ', text: 'Hodoš ' },
      { value: 'Horjul ', text: 'Horjul ' },
      { value: 'Hrastnik ', text: 'Hrastnik ' },
      { value: 'Hrpelje - Kozina ', text: 'Hrpelje - Kozina ' },
      { value: 'Idrija ', text: 'Idrija ' },
      { value: 'Ig ', text: 'Ig ' },
      { value: 'Ilirska Bistrica ', text: 'Ilirska Bistrica ' },
      { value: 'Ivančna Gorica ', text: 'Ivančna Gorica ' },
      { value: 'Izola ', text: 'Izola ' },
      { value: 'Jesenice ', text: 'Jesenice ' },
      { value: 'Jezersko ', text: 'Jezersko ' },
      { value: 'Juršinci ', text: 'Juršinci ' },
      { value: 'Kamnik ', text: 'Kamnik ' },
      { value: 'Kanal ', text: 'Kanal ' },
      { value: 'Kidričevo ', text: 'Kidričevo ' },
      { value: 'Kobarid ', text: 'Kobarid ' },
      { value: 'Kobilje ', text: 'Kobilje ' },
      { value: 'Kočevje ', text: 'Kočevje ' },
      { value: 'Komen ', text: 'Komen ' },
      { value: 'Komenda ', text: 'Komenda ' },
      { value: 'Koper ', text: 'Koper ' },
      { value: 'Kostanjevica na Krki ', text: 'Kostanjevica na Krki ' },
      { value: 'Kostel ', text: 'Kostel ' },
      { value: 'Kozje ', text: 'Kozje ' },
      { value: 'Kranj ', text: 'Kranj ' },
      { value: 'Kranjska Gora ', text: 'Kranjska Gora ' },
      { value: 'Križevci ', text: 'Križevci ' },
      { value: 'Krško ', text: 'Krško ' },
      { value: 'Kungota ', text: 'Kungota ' },
      { value: 'Kuzma ', text: 'Kuzma ' },
      { value: 'Laško ', text: 'Laško ' },
      { value: 'Lenart ', text: 'Lenart ' },
      { value: 'Lendava ', text: 'Lendava ' },
      { value: 'Litija ', text: 'Litija ' },
      { value: 'Ljubljana ', text: 'Ljubljana ' },
      { value: 'Ljubno ', text: 'Ljubno ' },
      { value: 'Ljutomer ', text: 'Ljutomer ' },
      { value: 'Log - Dragomer ', text: 'Log - Dragomer ' },
      { value: 'Logatec ', text: 'Logatec ' },
      { value: 'Loška dolina ', text: 'Loška dolina ' },
      { value: 'Loški Potok ', text: 'Loški Potok ' },
      { value: 'Lovrenc na Pohorju ', text: 'Lovrenc na Pohorju ' },
      { value: 'Luče ', text: 'Luče ' },
      { value: 'Lukovica ', text: 'Lukovica ' },
      { value: 'Majšperk ', text: 'Majšperk ' },
      { value: 'Makole ', text: 'Makole ' },
      { value: 'Maribor ', text: 'Maribor ' },
      { value: 'Markovci ', text: 'Markovci ' },
      { value: 'Medvode ', text: 'Medvode ' },
      { value: 'Mengeš ', text: 'Mengeš ' },
      { value: 'Metlika ', text: 'Metlika ' },
      { value: 'Mežica ', text: 'Mežica ' },
      { value: 'Miklavž na Dravskem polju', text: 'Miklavž na Dravskem polju' },
      { value: 'Miren - Kostanjevica ', text: 'Miren - Kostanjevica ' },
      { value: 'Mirna ', text: 'Mirna ' },
      { value: 'Mirna Peč ', text: 'Mirna Peč ' },
      { value: 'Mislinja ', text: 'Mislinja ' },
      { value: 'Mokronog - Trebelno ', text: 'Mokronog - Trebelno ' },
      { value: 'Moravče ', text: 'Moravče ' },
      { value: 'Moravske Toplice ', text: 'Moravske Toplice ' },
      { value: 'Mozirje ', text: 'Mozirje ' },
      { value: 'Murska Sobota ', text: 'Murska Sobota ' },
      { value: 'Muta ', text: 'Muta ' },
      { value: 'Naklo ', text: 'Naklo ' },
      { value: 'Nazarje ', text: 'Nazarje ' },
      { value: 'Nova Gorica ', text: 'Nova Gorica ' },
      { value: 'Novo mesto ', text: 'Novo mesto ' },
      { value: 'Odranci ', text: 'Odranci ' },
      { value: 'Oplotnica ', text: 'Oplotnica ' },
      { value: 'Ormož ', text: 'Ormož ' },
      { value: 'Osilnica ', text: 'Osilnica ' },
      { value: 'Pesnica ', text: 'Pesnica ' },
      { value: 'Piran ', text: 'Piran ' },
      { value: 'Pivka ', text: 'Pivka ' },
      { value: 'Podčetrtek ', text: 'Podčetrtek ' },
      { value: 'Podlehnik ', text: 'Podlehnik ' },
      { value: 'Podvelka ', text: 'Podvelka ' },
      { value: 'Poljčane ', text: 'Poljčane ' },
      { value: 'Polzela ', text: 'Polzela ' },
      { value: 'Postojna ', text: 'Postojna ' },
      { value: 'Prebold ', text: 'Prebold ' },
      { value: 'Preddvor ', text: 'Preddvor ' },
      { value: 'Prevalje ', text: 'Prevalje ' },
      { value: 'Ptuj ', text: 'Ptuj ' },
      { value: 'Puconci ', text: 'Puconci ' },
      { value: 'Rače - Fram ', text: 'Rače - Fram ' },
      { value: 'Radeče ', text: 'Radeče ' },
      { value: 'Radenci ', text: 'Radenci ' },
      { value: 'Radlje ob Dravi ', text: 'Radlje ob Dravi ' },
      { value: 'Radovljica ', text: 'Radovljica ' },
      { value: 'Ravne na Koroškem ', text: 'Ravne na Koroškem ' },
      { value: 'Razkrižje ', text: 'Razkrižje ' },
      { value: 'Rečica ob Savinji ', text: 'Rečica ob Savinji ' },
      { value: 'Renče - Vogrsko ', text: 'Renče - Vogrsko ' },
      { value: 'Ribnica ', text: 'Ribnica ' },
      { value: 'Ribnica na Pohorju ', text: 'Ribnica na Pohorju ' },
      { value: 'Rogaška Slatina ', text: 'Rogaška Slatina ' },
      { value: 'Rogašovci ', text: 'Rogašovci ' },
      { value: 'Rogatec ', text: 'Rogatec ' },
      { value: 'Ruše ', text: 'Ruše ' },
      { value: 'Selnica ob Dravi ', text: 'Selnica ob Dravi ' },
      { value: 'Semič ', text: 'Semič ' },
      { value: 'Sevnica ', text: 'Sevnica ' },
      { value: 'Sežana ', text: 'Sežana ' },
      { value: 'Slovenj Gradec ', text: 'Slovenj Gradec ' },
      { value: 'Slovenska Bistrica ', text: 'Slovenska Bistrica ' },
      { value: 'Slovenske Konjice ', text: 'Slovenske Konjice ' },
      { value: 'Sodražica ', text: 'Sodražica ' },
      { value: 'Solčava ', text: 'Solčava ' },
      { value: 'Središče ob Dravi ', text: 'Središče ob Dravi ' },
      { value: 'Starše ', text: 'Starše ' },
      { value: 'Straža ', text: 'Straža ' },
      { value: 'Sv. Trojica v Slov. Goricah ', text: 'Sv. Trojica v Slov. Goricah ' },
      { value: 'Sveta Ana ', text: 'Sveta Ana ' },
      { value: 'Sveti Andraž v Slov. Goricah ', text: 'Sveti Andraž v Slov. Goricah ' },
      { value: 'Sveti Jurij ob Ščavnici ', text: 'Sveti Jurij ob Ščavnici ' },
      { value: 'Sveti Jurij v Slov. Goricah ', text: 'Sveti Jurij v Slov. Goricah ' },
      { value: 'Sveti Tomaž ', text: 'Sveti Tomaž ' },
      { value: 'Šalovci ', text: 'Šalovci ' },
      { value: 'Šempeter - Vrtojba ', text: 'Šempeter - Vrtojba ' },
      { value: 'Šenčur ', text: 'Šenčur ' },
      { value: 'Šentilj ', text: 'Šentilj ' },
      { value: 'Šentjernej ', text: 'Šentjernej ' },
      { value: 'Šentjur pri Celju ', text: 'Šentjur pri Celju ' },
      { value: 'Šentrupert ', text: 'Šentrupert ' },
      { value: 'Škocjan ', text: 'Škocjan ' },
      { value: 'Škofja Loka ', text: 'Škofja Loka ' },
      { value: 'Škofljica ', text: 'Škofljica ' },
      { value: 'Šmarje pri Jelšah ', text: 'Šmarje pri Jelšah ' },
      { value: 'Šmarješke Toplice ', text: 'Šmarješke Toplice ' },
      { value: 'Šmartno ob Paki ', text: 'Šmartno ob Paki ' },
      { value: 'Šmartno pri Litiji ', text: 'Šmartno pri Litiji ' },
      { value: 'Šoštanj ', text: 'Šoštanj ' },
      { value: 'Štore ', text: 'Štore ' },
      { value: 'Tabor ', text: 'Tabor ' },
      { value: 'Tišina ', text: 'Tišina ' },
      { value: 'Tolmin ', text: 'Tolmin ' },
      { value: 'Trbovlje ', text: 'Trbovlje ' },
      { value: 'Trebnje ', text: 'Trebnje ' },
      { value: 'Trnovska vas ', text: 'Trnovska vas ' },
      { value: 'Trzin ', text: 'Trzin ' },
      { value: 'Tržič ', text: 'Tržič ' },
      { value: 'Turnišče ', text: 'Turnišče ' },
      { value: 'Velenje ', text: 'Velenje ' },
      { value: 'Velika Polana ', text: 'Velika Polana ' },
      { value: 'Velike Lašče ', text: 'Velike Lašče ' },
      { value: 'Veržej ', text: 'Veržej ' },
      { value: 'Videm ', text: 'Videm ' },
      { value: 'Vipava ', text: 'Vipava ' },
      { value: 'Vitanje ', text: 'Vitanje ' },
      { value: 'Vodice ', text: 'Vodice ' },
      { value: 'Vojnik ', text: 'Vojnik ' },
      { value: 'Vransko ', text: 'Vransko ' },
      { value: 'Vrhnika ', text: 'Vrhnika ' },
      { value: 'Vuzenica ', text: 'Vuzenica ' },
      { value: 'Zagorje ob Savi ', text: 'Zagorje ob Savi ' },
      { value: 'Zavrč ', text: 'Zavrč ' },
      { value: 'Zreče ', text: 'Zreče ' },
      { value: 'Žalec ', text: 'Žalec ' },
      { value: 'Železniki ', text: 'Železniki ' },
      { value: 'Žetale ', text: 'Žetale ' },
      { value: 'Žiri ', text: 'Žiri ' },
      { value: 'Žirovnica ', text: 'Žirovnica ' },
      { value: 'Žužemberk ', text: 'Žužemberk ' },
      ],
      postNumbers: [
        '8341,	Adlešiči',
        '5270,	Ajdovščina',
        '6280,	Ankaran/Ancarano',
        '9253,	Apače',
        '8253,	Artiče',
        '4275,	Begunje na Gorenjskem',
        '1382,	Begunje pri Cerknici',
        '9231,	Beltinci',
        '2234,	Benedikt',
        '2345,	Bistrica ob Dravi',
        '3256,	Bistrica ob Sotli',
        '8259,	Bizeljsko',
        '1223,	Blagovica',
        '8283,	Blanca',
        '4260,	Bled',
        '4273,	Blejska Dobrava',
        '9265,	Bodonci',
        '9222,	Bogojina',
        '4263,	Bohinjska Bela',
        '4264,	Bohinjska Bistrica',
        '4265,	Bohinjsko jezero',
        '1353,	Borovnica',
        '8294,	Boštanj',
        '5230,	Bovec',
        '5295,	Branik',
        '3314,	Braslovče',
        '5223,	Breginj',
        '8280,	Brestanica',
        '2354,	Bresternica',
        '4243,	Brezje',
        '1351,	Brezovica pri Ljubljani',
        '8250,	Brežice',
        '4210,	Brnik - Aerodrom',
        '8321,	Brusnice',
        '3255,	Buče',
        '8276,	Bučka ',
        '9261,	Cankova',
        '3000,	Celje ',
        '3001,	Celje - poštni predali',
        '4207,	Cerklje na Gorenjskem',
        '8263,	Cerklje ob Krki',
        '1380,	Cerknica',
        '5282,	Cerkno',
        '2236,	Cerkvenjak',
        '2215,	Ceršak',
        '2326,	Cirkovce',
        '2282,	Cirkulane',
        '5273,	Col',
        '8251,	Čatež ob Savi',
        '1413,	Čemšenik',
        '5253,	Čepovan',
        '9232,	Črenšovci',
        '2393,	Črna na Koroškem',
        '6275,	Črni Kal',
        '5274,	Črni Vrh nad Idrijo',
        '5262,	Črniče',
        '8340,	Črnomelj',
        '6271,	Dekani',
        '5210,	Deskle',
        '2253,	Destrnik',
        '6215,	Divača',
        '1233,	Dob',
        '3224,	Dobje pri Planini',
        '8257,	Dobova',
        '1423,	Dobovec',
        '5263,	Dobravlje',
        '3204,	Dobrna',
        '8211,	Dobrnič',
        '1356,	Dobrova',
        '9223,	Dobrovnik/Dobronak ',
        '5212,	Dobrovo v Brdih',
        '1431,	Dol pri Hrastniku',
        '1262,	Dol pri Ljubljani',
        '1273,	Dole pri Litiji',
        '1331,	Dolenja vas',
        '8350,	Dolenjske Toplice',
        '1230,	Domžale',
        '2252,	Dornava',
        '5294,	Dornberk',
        '1319,	Draga',
        '8343,	Dragatuš',
        '3222,	Dramlje',
        '2370,	Dravograd',
        '4203,	Duplje',
        '6221,	Dutovlje',
        '8361,	Dvor',
        '2343,	Fala',
        '9208,	Fokovci',
        '2313,	Fram',
        '3213,	Frankolovo',
        '1274,	Gabrovka',
        '8254,	Globoko',
        '5275,	Godovič',
        '4204,	Golnik',
        '3303,	Gomilsko',
        '4224,	Gorenja vas',
        '3263,	Gorica pri Slivnici',
        '2272,	Gorišnica',
        '9250,	Gornja Radgona',
        '3342,	Gornji Grad',
        '4282,	Gozd Martuljek',
        '6272,	Gračišče',
        '9264,	Grad',
        '8332,	Gradac',
        '1384,	Grahovo',
        '5242,	Grahovo ob Bači',
        '5251,	Grgar',
        '3302,	Griže',
        '3231,	Grobelno',
        '1290,	Grosuplje',
        '2288,	Hajdina',
        '8362,	Hinje',
        '2311,	Hoče',
        '9205,	Hodoš/Hodos',
        '1354,	Horjul',
        '1372,	Hotedršica',
        '1430,	Hrastnik',
        '6225,	Hruševje',
        '4276,	Hrušica',
        '5280,	Idrija',
        '1292,	Ig',
        '6250,	Ilirska Bistrica',
        '6251,	Ilirska Bistrica-Trnovo',
        '1295,	Ivančna Gorica',
        '2259,	Ivanjkovci',
        '1411,	Izlake',
        '6310,	Izola/Isola',
        '2222,	Jakobski Dol',
        '2221,	Jarenina',
        '6254,	Jelšane',
        '4270,	Jesenice',
        '8261,	Jesenice na Dolenjskem',
        '3273,	Jurklošter',
        '2223,	Jurovski Dol',
        '2256,	Juršinci',
        '5214,	Kal nad Kanalom',
        '3233,	Kalobje',
        '4246,	Kamna Gorica',
        '2351,	Kamnica',
        '1241,	Kamnik',
        '5213,	Kanal',
        '8258,	Kapele',
        '2362,	Kapla',
        '2325,	Kidričevo',
        '1412,	Kisovec',
        '6253,	Knežak',
        '5222,	Kobarid',
        '9227,	Kobilje',
        '1330,	Kočevje',
        '1338,	Kočevska Reka',
        '2276,	Kog',
        '5211,	Kojsko',
        '6223,	Komen',
        '1218,	Komenda',
        '6000,	Koper/Capodistria ',
        '6001,	Koper/Capodistria - poštni predali',
        '8282,	Koprivnica',
        '5296,	Kostanjevica na Krasu',
        '8311,	Kostanjevica na Krki',
        '1336,	Kostel',
        '6256,	Košana',
        '2394,	Kotlje',
        '6240,	Kozina',
        '3260,	Kozje',
        '4000,	Kranj',
        '4001,	Kranj - poštni predali',
        '4280,	Kranjska Gora',
        '1281,	Kresnice',
        '4294,	Križe',
        '9206,	Križevci',
        '9242,	Križevci pri Ljutomeru',
        '1301,	Krka',
        '8296,	Krmelj',
        '4245,	Kropa',
        '8262,	Krška vas',
        '8270,	Krško',
        '9263,	Kuzma',
        '2318,	Laporje',
        '3270,	Laško',
        '1219,	Laze v Tuhinju',
        '2230,	Lenart v Slovenskih goricah',
        '9220,	Lendava/Lendva',
        '4248,	Lesce',
        '3261,	Lesično',
        '8273,	Leskovec pri Krškem',
        '2372,	Libeliče',
        '2341,	Limbuš',
        '1270,	Litija',
        '3202,	Ljubečna',
        '1000,	Ljubljana',
        '1001,	Ljubljana - poštni predali',
        '1231,	Ljubljana - Črnuče',
        '1261,	Ljubljana - Dobrunje',
        '1260,	Ljubljana - Polje',
        '1210,	Ljubljana - Šentvid',
        '1211,	Ljubljana - Šmartno',
        '3333,	Ljubno ob Savinji',
        '9240,	Ljutomer',
        '3215,	Loče',
        '5231,	Log pod Mangartom',
        '1358,	Log pri Brezovici',
        '1370,	Logatec',
        '1371,	Logatec',
        '1434,	Loka pri Zidanem Mostu',
        '3223,	Loka pri Žusmu',
        '6219,	Lokev',
        '1318,	Loški Potok',
        '2324,	Lovrenc na Dravskem polju',
        '2344,	Lovrenc na Pohorju',
        '3334,	Luče',
        '1225,	Lukovica',
        '9202,	Mačkovci',
        '2322,	Majšperk',
        '2321,	Makole',
        '9243,	Mala Nedelja',
        '2229,	Malečnik',
        '6273,	Marezige',
        '2000,	Maribor',
        '2001,	Maribor - poštni predali',
        '2206,	Marjeta na Dravskem polju',
        '2281,	Markovci',
        '9221,	Martjanci',
        '6242,	Materija',
        '4211,	Mavčiče',
        '1215,	Medvode',
        '1234,	Mengeš',
        '8330,	Metlika',
        '2392,	Mežica',
        '2204,	Miklavž na Dravskem polju',
        '2275,	Miklavž pri Ormožu',
        '5291,	Miren',
        '8233,	Mirna',
        '8216,	Mirna Peč',
        '2382,	Mislinja',
        '4281,	Mojstrana',
        '8230,	Mokronog',
        '1251,	Moravče',
        '9226,	Moravske Toplice',
        '5216,	Most na Soči',
        '1221,	Motnik',
        '3330,	Mozirje',
        '9000,	Murska Sobota',
        '9001,	Murska Sobota - poštni predali',
        '2366,	Muta',
        '4202,	Naklo',
        '3331,	Nazarje',
        '1357,	Notranje Gorice',
        '3203,	Nova Cerkev',
        '5000,	Nova Gorica',
        '5001,	Nova Gorica - poštni predali',
        '1385,	Nova vas',
        '8000,	Novo mesto',
        '8001,	Novo mesto - poštni predali',
        '6243,	Obrov',
        '9233,	Odranci',
        '2317,	Oplotnica',
        '2312,	Orehova vas',
        '2270,	Ormož',
        '1316,	Ortnek',
        '1337,	Osilnica',
        '8222,	Otočec',
        '2361,	Ožbalt',
        '2231,	Pernica',
        '2211,	Pesnica pri Mariboru',
        '9203,	Petrovci',
        '3301,	Petrovče',
        '6330,	Piran/Pirano',
        '8255,	Pišece',
        '6257,	Pivka',
        '6232,	Planina',
        '3225,	Planina pri Sevnici',
        '6276,	Pobegi',
        '8312,	Podbočje',
        '5243,	Podbrdo',
        '3254,	Podčetrtek',
        '2273,	Podgorci',
        '6216,	Podgorje',
        '2381,	Podgorje pri Slovenj Gradcu',
        '6244,	Podgrad',
        '1414,	Podkum',
        '2286,	Podlehnik',
        '5272,	Podnanos',
        '4244,	Podnart',
        '3241,	Podplat',
        '3257,	Podsreda',
        '2363,	Podvelka',
        '2208,	Pohorje',
        '2257,	Polenšak',
        '1355,	Polhov Gradec',
        '4223,	Poljane nad Škofjo Loko',
        '2319,	Poljčane',
        '1272,	Polšnik',
        '3313,	Polzela',
        '3232,	Ponikva',
        '6320,	Portorož/Portorose',
        '6230,	Postojna',
        '2331,	Pragersko',
        '3312,	Prebold',
        '4205,	Preddvor',
        '6255,	Prem',
        '1352,	Preserje',
        '6258,	Prestranek',
        '2391,	Prevalje',
        '3262,	Prevorje',
        '1276,	Primskovo ',
        '3253,	Pristava pri Mestinju',
        '9207,	Prosenjakovci/Partosfalva',
        '5297,	Prvačina',
        '2250,	Ptuj',
        '2323,	Ptujska Gora',
        '9201,	Puconci',
        '2327,	Rače',
        '1433,	Radeče',
        '9252,	Radenci',
        '2360,	Radlje ob Dravi',
        '1235,	Radomlje',
        '4240,	Radovljica',
        '8274,	Raka',
        '1381,	Rakek',
        '4283,	Rateče - Planica',
        '2390,	Ravne na Koroškem',
        '9246,	Razkrižje',
        '3332,	Rečica ob Savinji',
        '5292,	Renče',
        '1310,	Ribnica',
        '2364,	Ribnica na Pohorju',
        '3272,	Rimske Toplice',
        '1314,	Rob',
        '5215,	Ročinj',
        '3250,	Rogaška Slatina',
        '9262,	Rogašovci',
        '3252,	Rogatec',
        '1373,	Rovte',
        '2342,	Ruše',
        '1282,	Sava',
        '6333,	Sečovlje/Sicciole',
        '4227,	Selca',
        '2352,	Selnica ob Dravi',
        '8333,	Semič',
        '8281,	Senovo',
        '6224,	Senožeče',
        '8290,	Sevnica',
        '6210,	Sežana',
        '2214,	Sladki Vrh',
        '5283,	Slap ob Idrijci',
        '2380,	Slovenj Gradec',
        '2310,	Slovenska Bistrica',
        '3210,	Slovenske Konjice',
        '1216,	Smlednik',
        '5232,	Soča',
        '1317,	Sodražica',
        '3335,	Solčava',
        '5250,	Solkan',
        '4229,	Sorica',
        '4225,	Sovodenj',
        '5281,	Spodnja Idrija',
        '2241,	Spodnji Duplek',
        '9245,	Spodnji Ivanjci',
        '2277,	Središče ob Dravi',
        '4267,	Srednja vas v Bohinju',
        '8256,	Sromlje ',
        '5224,	Srpenica',
        '1242,	Stahovica',
        '1332,	Stara Cerkev',
        '8342,	Stari trg ob Kolpi',
        '1386,	Stari trg pri Ložu',
        '2205,	Starše',
        '2289,	Stoperce',
        '8322,	Stopiče',
        '3206,	Stranice',
        '8351,	Straža',
        '1313,	Struge',
        '8293,	Studenec',
        '8331,	Suhor',
        '2233,	Sv. Ana v Slovenskih goricah',
        '2235,	Sv. Trojica v Slovenskih goricah',
        '2353,	Sveti Duh na Ostrem Vrhu',
        '9244,	Sveti Jurij ob Ščavnici',
        '3264,	Sveti Štefan',
        '2258,	Sveti Tomaž',
        '9204,	Šalovci',
        '5261,	Šempas',
        '5290,	Šempeter pri Gorici',
        '3311,	Šempeter v Savinjski dolini',
        '4208,	Šenčur',
        '2212,	Šentilj v Slovenskih goricah',
        '8297,	Šentjanž',
        '2373,	Šentjanž pri Dravogradu',
        '8310,	Šentjernej',
        '3230,	Šentjur',
        '3271,	Šentrupert',
        '8232,	Šentrupert',
        '1296,	Šentvid pri Stični',
        '8275,	Škocjan',
        '6281,	Škofije',
        '4220,	Škofja Loka',
        '3211,	Škofja vas',
        '1291,	Škofljica',
        '6274,	Šmarje',
        '1293,	Šmarje - Sap',
        '3240,	Šmarje pri Jelšah',
        '8220,	Šmarješke Toplice',
        '2315,	Šmartno na Pohorju',
        '3341,	Šmartno ob Dreti',
        '3327,	Šmartno ob Paki',
        '1275,	Šmartno pri Litiji',
        '2383,	Šmartno pri Slovenj Gradcu',
        '3201,	Šmartno v Rožni dolini',
        '3325,	Šoštanj',
        '6222,	Štanjel',
        '3220,	Štore',
        '3304,	Tabor',
        '3221,	Teharje',
        '9251,	Tišina',
        '5220,	Tolmin',
        '3326,	Topolšica',
        '2371,	Trbonje',
        '1420,	Trbovlje',
        '8231,	Trebelno ',
        '8210,	Trebnje',
        '5252,	Trnovo pri Gorici',
        '2254,	Trnovska vas',
        '1222,	Trojane',
        '1236,	Trzin',
        '4290,	Tržič',
        '8295,	Tržišče',
        '1311,	Turjak',
        '9224,	Turnišče',
        '8323,	Uršna sela',
        '1252,	Vače',
        '3320,	Velenje',
        '3322,	Velenje - poštni predali',
        '8212,	Velika Loka',
        '2274,	Velika Nedelja',
        '9225,	Velika Polana',
        '1315,	Velike Lašče',
        '8213,	Veliki Gaber',
        '9241,	Veržej',
        '1312,	Videm - Dobrepolje',
        '2284,	Videm pri Ptuju',
        '8344,	Vinica',
        '5271,	Vipava',
        '4212,	Visoko',
        '1294,	Višnja Gora',
        '3205,	Vitanje',
        '2255,	Vitomarci',
        '1217,	Vodice',
        '3212,	Vojnik',
        '5293,	Volčja Draga',
        '2232,	Voličina',
        '3305,	Vransko',
        '6217,	Vremski Britof',
        '1360,	Vrhnika',
        '2365,	Vuhred',
        '2367,	Vuzenica',
        '8292,	Zabukovje ',
        '1410,	Zagorje ob Savi',
        '1303,	Zagradec',
        '2283,	Zavrč',
        '8272,	Zdole ',
        '4201,	Zgornja Besnica',
        '2242,	Zgornja Korena',
        '2201,	Zgornja Kungota',
        '2316,	Zgornja Ložnica',
        '2314,	Zgornja Polskava',
        '2213,	Zgornja Velka',
        '4247,	Zgornje Gorje',
        '4206,	Zgornje Jezersko',
        '2285,	Zgornji Leskovec',
        '1432,	Zidani Most',
        '3214,	Zreče',
        '4209,	Žabnica',
        '3310,	Žalec',
        '4228,	Železniki',
        '2287,	Žetale',
        '4226,	Žiri',
        '4274,	Žirovnica',
        '8360,	Žužemberk',
      ],
      courses: [
        '1001001 Multimedija UNI',
        '1000407 Računalništvo in matematika UNI',
        '1000468 Računalništvo in informatika UNI',
        '1000469 Upravna informatika UNI',
        '1000470 Računalništvo in informatika VS',
        '1000471 Računalništvo in informatika MAG',
        '1000472 Kognitivna znanost MAG',
        '1000934 Računalništvo in matematika MAG',
        '7002801 Pedagoško računalništvo in informatika MAG',
        '1000474 Računalništvo in informatika DR',
      ],
      course_types: [
        '16203 Visokošolska strokovna izobrazba (prva bolonjska stopnja)',
        '16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)',
        '17003 Magistrska izobrazba (druga bolonjska stopnja)',
        '18202 Doktorat znanosti (tretja bolonjska stopnja)',
      ],
      enrollment_types: [
        '1 Prvi vpis v letnik/dodatno leto',
        '2 Ponavljanje letnika',
        '3 Nadaljevanje letnika',
        '4 Podaljšanje statusa študenta',
        '5 Vpis po merilih za prehode v višji letnik',
        '6 Vpis v semester skupnega št. programa',
        '7 Vpis po merilih za prehode v isti letnik',
      ],
      study_year: ['1', '2', '3', '4', '5', '6', 'dodatno leto',],
      study_type: ['1 Redni', '3 Izredni'],
      study_form: ['1 Na lokaciji', '2 Na daljavo', '3 E-študij'],
      studyYears: studyYears,
      vpisniList: {
        vpisnaStevilka: '',
        ime: '',
        priimek: '',
        datumRojstva: '',
        krajRojstva: '',
        regija: '',
        drzava: '',
        spol: '',
        emso: '',
        davcnaStevilka: '',
        elektronskiNaslov: '',
        telefonskaStevilka: '',
        stalnoPrebivalisceObcina: '',
        stalnoPrebivalisceDrzava: '',
        stalnoPrebivalisceNaslov: '',
        stalnoPrebivaliscePosta: '',
        zacasnoPrebivalisceObcina: '',
        zacasnoPrebivalisceDrzava: '',
        zacasnoPrebivalisceNaslov: '',
        zacasnoPrebivaliscePosta: '',
        naslovZaVrocanje: '',
        studijskiProgram: '',
        krajIzvajanja: '',
        izbirnaSkupina: '',
        vrstaStudija: '',
        vrstaVpisa: '',
        letnikStudija: '',
        nacinStudija: '',
        oblikaStudija: '',
        studijskoLetoPrvegaVpisaVTaProgram: '',
        soglasjeKnjiz: '',
        soglasjeObves: '',
      },
      pravica: '',
      errors: [],
      regija: false
    }
  },
  watch: {
    watchEmso (newVal, oldVal) {
      this.validation()
    },
    ects_button (newVal, oldVal) {
      
      this.validation()
    }
  },
  computed: {
    btnClass () {
      if (this.ects_sum < 60 || this.ects_sum > 60) return 'danger'
      else return 'success'
    },
    watchEmso () {
      return this.vpisniList.emso
    },
    izracunajSpol () {
      let base = this.vpisniList.emso.substring(9,12)
      let spol = (base >= 0 && base <= 499) ? 'Moški' : 'Ženska'
      this.vpisniList.spol = spol
      return spol
    },
    izracunajDatumRojstva () {
      let base = this.vpisniList.emso.substring(0,7)
      let datumRoj = `1${base.substring(4,7)}-${base.substring(2,4)}-${base.substring(0,2)}`
      this.vpisniList.datumRojstva = datumRoj
      return datumRoj
    },
    getStudyType() {
      if(this.courses.indexOf(this.vpisniList.studijskiProgram) < 4) return this.course_types[1]
      else if(this.courses.indexOf(this.vpisniList.studijskiProgram) == 4) return this.course_types[0]
      else if(this.courses.indexOf(this.vpisniList.studijskiProgram) == 9) return this.course_types[3]
      else return this.course_types[2]
    },
    isDisabled1() {
      if (this.vpisniList.drzava != "Slovenija" && this.vpisniList.drzava != "") {
        this.vpisniList.regija = ""
        return true
      } else return false
    },
    isDisabled2() {
      if (this.vpisniList.stalnoPrebivalisceDrzava != "Slovenija" && this.vpisniList.stalnoPrebivalisceDrzava != "") {
        this.vpisniList.stalnoPrebivalisceObcina = ""
        return true
      } else return false
    },
    isDisabled3() {
      if (this.vpisniList.zacasnoPrebivalisceDrzava != "Slovenija" && this.vpisniList.zacasnoPrebivalisceDrzava != "") {
        this.vpisniList.zacasnoPrebivalisceObcina = ""
        return true
      } else return false
    }
  },
  methods: {
    validation () {
      this.errors = []
      // let index = this.errors.indexOf(this.errors[this.errors.length-1]);
      // if (index > -1 && newVal.substring(0,newVal.length-1) == oldVal) {
      //   this.errors.splice(index, 1);
      // }
      if (this.ects_button === 'danger') {
        this.errors.push('Iz predmetov morate zbrati 60 KT')
      }
      this.validEmso()
    },
    add(selected, id) {
      if(selected.constructor === Array) {
        for(var x in selected) {
          this.predmeti.push(selected[x])
        }
      } else this.predmeti.push(selected)
      this.fixECTS()
    },
    remove(removed, id) {
      if(removed.constructor === Array) {
        for(var x in removed) {
          for(var y = 0; y < this.predmeti.length; y++) {
            if(this.predmeti[y].name == removed[x].name) {
              this.predmeti.splice(y, 1)
            }
          }
        }
      } else {
        for(var y = 0; y < this.predmeti.length; y++) {
            if(this.predmeti[y].name == removed.name) {
              this.predmeti.splice(y, 1)
            }
          }
      }
      this.fixECTS()
    },
    fixECTS() {
      this.ects_sum = 0
      for(var x = 0; x < this.predmeti.length; x++) {
        this.ects_sum += this.predmeti[x].ects
      }
      if (this.ects_sum < 60 || this.ects_sum > 60) this.ects_button = 'danger'
      else this.ects_button = 'success'
    },
    checkForm() {
      this.errors = [];
      this.validEmso();
      this.validName();
      if(this.errors.length > 0) this.$refs.errmsg.focus()
    },
    onSubmit() {
      // TODO: check of sum of ECTS and EMSO and do not let user submit form if both not corrects
      if(this.ects_sum != 60) {
        alert('Iz predmetov morate zbrati morate 60 kreditnih točk! ')
        return
      }
      if(this.errors.length > 0) {
        alert('Napaka pri vnosu! ')
        return
      }
      var naslov = this.vpisniList.naslovZaVrocanje == "Stalno prebivališče" ? false : true
      var predmeti = []
      for(var x = 0; x < this.predmeti.length; x++) {
        predmeti.push(this.predmeti[x].id_izvajanja)
      }
      var stalnaDrzava = ""
      var zacasnaDrzava = ""
      for(var x = 0; x < this.countries.length; x++) {
        console.log(this.vpisniList.stalnoPrebivalisceDrzava, this.countries[x].value.trim())
        if(this.vpisniList.stalnoPrebivalisceDrzava == this.countries[x].value.trim()) stalnaDrzava = this.countries[x].tag
        if(this.vpisniList.zacasnoPrebivalisceDrzava == this.countries[x].value.trim()) zacasnaDrzava = this.countries[x].tag
      }
      let pravilnaIzbiraPredmetov = (this.value_splosni.length == 1 && this.value.value_strokovni.length == 1) ? true : false
      let pravilnaIzbiraNePravice = (this.value_modulski.map(e=>e.name).length==this.value_modulski.map(po => po.modul).filter((value,index,self) => self.indexOf(value)===index).length*3 
                                    || this.value_modulski.map(e=>e.name).length==(this.value_modulski.map(po => po.modul).filter((value,index,self) => self.indexOf(value)===index).length)*3-2)
                                    && (this.value_modulski.map(po => po.modul).filter((value,index,self) => self.indexOf(value)===index).length == 3 
                                    || this.value_modulski.map(po => po.modul).filter((value,index,self) => self.indexOf(value)===index).length == 2)
      if (this.vpisniList.letnikStudija == 2 && pravilnaIzbiraPredmetov) {
        alert('Izberete lahko en splosno izbirni predmet in en strokovno izbirni predmet! ')
        return
      }
      if (this.vpisniList.letnikStudija == 3 && !this.pravica && !pravilnaIzbiraNePravice) {
        alert('Nimate proste izbire predmetov! ')
        return
      }
      axios.post(`enrollments/${this.$route.params.id}`, {
          student: {
            name: this.vpisniList.ime,
            surname: this.vpisniList.priimek,
            emso: this.vpisniList.emso,
            dateOfBirth: this.vpisniList.datumRojstva + "T4:50:49+00:00",
            placeOfBirth: this.vpisniList.krajRojstva,
            gender: this.vpisniList.spol[0],
            nationality: this.vpisniList.drzava,
            region: this.vpisniList.regija.trim(),
            taxNumber: this.vpisniList.davcnaStevilka,
            phoneNumber: this.vpisniList.telefonskaStevilka,
            permanent: {
                municipality: {
                    name: this.vpisniList.stalnoPrebivalisceObcina.trim()
                },
                country: stalnaDrzava,
                placeOfResidence: this.vpisniList.stalnoPrebivalisceNaslov,
                postalNumber: this.vpisniList.stalnoPrebivaliscePosta.split(",")[0]
            },
            temporary: {
                municipality: {
                    name: this.vpisniList.zacasnoPrebivalisceObcina.trim()
                },
                country: zacasnaDrzava,
                placeOfResidence: this.vpisniList.stalnoPrebivalisceNaslov,
                postalNumber: this.vpisniList.zacasnoPrebivaliscePosta.split(",")[0]
            },
            sendToTemporary: naslov,
            enrollmentNumber: this.vpisniList.vpisnaStevilka,
            email: this.vpisniList.elektronskiNaslov
            },
            studyForm: {
                id: parseInt(this.vpisniList.oblikaStudija.split(" ")[0]),
                name: this.vpisniList.oblikaStudija.slice(2, this.vpisniList.oblikaStudija.length)
              },
            studyType: {
                id: parseInt(this.vpisniList.nacinStudija.split(" ")[0]),
                name: this.vpisniList.nacinStudija.slice(2, this.vpisniList.nacinStudija.length)
              },
            enrollmentType: {
                id: parseInt(this.vpisniList.vrstaVpisa.split(" ")[0]),
                name: this.vpisniList.vrstaVpisa.slice(2, this.vpisniList.vrstaVpisa.length)
              },
            studyYear: {
                id: parseInt(this.vpisniList.letnikStudija),
              },
            program: {
                id: parseInt(this.vpisniList.studijskiProgram.split(" ")[0]),
                ects: 180,
                title: this.vpisniList.studijskiProgram.slice(7, this.vpisniList.studijskiProgram.length)
              },
            courses: predmeti    
      }
      ).then((response) => {
        this.goHome()
      }).catch(err => {
        console.log(err)
      })
    },
    goBack() {
      this.$router.push({name: 'login'});
    },
    onReset() {
    },
    goHome() {
      this.$router.push({name: 'home'});
    },
    validEmso() {
      if (this.vpisniList.emso.length < 13) {
        this.errors.push("Vpisana EMŠO vsebuje premalo znakov.");
        return;
      }
      var factors = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      var emso = this.vpisniList.emso;
      var birthDay = this.vpisniList.datumRojstva;
      var check = parseInt(emso[12])
      var sum = 0;
      for (var i = 0; i < 12; i++) {
        sum += (parseInt(emso[i]) * factors[i])
      }
      var remainder = sum % 11;
      remainder = 11 - remainder;
      if (remainder == check) {
        var bday = birthDay.split("-")[2]
        var bmonth = birthDay.split("-")[1]
        var byear = birthDay.split("-")[0].substring(1,4)
        return;
      }
      else this.errors.push("Vpisana EMŠO je neveljavna.");
      return;
    },
    validName() {
      var regexp = /^((?![0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\[\]\{\}\;\:\"\\\/\<\>\?]).)+$/;
      if (!regexp.test(this.vpisniList.ime)) {
        this.errors.push("Ime lahko vsebuje samo črke.");
        if (!regexp.test(this.vpisniList.priimek)) {
          this.errors.push("Priimek lahko vsebuje samo črke.");
        }
      }
      return
    },
    
  },
  mounted() {
    axios.get(`students/me`).then((response) => {
      var userid = response.data.id;
      axios.get(`students/${userid}`).then((response) => {
        this.vpisniList.vpisnaStevilka = response.data.enrollmentNumber;
        this.vpisniList.ime = response.data.name;
        this.vpisniList.priimek = response.data.surname;
        this.vpisniList.krajRojstva = response.data.placeOfBirth;
        if (response.data.dateOfBirth) this.vpisniList.datumRojstva = response.data.dateOfBirth.year + "-" + response.data.dateOfBirth.monthValue + "-" + response.data.dateOfBirth.dayOfMonth;
        this.vpisniList.spol = response.data.gender;

        
        this.vpisniList.stalnoPrebivalisceDrzava = 'Slovenija';
        this.vpisniList.zacasnoPrebivalisceDrzava = 'Slovenija';
        if (response.data.permanent && response.data.permanent.municipality) {
          this.vpisniList.stalnoPrebivalisceObcina = response.data.permanent.municipality.name + ' ';
          this.vpisniList.stalnoPrebivaliscePosta = response.data.permanent.postalNumber + ',	' + response.data.permanent.municipality.name;
          this.vpisniList.stalnoPrebivalisceNaslov = response.data.permanent.placeOfResidence;
        }
        if (response.data.temporary) {
          this.vpisniList.zacasnoPrebivaliscePosta = response.data.temporary.postalNumber + ',	' + response.data.temporary.municipality.name;
          this.vpisniList.zacasnoPrebivalisceObcina = response.data.temporary.municipality.name + ' ';
          this.vpisniList.zacasnoPrebivalisceNaslov = response.data.temporary.placeOfResidence;
        }
        
        this.vpisniList.elektronskiNaslov = response.data.universityEmail;
        
        this.vpisniList.telefonskaStevilka = response.data.phoneNumber;
        axios.get(`tokens/${userid}`).then((response) => {
          for(var x = 0; x < response.data.length; x++) {
            if(response.data[x].id == this.$route.params.id) {
              this.vpisniList.studijskiProgram = response.data[x].program.id + " " + response.data[x].program.title;
              this.vpisniList.letnikStudija = response.data[x].studyYear.id;
              this.vpisniList.vrstaVpisa = response.data[x].enrollmentType.id + " " + response.data[x].enrollmentType.name;
              this.vpisniList.nacinStudija = response.data[x].studyType.id + " " + response.data[x].studyType.name;
              this.vpisniList.oblikaStudija = response.data[x].studyForm.id + " " + response.data[x].studyForm.name; 
              this.pravica = response.data[x].freeChoice;
            }
          }
          axios.get(`enrollments/${this.$route.params.id}`).then((response) => {
            this.vpisniList.studijskoLetoPrvegaVpisaVTaProgram = response.data.year.toString;
            // OBVEZNI PREDMETI
            for(var x = 0; x < response.data.obligatoryCourses.length; x++) {
              var lecturers = ""
              for(var y = 0; y < response.data.obligatoryCourses[x].lecturers.length; y++) {
                if(y == 0) lecturers += (response.data.obligatoryCourses[x].lecturers[y].surname + " " + response.data.obligatoryCourses[x].lecturers[y].name)
                else lecturers += (', ' + response.data.obligatoryCourses[x].lecturers[y].surname + " " + response.data.obligatoryCourses[x].lecturers[y].name)
              }
              this.predmeti.push({
                id: response.data.obligatoryCourses[x].course.id,
                id_izvajanja: response.data.obligatoryCourses[x].id,
                name: response.data.obligatoryCourses[x].course.name,
                lecturer: lecturers,
                ects: parseInt(response.data.obligatoryCourses[x].course.ects)
              })
            } 
            // SPLOŠNO IZBIRNI PREDMETI
            for(var x = 0; x < response.data.generalOptionalCourses.length; x++) {
              var lecturers = ""
              for(var y = 0; y < response.data.generalOptionalCourses[x].lecturers.length; y++) {
                if(y == 0) lecturers += (response.data.generalOptionalCourses[x].lecturers[y].surname + " " + response.data.generalOptionalCourses[x].lecturers[y].name)
                else lecturers += (', ' + response.data.generalOptionalCourses[x].lecturers[y].surname + " " + response.data.generalOptionalCourses[x].lecturers[y].name)
              }
              this.splosni.push({
                id: response.data.generalOptionalCourses[x].course.id,
                id_izvajanja: response.data.generalOptionalCourses[x].id,
                name: response.data.generalOptionalCourses[x].course.name,
                lecturer: lecturers,
                ects: parseInt(response.data.generalOptionalCourses[x].course.ects)
              })
            }
            // STROKOVNO IZBIRNI PREDMETI
            for(var x = 0; x < response.data.professionalOptionalCourses.length; x++) {
              var lecturers = ""
              for(var y = 0; y < response.data.professionalOptionalCourses[x].lecturers.length; y++) {
                if(y == 0) lecturers += (response.data.professionalOptionalCourses[x].lecturers[y].surname + " " + response.data.professionalOptionalCourses[x].lecturers[y].name)
                else lecturers += (', ' + response.data.professionalOptionalCourses[x].lecturers[y].surname + " " + response.data.professionalOptionalCourses[x].lecturers[y].name)
              }
              this.strokovni.push({
                id: response.data.professionalOptionalCourses[x].course.id,
                id_izvajanja: response.data.professionalOptionalCourses[x].id,
                name: response.data.professionalOptionalCourses[x].course.name,
                lecturer: lecturers,
                ects: parseInt(response.data.professionalOptionalCourses[x].course.ects)
              })
            }
            // MODULSKI PREDMETI
            for(var x = 0; x < response.data.moduleCourses.length; x++) {
              var lecturers = ""
              var modul = response.data.moduleCourses[x].module.name
              for(var y = 0; y < response.data.moduleCourses[x].lecturers.length; y++) {
                if(y == 0) lecturers += (response.data.moduleCourses[x].lecturers[y].surname + " " + response.data.moduleCourses[x].lecturers[y].name)
                else lecturers += (', ' + response.data.moduleCourses[x].lecturers[y].surname + " " + response.data.moduleCourses[x].lecturers[y].name)
              }
              var found = false
              for(var y = 0; y < this.modulski.length; y++) {
                if(modul == this.modulski[y].module_name) {
                  found = true
                  this.modulski[y].subjects.push({ 
                    id: response.data.moduleCourses[x].course.id,
                    id_izvajanja: response.data.moduleCourses[x].id,
                    name: response.data.moduleCourses[x].course.name,
                    lecturer: lecturers,
                    ects: parseInt(response.data.moduleCourses[x].course.ects),
                    modul: modul
                  })
                }
              }
              if(!found) {
                this.modulski.push({ 
                    module_name: modul,
                    subjects: [
                      {
                        id: response.data.moduleCourses[x].course.id,
                        id_izvajanja: response.data.moduleCourses[x].id,
                        name: response.data.moduleCourses[x].course.name,
                        lecturer: lecturers,
                        ects: parseInt(response.data.moduleCourses[x].course.ects),
                        modul: modul
                      }
                    ]
                })
              }
            }
            this.ects_sum = 0
            for(var x = 0; x < this.predmeti.length; x++) {
              this.ects_sum += this.predmeti[x].ects
            }
          }).catch((err) => {
            console.log(err)
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
  .university-image {
    margin-top: 3em;
    margin-bottom: 3em;
  }
  .img-thumbnail {
    width: 70%;
    height: 20%;
    margin-bottom: 1em;
  }
  .boi {
    margin-top: 30%;
  }

  @media print { 
  /* All your print styles go here */
  .vanish { display: none !important; } 
  }
  
</style>
