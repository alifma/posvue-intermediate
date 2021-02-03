import Vue from 'vue'
import axios from 'axios'
const moduleMenus = {
  namespaced: true,
  state: () => {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      menus: [],
      isLoading: true,
      searchName: '',
      page: []
    }
  },
  getters: {
    menus: state => state.menus,
    page: state => state.page
  },
  mutations: {
    setMenus (state, payload) {
      state.menus = payload
    },
    setPage (state, payload) {
      state.page = payload.map(i => state.apiURL + '/menus' + i)
    }
  },
  actions: {
    getMenus (context, data) {
      axios.get(`${context.state.apiURL}/menus?name=${data}`, { headers: { token: context.rootState.auth.token } })
        .then((response) => {
          if (response.data.data.length > 0) {
            context.commit('setPage', response.data.pagination.listPages)
            context.commit('setMenus', response.data.data)
          } else {
            Vue.swal({ icon: 'error', title: 'Nothing Found' })
          }
        })
        .catch((err) => {
          console.log(err)
          // state.menusIsLoading = false
          // this.commit('alertError', err.message)
          // state.menus = []
        })
    },
    getMenusByUrl (context, url) {
      axios.get(`${url}`, { headers: { token: context.rootState.auth.token } })
        .then((response) => {
          console.log(response.data)
          if (response.data.data.length > 0) {
            context.commit('setPage', response.data.pagination.listPages)
            context.commit('setMenus', response.data.data)
          } else {
            Vue.swal({ icon: 'error', title: 'Nothing Found' })
          }
        })
        .catch((err) => {
          console.log(err)
          // state.menusIsLoading = false
          // this.commit('alertError', err.message)
          // state.menus = []
        })
    }
  }
}

export default moduleMenus
