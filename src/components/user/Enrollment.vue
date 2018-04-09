<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <h3>VPISNI LIST {{(new Date()).getFullYear()}}/{{(new Date()).getFullYear()+1}} za študente</h3>
      <h4>Fakulteta za računalništvo in informatiko</h4>
      <div class="text-center university-image">
          <img src="https://petra-education.eu/wp-content/uploads/sites/29/2016/07/111.png" class="img-thumbnail">
      </div>
      <h4>Osebni podatki</h4>

      <b-form-group id="exampleInputGroup1"
                    label="Vpisna številka:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      placeholder="62130075"
                      type="number"
                      disabled
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Ime in Priimek:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      required>
        </b-form-input>
        
      </b-form-group>
       <b-form-group id="exampleInputGroup2"
                    label="Datum rojstva:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="date"
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Kraj rojstva:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedCountry" :options="countries" class="mb-3">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Regija:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedPost" :options="posts" class="mb-3">
        </b-form-select>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Država:"
                    label-for="exampleInput2">
        <b-form-select :options="posts" class="mb-3">
        </b-form-select>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Spol:"
                    label-for="exampleInput2">
        <b-form-select :options="['Moški', 'Ženska']" class="mb-3">
        </b-form-select>
      </b-form-group>
         <b-form-group id="exampleInputGroup2"
                    label="EMŠO:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" 
                      pattern="\d*" 
                      maxlength="13"
                      required>
        </b-form-input>
        
      </b-form-group>
          <b-form-group id="exampleInputGroup2"
                    label="Davčna številka:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" 
                      pattern="\d*" 
                      maxlength="8"
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Elektronski naslov: "
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="email" 
                      required>
        </b-form-input>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Telefonska številka:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="tel" 
                      required>
        </b-form-input>
        
      </b-form-group>
      <h4>Stalno prebivališče</h4>
          <b-form-group id="exampleInputGroup2"
                    label="Občina:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedPost" :options="posts" class="mb-3">
        </b-form-select>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Država:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedCountry" :options="countries" class="mb-3">
        </b-form-select>
      </b-form-group>
       <b-form-group id="exampleInputGroup2"
                    label="Naslov:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" 
                      required>
        </b-form-input>
        
      </b-form-group>
        <b-form-group id="exampleInputGroup2"
                    label="Poštna številka:"
                    label-for="exampleInput2">
         <b-form-select :options="postNumbers" class="mb-3">
        </b-form-select>

        
      </b-form-group>
        <h4>Začasno prebivališče</h4>
            <b-form-group id="exampleInputGroup2"
                    label="Občina:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedPost" :options="posts" class="mb-3">
        </b-form-select>
        
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Država:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedCountry" :options="countries" class="mb-3">
        </b-form-select>
      </b-form-group>
       <b-form-group id="exampleInputGroup2"
                    label="Naslov:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text" 
                      required>
        </b-form-input>
      </b-form-group>
        <b-form-group id="exampleInputGroup2"
                    label="Poštna številka:"
                    label-for="exampleInput2">
         <b-form-select :options="postNumbers" class="mb-3">
        </b-form-select>

        
      </b-form-group>
