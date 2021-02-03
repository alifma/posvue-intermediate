export const posvueMixin = {
  data () {
    return {
      baseURL: 'http://52.91.116.102:3000'
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    }
  }
}
