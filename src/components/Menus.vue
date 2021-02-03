<template>
  <div class="row pt-4 mx-0" style="height:min-content;width:100%">
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
      <button type="button" @click="getMenus" class="btn font-weight-bold btn-blue">Refresh Page</button>
    </div>
    <!-- End Disconnected -->
    <!-- Start Menus -->
    <div v-else class="w-100">
      <!-- Start Search and Sort Combo -->
      <div id="top" class="row ml-2 mb-4" style="width:100%">
        <!-- Search Bar -->
      <div class="col-sm-6">
          <div v-show="searchBarStatus" class="form-inline">
            <input class="form-control mr-sm-2" type="search" v-model="form.searchName" @keyup="getMenusByName" placeholder="Search">
          </div>
        </div>
        <!-- End SearchBar -->
        <!-- Start Sort By-->
        <div class="col-sm-6 d-inline-flex">
          <select class="custom-select float-right" v-model="form.order" @change="changeOrderSort()">
            <option value="created_at">Added</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          <select class="custom-select float-right" v-model="form.sort" @change="changeOrderSort()">
            <option value="asc"> Ascending <b-icon icon="sort-alpha-down"></b-icon></option>
            <option value="desc"> Descending <b-icon icon="sort-alpha-up"></b-icon></option>
          </select>
        </div>
        <!-- End Sort By-->
      </div>
      <!-- End Search and Sort Combo -->
      <!-- Start Menus Has Data -->
      <div class="row ml-2" v-if="menus" style="width:100%">
        <div class="col-lg-4 col-md-4 col-sm-6 mb-3" style="height:min-content" v-for="item in menus" :key="item.id">
          <div :id="'menuCard'+item.id" class="card menuCard bg-transparent border-0">
            <div class="card-image" @click="setClicked(item);addToCart(item)" :class="{clicked: item.isClicked}">
              <img :src="`http://52.91.116.102:3000/img/${item.image}`" class="card-img-top menuImg" :alt="item.name">
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
                  <h4 class="card-text menuPrice font-weight-bold" style="text-align:left">Rp. {{formatPrice(item.price)}}</h4>
                </div>
                <div class="col-4 my-auto" style="text-align:right">
                  <router-link :to="'/menus/'+item.id" class="btn-success btn">Detail</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Menus Has Data -->
      <!-- Start Menus No Data -->
      <div class="row ml-2" v-else style="width:100%">
        <h1>No Data</h1>
      </div>
      <!-- End Menus No Data -->
      <div class="row ml-2 mb-4 text-center" style="width:100%">
        <!-- Start Pagination -->
        <div class="w-100">
          <h5 class="mb-0 d-inline font-weight-bold">Select Page: </h5>
          <div class="d-inline" v-for="(element, index) in pagination.pageResult" :key="index">
            <h5 class="d-inline"><span class="badge badge-primary mx-2" @click="getMenusByPage(element)">{{element}}
              </span></h5>
          </div>
        </div>
        <!-- End Pagination -->
      </div>
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
      form: {
        searchName: '',
        page: 1,
        limit: 6,
        order: 'created_at',
        sort: 'asc',
        ready: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      menus: 'menus/menus',
      pagination: 'menus/pagination',
      searchBarStatus: 'searchBarStatus',
      isLoading: 'menus/isLoading'
    })
  },
  methods: {
    ...mapActions({
      getMenus: 'menus/getMenus',
      addToCart: 'menus/addToCart'
    }),
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
