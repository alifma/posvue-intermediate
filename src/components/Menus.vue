<template>
  <div class="d-flex pt-4 mx-0"  style="width:100%;height:90vh;flex-direction:column">
    <!-- Start Search and Sort Combo -->
    <div id="top" v-show="searchBarStatus" class="row ml-2 mb-4" style="width:100%">
      <!-- Search Bar -->
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-6">
            <input class="form-control mr-sm-2" type="search" v-model="form.searchName" @keyup="getMenusByName"
              placeholder="Search">
          </div>
          <div class="col-sm-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" v-model="form.ready" @change="getMenusByName"
                    aria-label="Checkbox for following text input">
                </div>
              </div>
              <input type="text" class="form-control" readonly placeholder="Ready">
            </div>
          </div>
        </div>
      </div>
      <!-- End SearchBar -->
      <!-- Start Sort By-->
      <div class="col-sm-6 d-inline-flex">
        <select class="custom-select float-right" v-model="form.limit" @change="changeOrderSort()">
          <option value="3">Limit: 3</option>
          <option value="6">Limit: 6</option>
          <option value="9">Limit: 9</option>
          <option value="12">Limit: 12</option>
        </select>
        <select class="custom-select float-right" v-model="form.order" @change="changeOrderSort()">
          <option value="created_at">Added</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category_id">Category</option>
        </select>
        <select class="custom-select float-right" style="width: min-content" v-model="form.sort" @change="changeOrderSort()">
          <option value="asc"> A &rarr; Z <b-icon icon="sort-alpha-down"></b-icon>
          </option>
          <option value="desc"> Z &rarr; A <b-icon icon="sort-alpha-up"></b-icon>
          </option>
        </select>
      </div>
      <!-- End Sort By-->
    </div>
    <!-- End Search and Sort Combo -->
    <!-- Start Loading Spinner -->
    <div class="text-center p-4 m-4 w-100" v-if="isLoading">
      <div class="d-flex justify-content-center w-100">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <h5 class="mt-4">Fetching Data</h5>
    </div>
    <!-- End Loading Spinner -->
    <!-- Start Disconnected -->
    <div class="text-center p-4 m-4 w-100" v-else-if="menus.length === 0">
      <img src="https://i.ibb.co/ZmtvK2V/undraw-server-down-s4lk-1.png" class="img-fluid" style="max-height:40%" alt="">
      <h1 class="pt-4 font-weight-bold">Server Not Connected</h1>
      <h4 class="">Please start your server and refresh the page</h4>
      <button type="button" @click="getMenusByName" class="btn font-weight-bold btn-blue">Refresh Page</button>
    </div>
    <!-- End Disconnected -->
    <!-- Start Menus -->
    <div v-else class="w-100">
      <!-- Start Menus Has Data -->
      <div class="row ml-2" v-if="menus.length != undefined" style="width:100%;height:80vh;overflow-y:scroll;">
        <div class="col-lg-4 col-md-4 col-sm-6 mb-3" style="height:min-content" v-for="item in menus" :key="item.id">
          <div :id="'menuCard'+item.id" class="card menuCard bg-transparent border-0">
            <div class="card-image" @click="setClicked(item);addToCart(item)" :class="{clicked: item.isClicked}">
              <img :src="`${baseURL}/img/${item.image}`" class="card-img-top menuImg" :alt="item.name">
              <div
                class="image-overlay text-white-50 text-center h-100 d-flex justify-content-center align-content-center"
                style="vertical-align:middle">
                <h1 class="my-auto" style="font-size:70px">
                  <b-icon icon="check-circle"></b-icon>
                </h1>
              </div>
            </div>
            <div class="card-body menuBody pl-0 pt-2">
              <h4 class="card-title menuName mb-0" style="text-align:left">{{item.name}}</h4>
              <div class="row pl-0">
                <div class="col-8">
                  <h4 class="card-text menuPrice font-weight-bold" style="text-align:left">Rp.
                    {{formatPrice(item.price)}}</h4>
                </div>
                <div class="col-4 my-auto" style="text-align:right">
                  <router-link v-if="access == 0" :to="'/menus/'+item.id" class="btn-blue btn">Detail</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Menus Has Data -->
      <!-- Start Menus No Data -->
      <div class="ml-2 text-center p-4 w-100" v-else>
        <h1>No Result</h1>
        <br>
        <button @click="resetSearch()" class="btn-primary btn">Reset Search</button>
      </div>
      <!-- End Menus No Data -->
    </div>
    <div class="row ml-2 mb-4 text-center position-sticky" style="width:100%;bottom:0px;background:#EBECEE">
        <!-- Start Pagination -->
        <div class="w-100 p-2">
          <h5 class="mb-0 d-inline font-weight-bold">Select Page: </h5>
          <div class="d-inline" v-for="(element, index) in pagination.pageResult" :key="index">
            <h5 class="d-inline"><span class="badge badge-primary mx-2" @click="getMenusByPage(element)">{{element}}
              </span></h5>
          </div>
        </div>
        <!-- End Pagination -->
      </div>
    <!-- End Mennus-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  name: 'Menus',
  mixins: [posvueMixin],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      menus: 'menus/menus',
      pagination: 'menus/pagination',
      searchBarStatus: 'searchBarStatus',
      isLoading: 'menus/isLoading',
      access: 'auth/getAccess'
    })
  },
  methods: {
    ...mapActions({
      getMenusAPI: 'menus/getMenus',
      addToCart: 'menus/addToCart'
    }),
    getMenus (data) {
      this.getMenusAPI(data)
        .then((response) => {
          if (response.data.data.length === undefined) {
            this.alertToast('error', 'No Result')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMenusByName () {
      this.form.page = 1
      this.getMenus(this.form)
    },
    getMenusByPage (page) {
      this.form.page = page
      this.getMenus(this.form)
    },
    changeOrderSort () {
      this.getMenus(this.form)
    },
    resetSearch () {
      this.form = {
        searchName: '',
        page: 1,
        limit: 6,
        order: 'created_at',
        sort: 'asc',
        ready: 1
      }
      this.getMenus(this.form)
    },
    setClicked (value) {
      if (value.isClicked === false) {
        value.isClicked = true
      } else {
        value.isClicked = false
      }
    }
  },
  mounted () {
    this.getMenus(this.form)
  }
}
</script>

<style>

</style>
