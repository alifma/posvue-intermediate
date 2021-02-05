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
    getCategories (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/categories?ready=1`, { headers: { token: context.rootState.auth.token } })
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
    },
    addCategories (context, name) {
      const data = { name }
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.apiURL}/categories`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              resolve(response.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    editCategories (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.state.apiURL}/categories/${data.id}`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              resolve(response.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteCategories (context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${context.state.apiURL}/categories/${id}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              resolve(response.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    activateCategories (context, id) {
      const data = { isReady: 1 }
      return new Promise((resolve, reject) => {
        axios.patch(`${context.state.apiURL}/categories/${id}`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              resolve(response.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deactivateCategories (context, id) {
      const data = { isReady: 0 }
      return new Promise((resolve, reject) => {
        axios.patch(`${context.state.apiURL}/categories/${id}`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              resolve(response.data)
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
