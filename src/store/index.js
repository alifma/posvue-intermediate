import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiURL: process.env.VUE_APP_APIURL
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth: moduleAuth
  }
})

export default store
