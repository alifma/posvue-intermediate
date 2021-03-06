// import Vue from 'vue'
import axios from 'axios'
const moduleOrders = {
  namespaced: true,
  state: () => {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      orders: [],
      details: [{ inv: 0, cashier: 'none' }],
      isLoading: false,
      detailOrdersLoading: false,
      historyLoading: false,
      pagination: {
        gainIncome: 0,
        gainOrders: 0,
        lastWeekOrders: 0,
        limit: 0,
        listPages: 0,
        page: 0,
        range: 0,
        thisWeekOrders: 0,
        todaysIncome: 0,
        totalIncome: 0,
        totalOrders: 0,
        totalPages: 0,
        totalResult: 0,
        yesterdayIncome: 0
      }
    }
  },
  getters: {
    orders: state => state.orders,
    pagination: state => state.pagination,
    details: state => state.details,
    detailsTotal (state) {
      return state.details.reduce((a, b) => a + b.amount * b.price, 0)
    },
    detailsPPN (state) {
      return state.details.reduce((a, b) => a + b.amount * b.price, 0) * 0.1
    },
    isLoading: state => state.isLoading,
    historyLoading: state => state.historyLoading,
    detailOrdersLoading: state => state.detailOrdersLoading
  },
  mutations: {
    setOrders (state, payload) {
      state.orders = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    setDetails (state, payload) {
      state.details = payload
    },
    toggleHistory (state, payload) {
      state.historyLoading = payload
    }
  },
  actions: {
    getOrders (context, data) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/orders?range=${data.range}&sort=${data.sort}&limit=${data.limit}&page=${data.page}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              context.commit('setOrders', response.data.data)
              context.commit('setPagination', response.data.pagination)
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
    toggleHistory (context, data) {
      context.commit('toggleHistory', data)
    },
    getDetails (context, inv) {
      context.state.detailOrdersLoading = true
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/orders/${inv}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.code === 200) {
              context.commit('setDetails', response.data.data)
              context.state.detailOrdersLoading = false
              resolve(response.data)
            } else {
              context.state.detailOrdersLoading = false
              resolve(response.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteOrders (context, inv) {
      return new Promise((resolve, reject) => {
        axios.delete(`${context.state.apiURL}/orders/${inv}`, { headers: { token: context.rootState.auth.token } })
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

export default moduleOrders
