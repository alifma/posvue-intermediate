// import Vue from 'vue'
import Swal from 'sweetalert2'
export const posvueMixin = {
  data () {
    return {
      baseURL: 'http://52.91.116.102:3000',
      Toast: Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      }),
      form: {
        searchName: '',
        page: 1,
        limit: 6,
        order: 'created_at',
        sort: 'asc',
        ready: 1
      },
      order: {
        range: 'year',
        limit: '5',
        sort: 'desc',
        page: 1
      }
    }
  },
  methods: {
    // Format Currency
    formatPrice (value) {
      return value.toLocaleString().replace(/,/g, '.')
    },
    swalToast (icon, title) {
      this.Toast.fire({
        icon,
        title
      })
    },
    alertToast (variant, title) {
      if (variant === 'error') {
        variant = 'danger'
      }
      this.$bvToast.toast(title, {
        title: 'POSvue Notification',
        variant: variant,
        toaster: 'b-toaster-top-center',
        autoHideDelay: 1000
        // solid: true
      })
    },
    swalLoading (title) {
      this.$swal.fire({
        title: title,
        allowOutsideClick: true,
        showConfirmButton: false,
        willOpen: () => {
          this.$swal.showLoading()
        }
      })
    },
    scrollTop () {
      this.currentStep++
      window.scrollTo(0, 0)
    },
    scrollCart () {
      window.scrollTo(0, 3000)
    }
  }
}
