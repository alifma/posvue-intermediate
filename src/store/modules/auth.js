import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      cashier: localStorage.getItem('cashier') || null
    }
  },
  getters: {
    getToken: state => state.token,
    getCashier: state => state.cashier
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setCashier (state, payload) {
      state.cashier = payload
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
        context.commit('setCashier', '')
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
