import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import History from '../views/History.vue'
import store from '../store/index'
import Details from '../views/Details.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { auth: true }
  },
  {
    path: '/menus/:id',
    name: 'Details',
    component: Details,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      Vue.swal({ icon: 'error', title: 'You are not logged in' })
      next({
        path: '/login'
      })
    }
  } else {
    if (store.getters['auth/getToken']) {
      Vue.swal({ icon: 'error', title: 'You already logged in' })
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

export default router
