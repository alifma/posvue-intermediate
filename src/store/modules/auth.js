import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      cashier: localStorage.getItem('cashier') || null,
      access: localStorage.getItem('access') || null
    }
  },
  getters: {
    getToken: state => state.token,
    getCashier: state => state.cashier,
    getAccess: state => state.access
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setCashier (state, payload) {
      state.cashier = payload
    },
    setAccess (state, payload) {
      state.access = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIURL}/login`, data).then((response) => {
          if (response.data.code === 200) {
            localStorage.setItem('token', response.data.pagination.token)
            context.commit('setToken', response.data.pagination.token)
            localStorage.setItem('cashier', response.data.pagination.name)
            context.commit('setCashier', response.data.pagination.name)
            localStorage.setItem('access', response.data.pagination.access)
            context.commit('setAccess', response.data.pagination.access)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout (context) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        context.commit('setToken', null)
        localStorage.removeItem('cashier')
        context.commit('setCashier', null)
        localStorage.removeItem('access')
        context.commit('setAccess', null)
        resolve(true)
      })
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIURL}/register`, data)
          .then((response) => {
            resolve(response)
          }).catch((err) => {
            reject(err)
          })
      })
    }
  }
}

export default moduleAuth
