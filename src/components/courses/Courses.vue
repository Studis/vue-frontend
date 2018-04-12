<template>
  <div>
    <h2>Courses</h2>
    <br><br>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :fields="fields">
      <template slot="name" slot-scope="data">
        <b-link :to="{ name: 'course', params: { courseId: data.item.id }}">{{data.item.name}}</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Router from 'vue-router'
import axios from 'axios';
import rest from './../../rest.js'

export default {
  components: {
  },
  methods: {
  },
  created(){
    axios.get(`courses/`)
      .then((response) => {
        console.log(response.data);
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data(){
    return {
      sortBy: 'name',
      sortDesc: false,
      fields: [
        { key: 'name', sortable: true },
        { key: 'code', sortable: true },
        { key: 'module.name', sortable: true},
        { key: 'module.semester.year.toString', sortable: true, label: "Year" },
      ],
      items: [],
      course: {}
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
