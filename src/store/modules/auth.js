import Vue from 'vue'
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
            Vue.swal({ icon: 'success', title: 'Login Success' })
            localStorage.setItem('token', response.data.pagination.token)
            context.commit('setToken', response.data.pagination.token)
            resolve(response.data.msg)
          } else {
            Vue.swal({ icon: 'error', title: 'Login Error', text: response.data.pagination.errorMsg })
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
        axios.post(`${process.env.VUE_APP_APIURL}/register`, data).then((response) => {
          if (response.data.code === 200) {
            Vue.swal({ icon: 'success', title: 'Registration Success' })
            resolve(response.data.msg)
          } else {
            console.log(response)
            Vue.swal({ icon: 'error', title: 'Registration Error', text: response.data.pagination.errorMsg })
          }
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default moduleAuth
