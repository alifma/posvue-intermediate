export const posvueMixin = {
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    }
  }
}
