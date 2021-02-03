<template>
 <div class="home">
    <Navbar navpage='home' navtitle='Food Items' />
    <div class="container-fluid px-0">
      <div class="row mx-0">
        <div id="main" class="col-lg-8 pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%">
          <Sidebar />
          <!-- Menu Tiles -->
        <div class="text-center w-100" >
          <Menus />
        </div>
          <!-- End Menu Tiles -->
        </div>
        <div class="col-lg-4 p-4 bg-white">
          <!-- Cart List -->
          <div id="cart" class="bg-white">
            <Cart />
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
