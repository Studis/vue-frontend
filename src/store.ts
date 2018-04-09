import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    role: 'none' // ['none',student', 'referent', 'ucitelj', 'skrbnik']
  },
  mutations: {
    cAuth(state, newValue) {
      state.isAuth = newValue;
    },
  },
  actions: {
  },
  getters: {
    role (state) {
      return state.role
    }
  }
});
