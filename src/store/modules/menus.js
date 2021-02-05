import axios from 'axios'
const moduleMenus = {
  namespaced: true,
  state: () => {
    return {
      apiURL: process.env.VUE_APP_APIURL,
      menus: [],
      details: {},
      isLoading: true,
      searchName: '',
      pagination: {},
      carts: []
    }
  },
  getters: {
    menus: state => state.menus,
    pagination: state => state.pagination,
    isLoading: state => state.isLoading,
    carts: state => state.carts,
    details: state => state.details,
    qtyCarts (state) {
      return state.carts.reduce((a, b) => a + b.amount, 0)
    },
    totalPrice (state) {
      return state.carts.reduce((a, b) => a + b.amount * b.price, 0)
    },
    ppn (state) {
      return state.carts.reduce((a, b) => a + b.amount * b.price, 0) * 0.1
    }
  },
  mutations: {
    setMenus (state, payload) {
      state.menus = payload
    },
    setDetails (state, payload) {
      state.details = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    checkClicked (state) {
      state.menus.forEach(value => {
        const clickedItem = state.carts.find(item => item.id === value.id)
        if (clickedItem) {
          value.isClicked = true
        } else {
          value.isClicked = false
        }
      })
    },
    setCarts (state, payload) {
      state.carts.push(payload)
    },
    removeCarts (state, payload) {
      state.carts = state.carts.filter((item) => item.id !== payload.id)
    },
    addQty (state, id) {
      const checkProduk = state.carts.find((item) => item.id === id)
      checkProduk.amount += 1
    },
    minQty (state, id) {
      const checkProduk = state.carts.find((item) => item.id === id)
      if (checkProduk.amount > 1) {
        checkProduk.amount -= 1
      } else {
        const clickedItem = state.menus.find(item => item.id === id)
        if (clickedItem) {
          clickedItem.isClicked = false
        }
        state.carts = state.carts.filter((item) => item.id !== id)
      }
    },
    clearCarts (state) {
      state.carts = []
      state.menus.map((item) => { item.isClicked = false })
    }
  },
  actions: {
    getMenus (context, data) {
      context.state.isLoading = true
      if (data.ready === 1 || data.ready === true) {
        data.ready = 1
      } else {
        data.ready = 0
      }
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/menus?name=${data.searchName}&limit=${data.limit}&order=${data.order}&sort=${data.sort}&ready=${data.ready}&page=${data.page}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            if (response.data.data.length > 0) {
              context.commit('setPagination', response.data.pagination)
              context.commit('setMenus', response.data.data)
              context.state.isLoading = false
              context.commit('checkClicked')
              resolve(response)
            } else {
              context.commit('setPagination', response.data.pagination)
              context.commit('setMenus', response.data.data)
              context.state.isLoading = false
              resolve(response)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDetails (context, id) {
      return new Promise((resolve, reject) => {
        axios.get(`${context.state.apiURL}/menus/${id}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            context.commit('setDetails', response.data.data[0])
            resolve(response.data.data[0])
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addToCart (context, data) {
      const checkProduk = context.state.carts.filter((item) => {
        return item.id === data.id
      })
      if (checkProduk.length >= 1) {
        context.commit('removeCarts', data)
        context.commit('checkClicked')
      } else {
        const dataBaru = {
          id: data.id,
          menu_id: data.id,
          amount: 1,
          menu: data.name,
          name: data.name,
          price: data.price,
          image: data.image
        }
        context.commit('setCarts', dataBaru)
        context.commit('checkClicked')
      }
    },
    postCart (context, data) {
      const fixData = context.state.carts.map((item) => ({
        ...item,
        cashier: data.cashier,
        inv: data.invoices
      }))
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.apiURL}/orders`, fixData, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addQty (context, data) {
      context.commit('addQty', data)
    },
    minQty (context, data) {
      context.commit('minQty', data)
    },
    clearCarts (context) {
      context.commit('clearCarts')
    },
    addMenus (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${context.state.apiURL}/menus`, data, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateMenus (context, data) {
      return new Promise((resolve, reject) => {
        axios.patch(`${context.state.apiURL}/menus/${data.id}`, data.fd, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteMenus (context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${context.state.apiURL}/menus/${id}`, { headers: { token: context.rootState.auth.token } })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}

export default moduleMenus
