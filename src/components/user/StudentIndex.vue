<template>
  <div>
    <h2>Index</h2>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";
import axios from "axios";
import rest from "../../rest.js";
import pdfmake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {},
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
          if (this.actions) this.fields.push({key: "btns", label: "Actions"})
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
    formatDate(date) {
      var day = date.getDate();
      var monthIndex = date.getMonth()+1;
      var year = date.getFullYear();

      return day + '.' + monthIndex + '.' + year;
    },
    generatePDF() {
      var doc = {
        content: [],
        footer: (currentPage, pageCount, pageSize)=> { 
          return [
            { text: "Kartotečni list     | Page "+currentPage.toString() + ' of ' + pageCount+'         .', alignment: 'right'},
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
      doc.content.push({ text: "Kartotečni list", style: 'header' });
      var student = this.response[0].enrollment.token.student;
      doc.content.push(student.name+" "+student.surname)
      doc.content.push(" ")
      this.response.forEach(e => {
        doc.content.push(" ")
        doc.content.push(" ")
        doc.content.push({text: e.enrollment.token.program.title, alignment: 'center'})
        doc.content.push(" ")
        doc.content.push({columns: [
          {
            width: '30%',
            stack: [
              "Študijsko leto: "+e.enrollment.curriculum.year.toString,
              "Letnik: "+e.enrollment.token.studyYear.id,
              "Način: "+e.enrollment.studyType.name
            ]
          },
          {
            width: '70%',
            stack: [
              "Smer: Ni smeri",
              "Vrsta vpisa: "+e.enrollment.type.name,
              "Skupina: LJUBLJANA"
            ]
          }
        ]})
        var table = {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ 'auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: [
              [ "#", "Šifra", "Predmet", "ECTS", "Predavatelj", "Datum", "Ocena", "Št. polaganj" ]
            ]
          },
          style: 'tableStyle'
        };
        var i = 0;
        for(var rowIndex in e.index){
          var row = e.index[rowIndex]
          var tableRow = [
            (i++)+"",
            row.courseExecution.course.id,
            row.courseExecution.course.name,
            row.courseExecution.course.ects,
          ]
          if(row.examEnrollment){
            tableRow.push(row.examEnrollment.exam.asking)
            tableRow.push(this.formatDate(new Date(Date.parse(row.examEnrollment.exam.scheduledAt))))
            tableRow.push(row.examEnrollment.mark)
            tableRow.push(row.examEnrollment.totalExamAttempts)
          }
          table.table.body.push(tableRow)
        }
        doc.content.push(table);
      });
      

      pdfMake.createPdf(doc).download();
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
        for (var columnKeyIndex in this.printFields) {
          var columnKey = this.printFields[columnKeyIndex]
          csvContent += (line[columnKey.key]?line[columnKey.key]:"") + ",";
        }
        csvContent += "\r\n";
      }
      this.download("export.csv", csvContent);
    },
    load(all){
      console.log("load")
      axios.get(`/index/${this.id}/`+(all?`all`:`last`))
      .then((response)=>{
        this.response = response.data
        console.log(this.response)
        this.generatePDF()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  mounted() {
    this.load(true)
  },
  data() {
    return {
      response: null,
      fields: [],
      items: [],
    };
  },
  props: ["id"]
};
</script>

<style lang="scss">
.actionBtn {
  margin: 0.2em;
}
</style>
