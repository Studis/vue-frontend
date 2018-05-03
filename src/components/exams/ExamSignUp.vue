<template>
  <div>
    <h3>Exam dates</h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Study year</th>
            <th scope="col">Course</th>
            <th scope="col">Professor</th>
            <th scope="col">Date</th>
            <th scope="col">Sign up</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Statisticsc</td>
            <td>Otto</td>
            <td>12.3.2019</td>
            <td><b-button type="" variant="">Sign up</b-button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Programming 1</td>
            <td>Thornton</td>
            <td>{{'2018-01-23T17:37:59Z' | datum}}</td>
            <td><b-button type="" variant="">Sign up</b-button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Programming 2</td>
            <td>the Bird</td>
            <td>12.3.2019</td>
            <td><b-button type="" variant="">Sign up</b-button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  methods: {
  }
})
export default class ExamSignUp extends Vue {}
</script>

<style lang="scss">
 .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  #logintext {
    padding: 0.3em;
  }
</style>
