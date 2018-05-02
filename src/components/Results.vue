<template>
  <div>
    <h2>{{this.title}}</h2>
    <b-list-group>
        <b-list-group-item v-for="detail in details" :key="detail.title">
            {{detail.title}} <strong>{{detail.value}}</strong>
        </b-list-group-item>
    </b-list-group>
    <br><br>
    <b-col md="6" class="my-1">
        <b-form-group horizontal label="Search" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
            <b-button v-on:click="generatePDF">PDF</b-button>
            <b-button v-on:click="generateCSV">CSV</b-button>
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
      <template slot="open" slot-scope="data">
        <b-link :to="{ name: entityName, params: { id: data.item.id }}">Open</b-link>
      </template>
    </b-table>
    <b-col md="6" class="my-1">
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";
import axios from "axios";
import rest from "./../rest.js";
import jsPDF from "jspdf";
import jspdfautotable from "jspdf-autotable";

export default {
  components: {},
  watch: {
    content: {
      handler: function(newVal, oldVal) {
        var content = newVal.content;
        var fieldNames = newVal.fieldNames;

        if (this.indexes) {
          content = content.map((e, i) => {
            e["#"] = i + 1;
            return e;
          });
        }

        if (!fieldNames) {
          this.totalRows = content.length;
          var columns = {};
          content.forEach(e => {
            for (var prop in e) {
              columns[prop] = true;
            }
          });
          this.fields = [{key: "open", label: "Open"}];
          for (var columnName in columns) {
            var element = {
              key: columnName,
              sortable: true,
              title: this.capitalizeFirstLetter(columnName),
              dataKey: columnName
            };
            if (columnName == "#") this.fields.unshift(element);
            else if(columnName != "id") this.fields.push(element);
          }
          
        } else this.fields = fieldNames;
        this.sortBy = this.fields[0].key;

        this.items = content;
      }
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    generatePDF() {
      var doc = new jsPDF();
      var totalPagesExp = "{total_pages_count_string}";

      var pageContent = data => {
        // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        doc.text(this.title, data.settings.margin.left + 15, 20);

        doc.setFontSize(8);
        
        for (var i in this.details) {
          var property = this.details[i];
          var value;
          if (typeof property.value[i] === "string") {
            value = property.value.replace("č", "c").replace("Č", "C");
          }
          else value = property.value;
          doc.text(
            property.title + ": " + value,
            data.settings.margin.left + 20,
            26 + i * 5
          );
        }

        // FOOTER
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(
          str,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      };
      var clearedContent = this.items.map(c => {
        for (var i in c) {
          if (typeof c[i] === "string") {
            c[i] = c[i].replace("č", "c");
            c[i] = c[i].replace("Č", "C");
          }
        }
        return c;
      });
      doc.autoTable(this.fields, clearedContent, {
        addPageContent: pageContent,
        margin: { top: 25 + this.details.length * 5 }
      });

      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === "function") {
        doc.putTotalPages(totalPagesExp);
      }
      doc.save("table.pdf");
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
      for (var lineKey in this.items) {
        var line = this.items[lineKey];
        for (var columnKeyIndex in this.fields) {
          var columnKey = this.fields[columnKeyIndex]
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
      sortBy: "name",
      sortDesc: false,
      fields: [],
      items: [],
      course: {},
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      totalRows: 0
    };
  },
  props: ["title", "indexes", "content", "entityName", "details"]
};
</script>

<style lang="scss">

</style>
