import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    role: 'skrbnik', // ['none',student', 'referent', 'ucitelj', 'skrbnik']
    token: '',
    userId: ''
  },
  mutations: {
    cAuth (state, newValue) {
      state.token = newValue
    },
    updateUserId (state, newValue): void {
      state.userId = newValue
    }
  },
  actions: {
    verifyToken (state, payload): boolean {
      console.log('payload')
      return true
    }
  },
  getters: {
    getRole (state): string {
      return state.role
    },
    getToken (state): string {
      return state.token
    }
  }
})
