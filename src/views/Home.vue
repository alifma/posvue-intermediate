<template>
 <div class="home">
    <Navbar navpage='home' navtitle='Food Items' style="height:10vh"/>
    <div class="container-fluid px-0" style="height:90vh">
      <div class="row mx-0">
        <div id="main" class="col-lg-8 pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%;height:90vh">
          <Sidebar />
          <!-- Menu Tiles -->
        <div class="text-center" style="height:min-content">
          <Menus />
        </div>
          <!-- End Menu Tiles -->
        </div>
        <div class="col-lg-4 px-4 bg-white pt-4" style="height:90vh" id="mainCart">
          <!-- Cart List -->
            <Cart />
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
import Cart from '@/components/Cart'
export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Menus,
    Cart
  },
  methods: {
  }

}
</script>
