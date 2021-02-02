import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
import moduleOrders from './modules/orders'
import moduleMenus from './modules/menus'
import moduleCategories from './modules/categories'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiURL: process.env.VUE_APP_APIURL,
    searchBarStatus: false,
    sideBarStatus: false
  },
  getters: {
    searchBarStatus: state => state.searchBarStatus,
    sideBarStatus: state => state.sideBarStatus
  },
  mutations: {
    toggleSearch (state) {
      state.searchBarStatus = !state.searchBarStatus
    },
    toggleSidebar (state) {
      state.sideBarStatus = !state.sideBarStatus
    }
  },
  actions: {
    toggleSearch ({ commit }) {
      commit('toggleSearch')
    },
    toggleSidebar ({ commit }) {
      commit('toggleSidebar')
    }
  },
  modules: {
    auth: moduleAuth,
    menus: moduleMenus,
    orders: moduleOrders,
    categories: moduleCategories
  }
})

export default store
