import axios from 'axios'
const moduleAuth = {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token') || null
    }
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIURL}/login`, data).then((response) => {
          if (response.data.code === 200) {
            localStorage.setItem('token', response.data.pagination.token)
            context.commit('setToken', response.data.pagination.token)
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
