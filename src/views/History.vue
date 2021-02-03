<template>
 <div class="home">
    <Navbar navpage='history' navtitle='History' />
    <div class="container-fluid px-0">
      <div class="row mx-0">
        <div id="main" class="col-lg-8 pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%">
          <Sidebar />
          <!-- Menu Tiles -->
          <h1>Test</h1>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'History',
  components: {
    Navbar,
    Sidebar
  },
  methods: {
  }

}
</script>
