<template>
  <div>
    <h2>Courses</h2>
    <br><br>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Search" class="mb-0">
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
             :current-page="currentPage"
             :per-page="perPage"
             :items="items"
             :filter="filter"
             @filtered="onFiltered"
             :fields="fields">
      <template slot="name" slot-scope="data">
        <b-link :v-if="entityName" :to="{ name: entityName, params: { courseId: data.item.id }}">{{data.item.name}}</b-link>
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
import rest from './../rest.js'
import jsPDF from 'jspdf'
import jspdfautotable from 'jspdf-autotable'

export default {
  components: {
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    setContent(content, fieldNames, entityName, indexes){
      if(!indexes) indexes = false;

      this.entityName = entityName

      if(!fieldNames){
        this.totalRows = content.length
        var columns = {}
        content.forEach(e => {
          for(var prop in e){
            columns[prop] = true
          }
        })
        this.fields = []
        for(var columnName in columns){
          this.fields.push({key: columnName, sortable:true})
        }
      }
      else this.fields = fieldNames
      this.sortBy = this.fields[0].key

      this.items = content
      
    }
  },
  mounted(){
    this.setContent([{"name": "Žan"}, {"name": "Domen"}, {"name": "Jaka", "surname": "Kordez"}, {"name": "Robi"}], null, false, false)
    var columns = [
    {title: "ID", dataKey: "id"},
    {title: "Name", dataKey: "name"}, 
    {title: "Country", dataKey: "country"}, 
    ];
    var rows = [
        {"id": 1, "name": "Shaw", "country": "Tanzania"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
        {"id": 3, "name": "Garcia", "country": "Madagascar"},
    ];
    
    // Only pt supported (not mm or in) 
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
        styles: {fillColor: [100, 255, 255]},
        columnStyles: {
          id: {fillColor: 255}
        },
        margin: {top: 60},
        addPageContent: function(data) {
          doc.text("Header", 40, 30);
        }
    });
    var doc = new jsPDF();
    var totalPagesExp = "{total_pages_count_string}";

    var pageContent = function (data) {
        // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text("Report", data.settings.margin.left + 15, 22);

        // FOOTER
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
    };
    
    doc.autoTable(columns, rows, {
        addPageContent: pageContent,
        margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }
    doc.save('table.pdf');
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
      filter: null,
      totalRows: 0,
      entityName: false
    };
  },
  props:["courseId"]
}
</script>

<style lang="scss">

</style>
