import axios from 'axios'
const moduleCategories = {
  namespaced: true,
  state: () => {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      categories: [],
      actCategories: [],
      deactCategories: []
    }
  },
  getters: {
    categories: state => state.categories,
    actCategories: state => state.actCategories,
    deactCategories: state => state.deactCategories
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload.map((i) => ({
        value: i.id,
        text: i.name
      }))
      state.actCategories = payload
    },
    setDeactCategories (state, payload) {
      state.deactCategories = payload
    }
  },
  actions: {
    getCategories (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/categories?ready=${data}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.data.length > 0) {
              context.commit('setCategories', response.data.data)
              resolve(response.data.data)
            } else {
              resolve(response)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDeactCategories (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/categories?ready=0`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.data.length > 0) {
              context.commit('setDeactCategories', response.data.data)
              resolve(response.data.data)
            } else {
              resolve(response)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}

export default moduleCategories
