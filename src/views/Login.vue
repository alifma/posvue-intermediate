<template>
  <div id="login-view">
    <div class="container mt-4">
      <div class="card">
        <div class="card-body text-center">
          <img class="mb-4" src="https://posvue-alifma.netlify.app/img/i-empty.png" alt="">
          <div id="login" v-if="showRegister == true">
            <h5>Please sign in</h5>
            <div class="d-flex justify-content-center">
              <form class="col-lg-4 col-md-4 col-sm-12" @submit.prevent="checkLogin()">
                <input class="form-control mb-2" type="email" autocomplete="false" v-model="email" placeholder="Email">
                <input class="form-control mb-2" type="password" autocomplete="false" v-model="password" placeholder="Password">
                <button class="text-center btn btn-success w-100 mb-2" type="submit">Login</button>
                <p>Dont have an account?</p>
                <p @click="toggleRegister()">Register new account!</p>
              </form>
            </div>
          </div>
          <div id="register" v-else>
            <h5>Register New Account</h5>
            <div class="d-flex justify-content-center">
              <form class="col-lg-4 col-md-4 col-sm-12"  @submit.prevent="checkRegister()">
                <input class="form-control mb-2" type="text" required v-model="name" autocomplete="false" placeholder="Name">
                <input class="form-control mb-2" type="email" required v-model="email" autocomplete="false" placeholder="Email">
                <input class="form-control mb-2" type="password" required v-model="password" autocomplete="false" placeholder="Password">
                <select class="custom-select mb-2" v-model="access">
                  <option value=0>Admin</option>
                  <option value=1>Cashier</option>
                </select>
                <button class="text-center btn btn-success w-100 mb-2" type="submit">Register</button>
                <p>Already have an account?</p>
                <p @click="toggleRegister()">Login to your account!</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      access: 0,
      showRegister: true
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      register: 'auth/register'
    }),
    checkLogin () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data).then((response) => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },
    checkRegister () {
      const data = {
        name: this.name,
        email: this.email,
        access: this.access,
        password: this.password
      }
      this.register(data).then((response) => {
        console.log(response)
        this.showRegister = true
        this.$router.push('/login')
      }).catch((err) => {
        console.log(err)
      })
    },
    toggleRegister () {
      this.showRegister = !this.showRegister
    }
  }
}
</script>

<style>

</style>
