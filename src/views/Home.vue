<template>
 <div class="home">
    <Navbar navpage='home' navtitle='Food Items' />
    <div class="container-fluid px-0">
      <div class="row mx-0">
        <div id="main" class="col-lg-8 pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%">
          <Sidebar />
          <!-- Menu Tiles -->
          <!-- <Content /> -->
          <Menus />
          <!-- End Menu Tiles -->
        </div>
        <div class="col-lg-4 p-4 bg-white">
          <!-- Cart List -->
          <div id="cart" class="bg-white">
            <!-- <button class="btn btn-success" @click="onLogout()">Logout</button> -->
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Menus from '@/components/Menus'
export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Menus
  },
  methods: {
  }

}
</script>
