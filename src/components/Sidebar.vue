<template>
  <div id="sidebar">
    <div class="bg-white p-0 mr-1" style="position:sticky-left;height:100%" id="sidebar-main">
      <div class="list-group">
        <router-link to="/" class="text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/nLXYpRV/i-menu.png" class="" alt="">
        </router-link>
        <router-link to="/history" class=" text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/kmWGqSQ/i-report.png" class="" alt="">
        </router-link>
        <a class="text-center list-group-item sidebar-item bg-white" id="show-modal" @click="showAddModal = true">
          <img src="https://i.ibb.co/4TWDTdZ/i-add.png" class="" alt="">
        </a>
         <p @click="onLogout()" class=" text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/zrC703V/i-add-1.png" class="" alt="">
        </p>
      </div>
    </div>
    <!-- Call Modal Component -->
    <!-- <modal v-if="showAddModal" @close="showAddModal = false">
      <div slot="header">
        <h5 class="modal-title font-weight-bolder">Add Item</h5>
      </div>
      <div slot="body">
        <form action="">
          <div class="mb-3 row">
            <label for="inputName" class="col-sm-3 col-form-label font-weight-bold">Name</label>
            <div class="col-sm-9">
              <input type="text" class="form-control shadow" v-model="name" placeholder="Food Name" id="inputName">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputImage" class="col-sm-3 col-form-label font-weight-bold">Image</label>
            <div class="col-sm-9">
              <input type="text" class="form-control shadow" v-model="image" placeholder="http://...." id="inputImage">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPrice" class="col-sm-3 col-form-label font-weight-bold">Price</label>
            <div class="col-sm-7">
              <input type="number" class="form-control shadow" style="text-align:right" placeholder="0" v-model="price"
                id="inputPrice">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputCategory" class="col-sm-3 col-form-label font-weight-bold">Category</label>
            <div class="col-sm-5">
              <b-form-select v-model="category_id" :options="categories"></b-form-select>
            </div>
          </div>
        </form>
      </div>
      <div slot="footer">
        <div class="div" style="text-align:right">
          <button class="btn btn-pink mr-4" style="width:100px" @click="showAddModal = false;resetMenu();">
            Cancel
          </button>
          <button class="btn btn-blue" style="width:100px" @click="showAddModal = false;postMenu();resetMenu();">
            Add
          </button>
        </div>
      </div>
    </modal> -->
    <!-- End Show Modal -->
  </div>
</template>

<script>
// import modal from '@/components/Modal.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Sidebar',
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    onLogout () {
      this.logout().then((response) => {
        if (response) {
          this.$swal({ icon: 'success', title: 'Logout Success' })
          this.$router.push('/login')
        } else {
          alert('gagal logout check code anda')
        }
      })
    }
  },
  mounted () {
    var element = document.getElementById('main')
    var trigger = document.getElementById('menu-toggle')
    trigger.addEventListener('click', function (e) {
      e.preventDefault()
      element.classList.toggle('active')
    })
  }
}
</script>

<style>

</style>
