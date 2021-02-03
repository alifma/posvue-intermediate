// import Vue from 'vue'
// import axios from 'axios'
const moduleCarts = {
  namespaced: true,
  state: () => {
    return {
      carts: []
    }
  },
  getters: {
    carts: state => state.carts
  },
  mutations: {
    setCarts (state, payload) {
      state.carts.push(payload)
    },
    removeCarts (state, payload) {
      state.carts = state.carts.filter((item) => item.id !== payload.id)
    }
  },
  actions: {
    addToCart (context, data) {
      const checkProduk = context.state.carts.filter((item) => {
        return item.id === data.id
      })
      if (checkProduk.length >= 1) {
        context.commit('removeCarts', data)
      } else {
        const dataBaru = {
          id: data.id,
          menu_id: data.id,
          amount: 1,
          name: data.name,
          price: data.price,
          image: data.image
        }
        context.commit('setCarts', dataBaru)
      }
    }
  }
}

export default moduleCarts
