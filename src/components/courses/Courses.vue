<template>
  <div>
    <h2>Courses</h2>
    <br><br>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Search students" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
    </b-col>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :filter="filter"
             @filtered="onFiltered"
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
    onFiltered (filteredItems) {

      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  mounted(){
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
      course: {},
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      filter: null
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
