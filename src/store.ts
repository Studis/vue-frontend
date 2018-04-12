import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    role: 'null', // ['ADMIN', 'CLERK', 'LECTURER', 'STUDENT']
    token: '',
    userId: ''
  },
  mutations: {
    cAuth(state, newValue) {
      state.token = newValue;
    },
    updateUserId(state, newValue): void {
      state.userId = newValue;
    },
    updateRole (state, newRole) {
      state.role = newRole
    }
  },
  actions: {
    verifyToken (state, payload): boolean {
      console.log('payload')
      return true
    }
  },
  getters: {
    getRole (state):string {
      return state.role
    },
    getToken (state):string {
      return state.token
    }
  }
});
