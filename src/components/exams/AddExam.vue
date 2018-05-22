<template>
    <div>
        <h3>Vnos izpitnih rokov</h3>
        <b-table stacked="md" hover
             :items="subjects"
             :fields="fields"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :current-page="currentPage"
             :per-page="perPage"
             @filtered="onFiltered">
             <template slot="add_exam" slot-scope="data">
                <b-btn size="sm" variant="success" @click="show_addExam(data)">Dodaj</b-btn>
             </template>
    </b-table>
     <template slot="index" slot-scope="data">
      {{data.item.id}}
    </template>
     <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    <b-modal ref="dodajRok" size="lg">
      <b-container fluid>
        <h3>Dodaj izpitne roke</h3>
        <br>
        <p class="naslov">1. Izpitni rok</p>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Datum">
                    <b-form-input type="date" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group label="Ura">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group style="margin-top: 30px">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <p class="naslov">2. Izpitni rok</p>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Datum">
                    <b-form-input type="date" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group label="Ura">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group style="margin-top: 30px">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <p class="naslov">3. Izpitni rok</p>
        <b-row>
            <b-col sm="4">
                <b-form-group label="Datum">
                    <b-form-input type="date" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group label="Ura">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col sm="2">
                <b-form-group style="margin-top: 30px">
                    <b-form-input type="number" class="mb-3">
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
      </b-container>    
    </b-modal>
    <br>
    <b-button type="reset" variant="danger" @click.prevent="goBack">Nazaj</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'AddExam',
    components: {},
    data() {
        return {
            subjects: [
                {
                    id: 1,
                    name: 'Algoritmi in podatkovne strukture 2',
                    lecturer: 'Borut Robič'
                },
                {
                    id: 2,
                    name: 'Operacijski sistemi',
                    lecturer: 'Borut Robič'
                },
            ],
            fields: [
                { key: 'id', label: '#', sortable: true },
                { key: 'name', label: 'Ime predmeta', sortable: true },
                { key: 'lecturer', label: 'Izvajalec', sortable: true },
                { key: 'add_exam', label: '', sortable: false },
            ],
            filter: null,
            sortBy: '',
            sortDesc: '',
            onFiltered: null,
            currentPage: 1,
            perPage: 5,
            totalRows: 0,
            pageOptions: [ 5, 10, 15 ],
        }
    },
    components: {},
    methods: {
        show_addExam(data) {this.$refs.dodajRok.show();},
        goBack () {
            this.$router.push({name: 'login'})
        },
    },
    mounted: {
    },
}
</script>

<style lang="scss">
.naslov {
    font-size: 18px;
    font-weight: bold;
}
</style>
