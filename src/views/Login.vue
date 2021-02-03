<template>
  <div id="login-view">
    <div class="container my-4" id="container">
      <div class="form-container log-in-container" v-if="showRegister == true">
        <form class="" @submit.prevent="checkLogin()">
          <h1>Login</h1>
          <span>To use your account</span>
          <input class="form-control mb-2" type="email" required autocomplete="false" v-model="email"
            placeholder="Email">
          <input class="form-control mb-2" type="password" required autocomplete="false" v-model="password"
            placeholder="Password">
          <button class="text-center w-100 mb-2" type="submit">Login</button>
          <p class="my-0">Dont have an account?</p>
          <p class="my-0 font-weight-bold" @click="toggleRegister()">Register new account!</p>
        </form>
      </div>
      <div class="form-container log-in-container" v-else>
        <form class="" @submit.prevent="checkRegister()">
          <h1>Register</h1>
          <span>To create new account</span>
          <input class="form-control mb-2" type="text" required v-model="name" autocomplete="false" placeholder="Name">
          <input class="form-control mb-2" type="email" required v-model="email" autocomplete="false"
            placeholder="Email">
          <input class="form-control mb-2" type="password" required v-model="password" autocomplete="false"
            placeholder="Password">
          <select class="custom-select mb-2" v-model="access">
            <option value=0>Admin</option>
            <option value=1>Cashier</option>
          </select>
          <button class="text-center w-100 mb-2" type="submit">Register</button>
          <p class="my-0">Already have an account?</p>
          <p class="my-0 font-weight-bold" @click="toggleRegister()">Login to your account!</p>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <img src="https://posvue-alifma.netlify.app/img/i-empty.png" alt="">
            <h1>POS Vue</h1>
            <p>Point of Sales Application Using Vue.JS Framework</p>
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

<style scoped>
  * {
    box-sizing: border-box;
  }

  body {
    background: #f3e0e2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Nunito', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid #57cad5;
    background-color: #57cad5;
    color: #FFFFFF;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
  }

  .log-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
  }
@media (max-width: 768px) {
  .log-in-container {
    left: 0;
    width: 100%;
    z-index: 2;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 0%;
    height: 100%;
  }
    .container {
    background-color: #fff;
    border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 80vw;
    max-width: 100%;
    min-height: 480px;
  }
}

  .overlay {
    background: #5957d5;
    background: -webkit-linear-gradient(to right,#57cad5, #5957d5);
    background: linear-gradient(to right, #57cad5, #5957d5);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
  }

  .overlay-right {
    right: 0;
  }

</style>
