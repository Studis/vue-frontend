<template>
  <div>
    <h2>Predmeti</h2>
    <br><br>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Iskanje" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Vpišite iskalni niz..." />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Izbriši</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
    </b-col>
    <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             :items="items"
             :filter="filter"
             @filtered="onFiltered"
             :fields="fields">         
    <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
      <template slot="name" slot-scope="data">
        <b-link :to="{ name: 'course', params: { courseId: data.item.id }}">{{data.item.name}}</b-link>
      </template>
    </b-table>
    <b-col md="6" class="my-1">
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>
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
        this.totalRows = response.data.length
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    // TODO: sorting on Module Name and Year is not working properly
    return {
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', label: '#', sortable: true },
        { key: 'name', label: 'Ime', sortable: true },
        { key: 'code', label: 'Šifra', sortable: true },
        { key: 'module.name', label: 'Modul', sortable: true},
        { key: 'module.semester.year.toString', label: 'Semester', sortable: true },
      ],
      items: [],
      course: {},
      currentPage: 1,
      perPage: 12,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      totalRows: 0
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
