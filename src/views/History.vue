<template>
  <div id="history">
    <Navbar navpage="history" navtitle="History" />
    <div class="row mx-0" style="width:100%">
      <div id="main" class="p0 d-flex w-100">
        <Sidebar />
        <!-- <div class="text-center p-4 m-4 w-100" v-if="isLoading">
          <div class="d-flex justify-content-center w-100">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <h5 class="mt-4">Fetching Data</h5>
        </div> -->
        <div class="MainContent p-3" style="width:100vw">
          <CardIncome />
          <Revenue />
          <RecentOrder />
          <Categories />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Revenue from '@/components/Revenue'
import CardIncome from '@/components/CardIncome'
import RecentOrder from '@/components/RecentOrder'
import Categories from '@/components/Categories'
export default {
  name: 'History',
  components: {
    Navbar,
    Sidebar,
    Revenue,
    CardIncome,
    RecentOrder,
    Categories
  },
  methods: {
  }

}
</script>
