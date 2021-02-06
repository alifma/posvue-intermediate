<template>
   <div class="container-fluid px-0 sticky-top " shadow>
    <!-- Navbar Menu -->
    <div v-if="navpage == 'home'" class="div">
      <nav class="navbar navbar-light shadow font-weight-bold bg-white">
        <div class="row" style="width:100vw">
          <div id="navMenu" class="col-lg-8 py-2 text-center" style="font-size:20px">
            <p class="navbar-brand float-left ml-3 h1" id="menu-toggle">
              <b-icon icon="list"></b-icon>
            </p>
            <a class="navbar-brand text-center" @click="scrollTop()">Food Items</a>
            <p class="navbar-brand float-right mr-3 h1" @click="toggleSearch()">
              <b-icon icon="search"></b-icon>
            </p>
          </div>
          <div id="navCart" class="col-lg-4 py-2 text-center">
            <a @click="scrollCart()" class="navbar-brand">Cart <span class="badge badge-pill btn-blue">{{qtyCarts}}</span></a>
          </div>
        </div>
      </nav>
    </div>
    <!-- Navbar History -->
    <div v-else-if="navpage == 'history'" class="div">
      <nav class="navbar navbar-light shadow font-weight-bold bg-white">
        <div class="row" style="width:100vw">
          <div id="navMenuHistory" class="col-lg-12 py-2 text-center" style="font-size:20px">
            <p class="navbar-brand float-left ml-3 h1" id="menu-toggle">
              <b-icon icon="list"></b-icon>
            </p>
            <a @click="scrollTop()" class="navbar-brand text-center">{{navtitle}}</a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  mixins: [posvueMixin],
  props: ['navpage', 'navtitle'],
  methods: {
    ...mapActions({
      toggleSearch: 'toggleSearch'
    })
  },
  computed: {
    ...mapGetters({
      qtyCarts: 'menus/qtyCarts'
    })
  }
}
</script>

<style>

</style>
