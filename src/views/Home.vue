<template>
  <div class="home container p-4">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button class="btn btn-success" @click="onLogout()">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    onLogout () {
      this.logout().then((response) => {
        if (response) {
          this.$swal({ icon: 'success', title: 'Logout Success' })
          this.$router.push('/login')
        } else {
          alert('gagal logout check code anda')
        }
      })
    }
  }
}
</script>
