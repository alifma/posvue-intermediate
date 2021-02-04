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
    <modal v-if="showAddModal" @close="showAddModal = false">
      <div slot="header">
        <h5 class="modal-title font-weight-bolder">Add Item</h5>
      </div>
      <div slot="body">
        <form action="" @submit.prevent="onSubmit()">
          <div class="mb-3 row">
            <label for="inputName" class="col-sm-3 col-form-label font-weight-bold">Name</label>
            <div class="col-sm-9">
              <input type="text" class="form-control shadow" v-model="form.name" placeholder="Food Name" id="inputName">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputImage" class="col-sm-3 col-form-label font-weight-bold">Image</label>
            <div class="col-sm-9">
              <input type="file" @change="processFile($event)" class="form-control shadow" style="line-height:20px" placeholder="http://...." id="inputImage">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPrice" class="col-sm-3 col-form-label font-weight-bold">Price</label>
            <div class="col-sm-7">
              <input type="number" class="form-control shadow" style="text-align:right" placeholder="0" v-model="form.price"
                id="inputPrice">
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputCategory" class="col-sm-3 col-form-label font-weight-bold">Category</label>
            <div class="col-sm-5">
              <b-form-select v-model="form.category_id" :options="categories"></b-form-select>
            </div>
          </div>
          <div class="div" style="text-align:right">
          <button class="btn btn-pink mr-4" style="width:100px" @click="showAddModal = false">
            Cancel
          </button>
          <button class="btn btn-blue" style="width:100px" type="submit">
            Add
          </button>
        </div>
        </form>
      </div>
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<script>
import modal from '@/components/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  mixins: [posvueMixin],
  name: 'Sidebar',
  data () {
    return {
      showAddModal: false,
      status: 1,
      form: {
        name: '',
        price: '',
        category_id: 1,
        image: ''
      }
    }
  },
  components: {
    modal
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      actionCategories: 'categories/getCategories',
      actionPost: 'menus/addMenus'
    }),
    onLogout () {
      this.logout().then((response) => {
        if (response) {
          this.alertToast('success', 'Logout Success')
          this.$router.push('/login')
        } else {
          this.alertToast('error', 'Something went wrong')
        }
      })
    },
    getCategories () {
      this.actionCategories(this.status)
        .then(() => { })
        .catch((err) => { console.log(err) })
    },
    processFile (el) {
      this.form.image = el.target.files[0]
    },
    onSubmit () {
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('price', this.form.price)
      fd.append('category_id', this.form.category_id)
      fd.append('image', this.form.image)
      this.actionPost(fd)
      this.showAddModal = false
    }
  },
  mounted () {
    var element = document.getElementById('main')
    var trigger = document.getElementById('menu-toggle')
    trigger.addEventListener('click', function (e) {
      e.preventDefault()
      element.classList.toggle('active')
    })
    this.getCategories()
  }
}
</script>

<style>

</style>
