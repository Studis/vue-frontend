<template>
  <div>
    <h2>{{this.title}}</h2>
    <div v-show="!isBusy">
    <slot></slot>
    <b-list-group>
        <b-list-group-item v-for="detail in details" :key="detail.title">
            {{detail.title}} <strong>{{detail.value}}</strong>
        </b-list-group-item>
    </b-list-group>
    <br><br>

    <b-row>
    <b-col md="5" class="my-0">
      <div class="pull-left">
        <div>
          <b-button v-on:click="generatePDF" class="btn-warning mx-1">PDF</b-button>
          <b-button v-on:click="generateCSV" class="btn-warning">CSV</b-button>
        </div>
      </div>
    </b-col>
    <b-col md="7" class="my-1">
      <div class="pull-left">
        <div>
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Iskanje" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" class="btn-dark">Pobriši</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </b-col>
    </b-row>

    <b-table :sort-by.sync="sortBy"
             :busy.sync="isBusy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             :items="items"
             :filter="filter"
             @filtered="onFiltered"
             :fields="fields">

      <template slot="btns" slot-scope="data" v-if="actions">
        <b-button v-for="action in actions" v-if="action.name == 'Open' || action.name == 'Details' || (('vhide' in action && !data.item[action.vhide]) || ('vshow' in action && data.item[action.vshow])) " class="actionBtn" :key="action.name" @click.prevent="updateButtons(data.item,action.name)" :ref="'btn-add-'+data.item.id" :class="action.classColor">{{action.name}}</b-button>
      </template>
    </b-table>
    <b-col md="6" class="my-1">
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>
    </div>
  </div>
</template>

<script>

import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";
import axios from "axios";
import rest from "./../rest.js";
import jsPDF from "jspdf";
import jspdfautotable from "jspdf-autotable";
import pdfmake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {
  },
  watch: {
    content: {
      handler: function(newVal, oldVal) {
        var content = JSON.parse(JSON.stringify(newVal.content));
        var fieldNames = newVal.fieldNames;
        var columns = {};
        content.forEach(e => {
          for (var prop in e) {
            columns[prop] = true;
          }
        });

        content.sort(function(a,b){
          for (var columnName in columns) {
            if(columnName == "id") continue;
            var v1 = a[columnName];
            var v2 = b[columnName];
            if(v1 != v2){
              // console.log(columnName+": "+v1+" vs "+v2)
              return String(v1).localeCompare(String(v2));
            }
          }
          return 0;
        });

        if (this.indexes) {
          content = content.map((e, i) => {
            e["#"] = i + 1;
            return e;
          });
          columns["#"] = true;
        }

        if (!fieldNames) {
          this.totalRows = content.length;
          
          // this.fields = [{key: "open", label: "Open"}];
          this.printFields = [];
          if (this.actions) this.fields.push({key: "btns", label: "Možnosti"})
          for (var columnName in columns) {
            var element = {
              key: columnName,
              sortable: true,
              title: this.capitalizeFirstLetter(columnName),
            };
            
            if (columnName == "#") {
              this.fields.unshift(element);
              this.printFields.unshift(element);
            }
            else if(columnName != "id") {
              this.fields.push(element);
              this.printFields.push(element);
            }
          }
          
        } else {
          this.fields = fieldNames;
          this.printFields = fieldNames;
        }
        this.sortBy = this.sortByField || this.fields[0].key;

        this.items = content;
        this.isBusy = false
      },
      deep: true
    }
  },
  methods: {
    updateButtons (item,actionName) {
      // this.$set(item, 'actionName', actionName)
      let tmpObj = {}
      tmpObj = Object.assign({}, tmpObj, { clickedItem: item, actionName: actionName })
      // tmpObj.actionName = actionName
      // this.$set(tmpObj, 'actionName', actionName)
      this.$emit('b-click-id', tmpObj)
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    generatePDF() {

        var docDefinition = {
          pageOrientation: this.landscape?'landscape':'portrait',
        content: [],
        footer: (currentPage, pageCount, pageSize)=> { 
          return [
            { text: this.title+" | Generirano: "+this.formatDate(new Date())+" | Stran "+currentPage.toString() + ' / ' + pageCount+'         .', alignment: 'right'},
            { canvas: [ { type: 'rect', x: 270, y: pageSize.height-132, w: pageSize.width - 170, h: 40 } ] }
          ]
        },
        styles: {
          header: {
            fontSize: 22,
            bold: true
          },
          propertyStyle:{
            fontSize: 14
          },
          tableStyle:{fontSize: 8}
        }
      };
      docDefinition.content.push({ text: this.title, style: 'header' });
      docDefinition.content.push(" ")
      for (var i in this.details) {
        var property = this.details[i].title + ": " + this.details[i].value;
        docDefinition.content.push({text: property, style: 'propertyStyle'})
      }
      docDefinition.content.push(" ")

      var table = {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: [ ],
          body: [
            [  ]
          ]
        },
        style: 'tableStyle'
      };
      for(var column in this.printFields){
        table.table.body[0].push(this.printFields[column].title)
        table.table.widths.push('auto')
      }
      for(var rowIndex in this.items){
        var row = this.items[rowIndex]
        var tableRow = []
        for(var column in this.printFields){
          var key = this.printFields[column].key
          if(row[key]) tableRow.push(row[key])
          else tableRow.push("")
        }
        table.table.body.push(tableRow)
      }
      docDefinition.content.push(table);

      pdfMake.createPdf(docDefinition).download();
    },
    formatDate(date) {
      var day = date.getDate();
      var monthIndex = date.getMonth()+1;
      var year = date.getFullYear();

      return day + '.' + monthIndex + '.' + year;
    },
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    generateCSV() {
      var csvContent = "";
      for (var columnKeyIndex in this.printFields) {
        var columnKey = this.printFields[columnKeyIndex]
        csvContent += columnKey.title + ",";
      }
      csvContent += "\r\n";
      for (var lineKey in this.items) {
        var line = this.items[lineKey];
        for (var columnKeyIndex in this.printFields) {
          var columnKey = this.printFields[columnKeyIndex]
          csvContent += (line[columnKey.key]?line[columnKey.key]:"") + ",";
        }
        csvContent += "\r\n";
      }
      this.download("export.csv", csvContent);
    }
  },
  mounted() {
    
  },
  data() {
    return {
      isBusy: true,
      sortBy: "name",
      sortDesc: this.sortDescending || false,
      fields: [],
      items: [],
      course: {},
      currentPage: 1,
      perPage: 8,
      pageOptions: [5, 10, 15],
      filter: null,
      totalRows: 0,
      printFields: []
    };
  },
  props: ["title", "landscape", "indexes", "content", "entityName", "details", "sortByField","actions","sortDescending"]
};
</script>

<style lang="scss">
.actionBtn {
  margin: 0.2em;
}
</style>
