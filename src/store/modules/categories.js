import axios from 'axios'
const moduleCategories = {
  namespaced: true,
  state: () => {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      categories: []
    }
  },
  getters: {
    categories: state => state.categories
  },
  mutations: {
    setCategories (state, payload) {
      state.categories = payload.map((i) => ({
        value: i.id,
        text: i.name
      }))
    }
  },
  actions: {
    getCategories (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/categories?ready=${data}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.data.length > 0) {
              context.commit('setCategories', response.data.data)
              context.state.isLoading = false
              resolve(response.data.data)
            } else {
              context.state.isLoading = false
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
