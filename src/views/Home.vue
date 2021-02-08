<template>
 <div class="home">
    <Navbar navpage='home' navtitle='Food Items'/>
    <div class="container-fluid px-0" style="height:90vh">
      <div class="row mx-0">
        <div id="main" class="col-lg-8 p-0 mb-0 d-flex " style="width:100%">
          <Sidebar />
          <!-- Menu Tiles -->
        <div class="text-center w-100">
          <Menus2 />
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
import Menus2 from '@/components/Menus2'
import Cart from '@/components/Cart'
export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar,
    Menus2,
    Cart
  },
  methods: {
  }

}
</script>