<h4>Vročanje</h4>
     <b-form-group id="exampleInputGroup2"
                    label="Naslov za vročanje:"
                    label-for="exampleInput2">
        <b-form-select :options="['Stalno prebivališče', 'Začasno prebivališče']" class="mb-3">
        </b-form-select>
    </b-form-group>

  
      

      <h3>PODATKI O VPISU</h3>
      <b-form-group id="exampleInputGroup2"
                    label="Študijski program:"
                    label-for="exampleInput2">
       <b-form-select v-model="selectedCourse" :options="courses" class="mb-3">
       </b-form-select>        
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Kraj izvajanja:"
                    label-for="exampleInput2">
       <b-form-input id="exampleInput2"
                      type="text"
                      placeholder="Ljubljana"
                      disabled 
                      required>
        </b-form-input>
        
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Izbirna skupina:"
                    label-for="exampleInput2">
       <b-form-input id="exampleInput2"
                      type="text"
                      disabled 
                      required>
        </b-form-input>
        
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Vrsta študija:"
                    label-for="exampleInput2">
       <b-form-select v-model="selectedCourseType" :options="course_types" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Vrsta vpisa:"
                    label-for="exampleInput2">
       <b-form-select v-model="selectedEnrollmentType" :options="enrollment_types" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Letnik študija:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedStudyYear" :options="study_year" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Način študija:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedStudyType" :options="study_type" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Oblika študija:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedStudyForm" :options="study_form" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Študijsko leto prvega vpisa v ta program:"
                    label-for="exampleInput2">
        <b-form-select v-model="selectedFirstYearStudy" :options="studyYears" class="mb-3">
       </b-form-select>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Soglasje za koriščenje storitev knjižničnega sistema"
                    label-for="exampleInput2">
        <b-form-checkbox id="exampleInput2"
                      type="checkbox" >
        </b-form-checkbox>
      </b-form-group>

      <b-form-group id="exampleInputGroup2"
                    label="Soglasje za obveščanje o aktualnih študijskih zadevah ter za karierno svetovanje in za druge aktivnosti, povezane z zagotavljanjem kakovosti"
                    label-for="exampleInput2">
        <b-form-checkbox id="exampleInput2"
                      type="checkbox" >
        </b-form-checkbox>
      </b-form-group>
      
      <b-button type="submit" variant="primary" @click.prevent="saveProfile">Shrani</b-button>
      <b-button type="reset" variant="danger" @click.prevent="goHome">Nazaj</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'forgotPassword',
  data () {
    var studyYears = [];
    for(var year = 1990; year < 2017; year++) {
      studyYears.push(year + '/' + (year+1));
    } 
    return {
      selectedCountry: '',
      selectedPost: '',
      countries: [
        { value: 'Afganistan', text: 'Afganistan' },
        { value: 'Alandski otoki', text: 'Alandski otoki' },
        { value: 'Albanija', text: 'Albanija' },
        { value: 'Alžirija', text: 'Alžirija' },
        { value: 'Ameriška Samoa', text: 'Ameriška Samoa' },
        { value: 'Andora', text: 'Andora' },
        { value: 'Angola', text: 'Angola' },
        { value: 'Angvila', text: 'Angvila' },
        { value: 'Antarktika', text: 'Antarktika' },
        { value: 'Antigva in Barbuda', text: 'Antigva in Barbuda' },
        { value: 'Argenitna', text: 'Argenitna' },
        { value: 'Armenija', text: 'Armenija' },
        { value: 'Aruba', text: 'Aruba' },
        { value: 'Avstralija', text: 'Avstralija' },
        { value: 'Avstrija', text: 'Avstrija' },
        { value: 'Azerbajdžan', text: 'Azerbajdžan' },
        { value: 'Bahami', text: 'Bahami' },
        { value: 'Bahrajn', text: 'Bahrajn' },
        { value: 'Bangladeš', text: 'Bangladeš' },
        { value: 'Barbados', text: 'Barbados' },
        { value: 'Belorusija', text: 'Belorusija' },
        { value: 'Belgija', text: 'Belgija' },
        { value: 'Belize', text: 'Belize' },
        { value: 'Benin', text: 'Benin' },
        { value: 'Bermudi', text: 'Bermudi' },
        { value: 'Butan', text: 'Butan' },
        { value: 'Bolivija', text: 'Bolivija' },
        { value: 'Otočje Bonaire, Sv. Eustatij in Saba', text: 'Otočje Bonaire, Sv. Eustatij in Saba' },
        { value: 'Bosna in Hercegovina', text: 'Bosna in Hercegovina' },
        { value: 'Bocvana', text: 'Bocvana' },
        { value: 'Bouvetov otok', text: 'Bouvetov otok' },
        { value: 'Brazilija', text: 'Brazilija' },
        { value: 'Britansko ozemlje v Indijskem oceanu', text: 'Britansko ozemlje v Indijskem oceanu' },
        { value: 'Brunej', text: 'Brunej' },
        { value: 'Bolgarija', text: 'Bolgarija' },
        { value: 'Burkina Faso', text: 'Burkina Faso' },
        { value: 'Burundi ', text: 'Burundi ' },
        { value: 'Kambodža', text: 'Kambodža' },
        { value: 'Kamerun', text: 'Kamerun' },
        { value: 'Kanada', text: 'Kanada' },
        { value: 'Kapverdski otoki (Zelenortski otoki)', text: 'Kapverdski otoki (Zelenortski otoki)' },
        { value: 'Kajmanski otoki', text: 'Kajmanski otoki' },
        { value: 'Srednjeafriška republika', text: 'Srednjeafriška republika' },
        { value: 'Čad', text: 'Čad' },
        { value: 'Čile', text: 'Čile' },
        { value: 'Kitajska', text: 'Kitajska' },
        { value: 'Božični otok', text: 'Božični otok' },
        { value: 'Kokosovi in Keelingovi otoki', text: 'Kokosovi in Keelingovi otoki' },
        { value: 'Kolumbija', text: 'Kolumbija' },
        { value: 'Komori', text: 'Komori' },
        { value: 'Kongo', text: 'Kongo' },
        { value: 'Demokratična republika Kongo', text: 'Demokratična republika Kongo' },
        { value: 'Cookovi otoki', text: 'Cookovi otoki' },
        { value: 'Kostarika', text: 'Kostarika' },
        { value: 'Slonokoščena obala', text: 'Slonokoščena obala' },
        { value: 'Hrvaška', text: 'Hrvaška' },
        { value: 'Kuba', text: 'Kuba' },
        { value: 'Kurasao', text: 'Kurasao' },
        { value: 'Ciper', text: 'Ciper' },
        { value: 'Češka', text: 'Češka' },
        { value: 'Danska', text: 'Danska' },
        { value: 'Džibuti', text: 'Džibuti' },
        { value: 'Dominika', text: 'Dominika' },
        { value: 'Dominikanska republika', text: 'Dominikanska republika' },
        { value: 'Ekvador', text: 'Ekvador' },
        { value: 'Egipt', text: 'Egipt' },
        { value: 'Salvador', text: 'Salvador' },
        { value: 'Ekvatorialna Gvineja', text: 'Ekvatorialna Gvineja' },
        { value: 'Eritreja', text: 'Eritreja' },
        { value: 'Estonija', text: 'Estonija' },
        { value: 'Etiopija', text: 'Etiopija' },
        { value: 'Falkalndski otoki', text: 'Falkalndski otoki' },
        { value: 'Ferski otoki', text: 'Ferski otoki' },
        { value: 'Fidži', text: 'Fidži' },
        { value: 'Finska', text: 'Finska' },
        { value: 'Francija', text: 'Francija' },
        { value: 'Francoska Gvajana', text: 'Francoska Gvajana' },
        { value: 'Francoska Polinezija', text: 'Francoska Polinezija' },
        { value: 'Francoska južna ozemlja', text: 'Francoska južna ozemlja' },
        { value: 'Gabon', text: 'Gabon' },
        { value: 'Gambija', text: 'Gambija' },
        { value: 'Gruzija', text: 'Gruzija' },
        { value: 'Nemčija', text: 'Nemčija' },
        { value: 'Gana', text: 'Gana' },
        { value: 'Gibraltar', text: 'Gibraltar' },
        { value: 'Grčija', text: 'Grčija' },
        { value: 'Grenlandija', text: 'Grenlandija' },
        { value: 'Grenada', text: 'Grenada' },
        { value: 'Guadeloupe', text: 'Guadeloupe' },
        { value: 'Guam', text: 'Guam' },
        { value: 'Gvatemala', text: 'Gvatemala' },
        { value: 'Otok Guernsey', text: 'Otok Guernsey' },
        { value: 'Gvineja', text: 'Gvineja' },
        { value: 'Gvineja-Bissau', text: 'Gvineja-Bissau' },
        { value: 'Gvajana', text: 'Gvajana' },
        { value: 'Haiti', text: 'Haiti' },
        { value: 'Otok Heard in otočje McDonald', text: 'Otok Heard in otočje McDonald' },
        { value: 'Vatikan', text: 'Vatikan' },
        { value: 'Honduras', text: 'Honduras' },
        { value: 'Hong Kong', text: 'Hong Kong' },
        { value: 'Madžarska', text: 'Madžarska' },
        { value: 'Islandija', text: 'Islandija' },
        { value: 'Indija', text: 'Indija' },
        { value: 'Indonezija', text: 'Indonezija' },
        { value: 'Iran', text: 'Iran' },
        { value: 'Irak', text: 'Irak' },
        { value: 'Irska', text: 'Irska' },
        { value: 'Otok Man', text: 'Otok Man' },
        { value: 'Izrael', text: 'Izrael' },
        { value: 'Italija', text: 'Italija' },
        { value: 'Jamajka', text: 'Jamajka' },
        { value: 'Japonska', text: 'Japonska' },
        { value: 'Otok Jersey', text: 'Otok Jersey' },
        { value: 'Jordanija', text: 'Jordanija' },
        { value: 'Kazahstan', text: 'Kazahstan' },
        { value: 'Kenija', text: 'Kenija' },
        { value: 'Kiribati', text: 'Kiribati' },
        { value: 'Severna Koreja', text: 'Severna Koreja' },
        { value: 'Južna Koreja', text: 'Južna Koreja' },
        { value: 'Kuvajt', text: 'Kuvajt' },
        { value: 'Kirgizistan (Kirgizija)', text: 'Kirgizistan (Kirgizija)' },
        { value: 'Laos', text: 'Laos' },
        { value: 'Latvija', text: 'Latvija' },
        { value: 'Libanon', text: 'Libanon' },
        { value: 'Lesoto', text: 'Lesoto' },
        { value: 'Liberija', text: 'Liberija' },
        { value: 'Libija', text: 'Libija' },
        { value: 'Lihtenštajn', text: 'Lihtenštajn' },
        { value: 'Litva', text: 'Litva' },
        { value: 'Luksemburg', text: 'Luksemburg' },
        { value: 'Makao', text: 'Makao' },
        { value: 'Makedonija', text: 'Makedonija' },
        { value: 'Madagaskar', text: 'Madagaskar' },
        { value: 'Malavi', text: 'Malavi' },
        { value: 'Malezija', text: 'Malezija' },
        { value: 'Maldivi', text: 'Maldivi' },
        { value: 'Mali', text: 'Mali' },
        { value: 'Malta', text: 'Malta' },
        { value: 'Maršalovi otoki', text: 'Maršalovi otoki' },
        { value: 'Martinik', text: 'Martinik' },
        { value: 'Mavretanija', text: 'Mavretanija' },
        { value: 'Mauricius (Moris)', text: 'Mauricius (Moris)' },
        { value: 'Francoska skupnost Mejot', text: 'Francoska skupnost Mejot' },
        { value: 'Mehika', text: 'Mehika' },
        { value: 'Mikronezija', text: 'Mikronezija' },
        { value: 'Moldavija', text: 'Moldavija' },
        { value: 'Monako', text: 'Monako' },
        { value: 'Mongolija', text: 'Mongolija' },
        { value: 'Črna Gora', text: 'Črna Gora' },
        { value: 'Montserat', text: 'Montserat' },
        { value: 'Maroko', text: 'Maroko' },
        { value: 'Mozambik', text: 'Mozambik' },
        { value: 'Mjanmar', text: 'Mjanmar' },
        { value: 'Namibija', text: 'Namibija' },
        { value: 'Nauru', text: 'Nauru' },
        { value: 'Nepal', text: 'Nepal' },
        { value: 'Nizozemska', text: 'Nizozemska' },
        { value: 'Nova Kaledonija', text: 'Nova Kaledonija' },
        { value: 'Nova Zelandija', text: 'Nova Zelandija' },
        { value: 'Nikaragva', text: 'Nikaragva' },
        { value: 'Niger ', text: 'Niger ' },
        { value: 'Nigerija', text: 'Nigerija' },
        { value: 'Niu', text: 'Niu' },
        { value: 'Otok Norflok', text: 'Otok Norflok' },
        { value: 'Severni Marianski otoki', text: 'Severni Marianski otoki' },
        { value: 'Norveška', text: 'Norveška' },
        { value: 'Oman', text: 'Oman' },
        { value: 'Pakistan', text: 'Pakistan' },
        { value: 'Palau ', text: 'Palau ' },
        { value: 'Palestina', text: 'Palestina' },
        { value: 'Panama', text: 'Panama' },
        { value: 'Papua Nova Gvineja', text: 'Papua Nova Gvineja' },
        { value: 'Paragvaj', text: 'Paragvaj' },
        { value: 'Peru', text: 'Peru' },
        { value: 'Filipini', text: 'Filipini' },
        { value: 'Pitcairnovi otoki', text: 'Pitcairnovi otoki' },
        { value: 'Poljska', text: 'Poljska' },
        { value: 'Portugalska', text: 'Portugalska' },
        { value: 'Portoriko', text: 'Portoriko' },
        { value: 'Katar', text: 'Katar' },
        { value: 'Francoska skupnost Reunion', text: 'Francoska skupnost Reunion' },
        { value: 'Romunija', text: 'Romunija' },
        { value: 'Ruska federacija', text: 'Ruska federacija' },
        { value: 'Ruanda', text: 'Ruanda' },
        { value: 'Sveti Bartolomej', text: 'Sveti Bartolomej' },
        { value: 'Sveta Helena', text: 'Sveta Helena' },
        { value: 'Sveti Kits in Nevis', text: 'Sveti Kits in Nevis' },
        { value: 'Sveta Lucija', text: 'Sveta Lucija' },
        { value: 'Otok svetega Martina', text: 'Otok svetega Martina' },
        { value: 'Sveta Pierre in Miquelon', text: 'Sveta Pierre in Miquelon' },
        { value: 'Sveti Vincent in Grenadini', text: 'Sveti Vincent in Grenadini' },
        { value: 'Samoa', text: 'Samoa' },
        { value: 'San Marino', text: 'San Marino' },
        { value: 'Sao Tome in Principe', text: 'Sao Tome in Principe' },
        { value: 'Savdska Arabija', text: 'Savdska Arabija' },
        { value: 'Senegal', text: 'Senegal' },
        { value: 'Srbija', text: 'Srbija' },
        { value: 'Sejšeli', text: 'Sejšeli' },
        { value: 'Siera Leone', text: 'Siera Leone' },
        { value: 'Singapur', text: 'Singapur' },
        { value: 'Otok svetega.Martina (Nizozemska)', text: 'Otok svetega.Martina (Nizozemska)' },
        { value: 'Slovaška', text: 'Slovaška' },
        { value: 'Slovenija', text: 'Slovenija' },
        { value: 'Solomonovi otoki', text: 'Solomonovi otoki' },
        { value: 'Somalija', text: 'Somalija' },
        { value: 'Južna afrika', text: 'Južna afrika' },
        { value: 'Južna Georgia in Južni Sandwichevi otoki', text: 'Južna Georgia in Južni Sandwichevi otoki' },
        { value: 'Južni Sudan', text: 'Južni Sudan' },
        { value: 'Španija', text: 'Španija' },
        { value: 'Šri Lanka', text: 'Šri Lanka' },
        { value: 'Sudan', text: 'Sudan' },
        { value: 'Surinam', text: 'Surinam' },
        { value: 'Svalbard in Jan Majen ', text: 'Svalbard in Jan Majen ' },
        { value: 'Svazi', text: 'Svazi' },
        { value: 'Švedska', text: 'Švedska' },
        { value: 'Švica', text: 'Švica' },
        { value: 'Sirija', text: 'Sirija' },
        { value: 'Tajvan', text: 'Tajvan' },
        { value: 'Tadžikistan', text: 'Tadžikistan' },
        { value: 'Tanzanija', text: 'Tanzanija' },
        { value: 'Tajska', text: 'Tajska' },
        { value: 'Vzhodni Timor', text: 'Vzhodni Timor' },
        { value: 'Togo', text: 'Togo' },
        { value: 'Tokelau', text: 'Tokelau' },
        { value: 'Tonga', text: 'Tonga' },
        { value: 'Trinidad in Tobago', text: 'Trinidad in Tobago' },
        { value: 'Tunizija', text: 'Tunizija' },
        { value: 'Turčija', text: 'Turčija' },
        { value: 'Turkmenistan', text: 'Turkmenistan' },
        { value: 'Tirški in Kajkoški otoki', text: 'Tirški in Kajkoški otoki' },
        { value: 'Tuvalu', text: 'Tuvalu' },
        { value: 'Uganda', text: 'Uganda' },
        { value: 'Ukrajina', text: 'Ukrajina' },
        { value: 'Združeni Arabski Emirati', text: 'Združeni Arabski Emirati' },
        { value: 'Velika Britanija', text: 'Velika Britanija' },
        { value: 'Združene države Amerike', text: 'Združene države Amerike' },
        { value: 'ZDA zunanji otoki', text: 'ZDA zunanji otoki' },
        { value: 'Urugvaj', text: 'Urugvaj' },
        { value: 'Uzbekistan', text: 'Uzbekistan' },
        { value: 'Republika Vanuatu', text: 'Republika Vanuatu' },
        { value: 'Venezuela', text: 'Venezuela' },
        { value: 'Vietnam', text: 'Vietnam' },
        { value: 'Britanski Deviški otoki', text: 'Britanski Deviški otoki' },
        { value: 'Ameriški Deviški otoki', text: 'Ameriški Deviški otoki' },
        { value: 'Otočje Valis in Futuna', text: 'Otočje Valis in Futuna' },
        { value: 'Zahodna Sahara', text: 'Zahodna Sahara' },
        { value: 'Jemen', text: 'Jemen' },
        { value: 'Zambija', text: 'Zambija' },
        { value: 'Zimbabve', text: 'Zimbabve' },
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
        '4000,	Kranj ',
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
        '1000,	Ljubljana ',
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
        '2000,	Maribor ',
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
        '9000,	Murska Sobota ',
        '9001,	Murska Sobota - poštni predali',
        '2366,	Muta',
        '4202,	Naklo',
        '3331,	Nazarje',
        '1357,	Notranje Gorice',
        '3203,	Nova Cerkev',
        '5000,	Nova Gorica ',
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
        '3320,	Velenje ',
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
        '1001001 Multimedija UN-I. ST',
        '1000407 Računalništvo in matematika UN-I. ST',
        '1000468 Računalništvo in informatika UN-I. ST',
        '1000469 Upravna informatika UN-I. ST',
        '1000470 Računalništvo in informatika VS-I. ST',
        '1000471 Računalništvo in informatika MAG-II. ST',
        '1000472 Kognitivna znanost MAG-II. ST',
        '1000934 Računalništvo in matematika MAG-II. ST',
        '7002801 Pedagoško računalništvo in informatika MAG-II. ST',
        '1000474 Računalništvo in informatika DR-III. ST',
      ],
      course_types: [
        '16203 Visokošolska strokovna izobrazba (prva bolonjska stopnja)',
        '16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)',
        '17003 Magistrska izobrazba (druga bolonjska stopnja)',
        '18202 Doktorat znanosti (tretja bolonjska stopnja)',
      ],
      enrollment_types: [
        '01 - Prvi vpis v letnik/dodatno leto',
        '02 - Ponavljanje letnika',
        '03 - Nadeljevanje letnika',
        '04 - Podaljšanje statusa študenta',
        '05 - Vpis po merilih za prehode v višji letnik',
        '06 - Vpis v semester skupnega št. programa',
        '07 - Vpis po merilih za prehode v isti letnik',
      ],
      study_year: ['1.', '2.', '3.', '4.', '5.', '6.', 'dodatno leto',],
      study_type: ['1 redni', '3 izredni'],
      study_form: ['1 na lokaciji', '2 na daljavo', '3 e-študij'],
      studyYears
    }
  },
  components: {
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
      this.$snotify.async('Saved', 'saved', () => new Promise((resolve, reject) =>
        resolve({
          config: {
            closeOnClick: true,
            timeout: 2000,
          },
        })
      ));
    },
  },
})
export default class Profile extends Vue {}
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
  .university-image {
    margin-top: 3em;
    margin-bottom: 3em;
  }
 
</style>
