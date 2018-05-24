<template>
  <div>
      enrollment confirmation
      <b-button v-on:click="generatePDF" class="btn-warning mx-1">PDF</b-button>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Router from "vue-router";
import axios from "axios";
import rest from "./../rest.js";
import images from './../images.js';
import jsPDF from "jspdf";
import jspdfautotable from "jspdf-autotable";
import pdfmake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  components: {},
  watch: {
  },
  methods: {
    generatePDF() {

        var docDefinition = {
        content: [],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
          },
          bold:{
            fontSize: 12,
            bold: true
          },
          normal:{
            fontSize: 12,
          },
          tag:{
            fontSize: 11,
            color: 'gray'
          },
          signature: {
            alignment:'left',
            fontSize:12
          },
          address: {
            fontSize: 7
          }
        }
      };
      
      
      docDefinition.content = [
        {
          columns:[
            {
              width: '33%',
              text: " "
            },
            {
              width: '33%',
              stack: [
                {width: 150, alignment: 'center', image: images.fri_logo()},
              ]
            },
            {width: '11%', text: " "},
            {
              width: '23%',
              text: "Večna pot 113\n1000 LJUBLJANA, SLOVENIJA\ntelefon: 01 47 98 100\nwww.fri.uni-lj.si\ne-mail: dekanat@fri.uni-lj.si",
              style: 'address'
            }
          ]
        },
        " ", " ",
        {
          columns:[
            {
              width: '77%',
              stack: [
                {text: "IME PRIIMEK", style: 'bold'},
                {text: "Večna pot 12", style: 'normal'},
                {text: "1000 Ljubljana", style: 'normal'}
              ]
            },
            {
              width: '23%',
              stack:[
                {text: "Številka: 69491/111", style: 'signature'},
                {text: "Datum: 23.5.2018", style: 'signature'}
              ]
            }
          ]
        },
        " ", " ",
        { text: "POTRDILO O VPISU", style: 'header' },
        " ", " ", " ",
        {
          columns:[
            {
              width: '33%',
              stack: [
                { text: "Vpisna številka", style: 'tag' },
                { text: "63180000", style: 'bold' },
                " ",
                { text: "Datum rojstva", style: 'tag' },
                { text: "1.1.2018", style: 'bold' },
              ]
            },
            {
              width: '33%',
              stack:[
                { text: "Priimek, ime", style: 'tag' },
                { text: "PRIIMEK, IME", style: 'bold' },
                " ",
                { text: "Kraj rojstva", style: 'tag' },
                { text: "Ljubljana", style: 'bold' },
              ]
            },
            {
              width: '33%',
              stack:[
                " ",
                " ",
                " ",
                { text: "Država rojstva", style: 'tag' },
                { text: "SLOVENIJA", style: 'bold' }
              ]
            }
          ]
        },
        " ",
        {
          columns:[
            {
              width: '50%',
              stack: [
                { text: "Študijsko leto", style: 'tag' },
                { text: "2017/18", style: 'bold' },
                " ",
                { text: "Način in oblika študija", style: 'tag' },
                { text: "Redni študij", style: 'bold' },
                " ",
                { text: "Študijski program", style: 'tag' },
                { text: "RAČUNALN. IN INFORM. UN-I.ST", style: 'bold' }
              ]
            },
            {
              width: '50%',
              stack:[
                { text: "Vrsta vpisa", style: 'tag' },
                { text: "Prvi vpis v letnik", style: 'bold' },
                " ",
                { text: "Letnik/dodatno leto", style: 'tag' },
                { text: "1. letnik", style: 'bold' },
                " ",
                { text: "Smer/usmeritev/modul/znanstveno področje", style: 'tag' },
                { text: "-", style: 'bold' }
              ]
            }
          ]
        },
        { text: "Vrsta in stopnja študija", style: 'tag' },
        { text: "16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)", style: 'bold' },
        " ", " ", " ",
        {
          columns:[
            {
              width: '70%',
              text: " "
            },
            {
              width: '30%',
              stack:[
                { text: "prof. dr. Nikolaj Zimic", style: 'signature' },
                { text: "dekan", style: 'signature' }
              ]
            }
          ]
        },
        
      ];

      pdfMake.createPdf(docDefinition).download();
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
    }
  },
  mounted() {
    
  },
  data() {
    return {

    };
  },
  props: []
};
</script>

<style lang="scss">
.actionBtn {
  margin: 0.2em;
}
</style>
