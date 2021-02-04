// import Vue from 'vue'
import Swal from 'sweetalert2'
export const posvueMixin = {
  data () {
    return {
      baseURL: 'http://52.91.116.102:3000',
      Toast: Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    },
    alertToast (icon, title) {
      this.Toast.fire({
        icon,
        title
      })
    }
  }
}
