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
            alignment:'right',
            fontSize:12
          }
        }
      };
      
      
      docDefinition.content = [
        {width: 150, alignment: 'center', image: images.fri_logo()},
        " ", " ",
        {
          columns:[
            {
              width: '50%',
              stack: [
                {text: "IME PRIIMEK", style: 'bold'},
                {text: "Večna pot 12", style: 'normal'},
                {text: "1000 Ljubljana", style: 'normal'}
              ]
            },
            {
              width: '50%',
              stack:[
                {text: "Večna pot 113", style: 'signature'},
                {text: "1000 Ljubljana", style: 'signature'}
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
                { text: "Kraj rojstva", style: 'tag' },
                { text: "Ljubljana", style: 'bold' }
              ]
            },
            {
              width: '33%',
              stack:[
                { text: "Priimek, ime", style: 'tag' },
                { text: "PRIIMEK, IME", style: 'bold' },
                " ",
                { text: "Študijsko leto", style: 'tag' },
                { text: "2017/18", style: 'bold' }
              ]
            },
            {
              width: '33%',
              stack:[
                { text: "Datum rojstva", style: 'tag' },
                { text: "1.1.2018", style: 'bold' },
                " ",
                { text: "Vrsta vpisa", style: 'tag' },
                { text: "Prvi vpis v letnik", style: 'bold' }
              ]
            }
          ]
        },
        
        { text: "Način in oblika študija", style: 'tag' },
        { text: "Redni študij", style: 'bold' },
        { text: "Letnik/dodatno leto", style: 'tag' },
        { text: "1. letnik", style: 'bold' },
        { text: "Študijski program", style: 'tag' },
        { text: "RAČUNALN. IN INFORM. UN-I.ST", style: 'bold' },
        { text: "Smer/usmeritev/modul/znanstveno področje", style: 'tag' },
        { text: "-", style: 'bold' },
        { text: "Vrsta in stopnja študija", style: 'tag' },
        { text: "16204 Visokošolska univerzitetna izobrazba (prva bolonjska stopnja)", style: 'bold' },

        { text: "dekan", style: 'signature' },
        { text: "Gašper Fijavž", style: 'signature' },
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
