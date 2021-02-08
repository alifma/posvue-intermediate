<template>
  <div id="sidebar" class="sticky-top">
    <div class="bg-white p-0 mr-1" style="position:sticky" id="sidebar-main">
      <div class="list-group">
        <router-link to="/" class="text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/nLXYpRV/i-menu.png" class="img-fluid" alt="">
        </router-link>
        <a id="btnCart" class="text-center list-group-item sidebar-item bg-white" @click="$bvModal.show('modal-newcart')" >
          <img src="https://i.ibb.co/VqHgpHj/cart.png" style="position:relative" class="img-fluid" alt="">
          <span class="badge badge-pill btn-blue"  style="position:absolute;right:25px;left:25px;bottom:0px" >{{qtyCarts}}</span>
        </a>
        <router-link to="/history" class=" text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/kmWGqSQ/i-report.png" class="img-fluid" alt="">
        </router-link>
        <a v-if="access == 0" class="text-center list-group-item sidebar-item bg-white" @click="$bvModal.show('addModal')">
          <img src="https://i.ibb.co/4TWDTdZ/i-add.png" class="img-fluid" alt="">
        </a>
        <p @click="onLogout()" class=" text-center list-group-item sidebar-item bg-white">
          <img src="https://i.ibb.co/kMbfJjB/182-1821638-logout-icon-png-red-clipart.png" class="img-fluid" alt="">
        </p>
      </div>
    </div>
    <b-modal id="addModal" centered hide-footer>
      <template #modal-title>
        <div style="text-center w-100">
          <p class="font-weight-bold mb-0">Add Item</p>
        </div>
      </template>
      <form action="" @submit.prevent="onSubmit()" autocomplete="off">
        <div class="mb-3 row">
          <label for="inputName" class="col-sm-3 col-form-label font-weight-bold">Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control shadow" required v-model="newForm.name" placeholder="Food Name"
              id="inputName">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputImage" class="col-sm-3 col-form-label font-weight-bold">Image</label>
          <div class="col-sm-9">
            <input type="file" @change="processFile($event)" required class="form-control shadow" style="line-height:20px"
              placeholder="http://...." id="inputImage">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPrice" class="col-sm-3 col-form-label font-weight-bold">Price</label>
          <div class="col-sm-7">
            <input type="number" class="form-control shadow" required style="text-align:right" placeholder="0"
              v-model="newForm.price" id="inputPrice">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputCategory" class="col-sm-3 col-form-label font-weight-bold">Category</label>
          <div class="col-sm-5">
            <b-form-select v-model="newForm.category_id" :options="categories" required ></b-form-select>
          </div>
        </div>
        <div class="div" style="text-align:right">
          <a class="btn btn-pink mr-4" style="width:100px" @click="$bvModal.hide('addModal')">
            Cancel
          </a>
          <button class="btn btn-blue" style="width:100px" type="submit">
            Add
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  mixins: [posvueMixin],
  name: 'Sidebar',
  data () {
    return {
      status: 1,
      newForm: {
        name: '',
        price: '',
        category_id: 1,
        image: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
      access: 'auth/getAccess',
      qtyCarts: 'menus/qtyCarts'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      actionCategories: 'categories/getCategories',
      actionPost: 'menus/addMenus',
      getMenusAPI: 'menus/getMenus'
    }),
    onLogout () {
      this.$swal({
        title: 'Logout',
        text: 'Area you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        confirmButtonText: 'Confirm',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.logout().then((response) => {
            if (response) {
              this.swalToast('success', 'Logout Success')
              this.$router.push('/login')
            } else {
              this.swalToast('error', 'Something went wrong')
            }
          })
        }
      })
    },
    getCategories () {
      this.actionCategories(this.status)
        .then(() => { })
        .catch((err) => { console.log(err) })
    },
    processFile (el) {
      this.newForm.image = el.target.files[0]
    },
    onSubmit () {
      this.swalLoading('Uploading Data')
      this.$bvModal.hide('addModal')
      const fd = new FormData()
      fd.append('name', this.newForm.name)
      fd.append('price', this.newForm.price)
      fd.append('category_id', this.newForm.category_id)
      fd.append('image', this.newForm.image)
      this.actionPost(fd)
        .then((response) => {
          if (response.data.code === 200) {
            this.$swal.close()
            this.alertToast('success', response.data.msg)
            this.newForm = {
              name: '',
              price: '',
              category_id: 1,
              image: ''
            }
            this.getMenusAPI(this.form)
          } else {
            this.$swal.close()
            this.alertToast('error', response.data.msg)
          }
        })
        .catch((err) => {
          this.alertToast('error', err)
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
    this.getCategories()
  }
}
</script>

<style>

</style>
