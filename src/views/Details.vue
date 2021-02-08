<template>
  <div class="details">
    <Navbar navpage='history' navtitle='Product Details' />
    <div class="container-fluid px-0">
      <div class="row mx-0">
        <div id="main" class="pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%">
          <Sidebar />
          <div class="text-center p-4 m-4 w-100" v-if="isLoading">
            <div class="d-flex justify-content-center w-100">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <h5 class="mt-4">Fetching Data</h5>
          </div>
          <!-- Menu Tiles -->
          <div class="MainContent row p-3" v-else>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <!-- Details Start -->
              <div class="card mb-3">
                <h4 class="card-header font-weight-bold">Menus Data</h4>
                <div class="row no-gutters">
                  <div class="col-md-4 col-lg-4 p-3">
                    <img :src="`${baseURL}/img/${details.image}`" class="img-fluid" style="width:100%"
                      :alt="details.name"></div>
                  <div class="col-md-8 col-lg-8" style="text-align:left">
                    <div class="card-body pt-0">
                      <h4><span class="badge btn-blue float-right">{{details.category}}</span></h4>
                      <h4 class="card-title menuName">{{details.name}}</h4>
                      <h4 class="card-text menuPrice font-weight-bold">Rp.
                        {{formatPrice(details.price?details.price:0)}}</h4>
                      <p class="card-text mb-0"><small class="text-muted">Registered
                          {{new Date(details.created_at).toLocaleDateString()}}</small></p>
                      <p class="card-text"><small class="text-muted">Last updated
                          {{details.updated_at ? new Date(details.updated_at).toLocaleDateString() : '-'}}</small></p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Details End -->
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="card mb-3">
                <h4 class="card-header font-weight-bold">Change Data</h4>
                <div class="card-body">
                  <form action="" @submit.prevent="onUpdate(details.id)">
                    <div class="form-group">
                      <label for="exampleFormControlInput1" class="font-weight-bold">Menu Name</label>
                      <input type="text" class="form-control" required v-model="hold.name" :placeholder="details.name">
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label for="exampleFormControlInput1" class="font-weight-bold">Menu Price</label>
                          <input type="number" class="form-control" required v-model="hold.price" :placeholder="details.price">
                        </div>
                        <div class="col">
                          <label for="exampleFormControlSelect2" class="font-weight-bold">Category</label>
                          <b-form-select v-model="hold.category_id" required :options="categories">{{details.category_id}}
                          </b-form-select>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label for="exampleFormControlInput1" class="font-weight-bold">Image</label>
                          <input type="file" class="form-control" @change="processFile($event)" style="line-height:20px"
                            :placeholder="details.image">
                        </div>
                        <div class="col">
                          <label for="exampleFormControlInput1" class="font-weight-bold">Status</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input type="checkbox" v-model="hold.isReady" aria-label="Checkbox for following text input">
                              </div>
                            </div>
                            <input type="text" class="form-control" readonly placeholder="Ready">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group mt-4">
                      <div class="row">
                        <div class="col">
                          <button class="btn-blue btn w-100 font-weight-bold" type="submit">
                            <b-icon icon="pencil"></b-icon> Update
                          </button>
                        </div>
                        <div class="col">
                          <a class="btn btn-pink btn w-100 font-weight-bold" @click="confirmDelete(details.id)">
                            <b-icon icon="trash"></b-icon> Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
import { mapActions, mapGetters } from 'vuex'
import { posvueMixin } from '../helper/mixin'
export default {
  name: 'Details',
  mixins: [posvueMixin],
  data () {
    return {
      id: this.$route.params.id,
      hold: {
        id: this.$route.params.id,
        name: '',
        price: '',
        image: '',
        category_id: 1,
        isReady: 1
      },
      isLoading: true
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions({
      actionGetDetails: 'menus/getDetails',
      actionUpdate: 'menus/updateMenus',
      deleteMenus: 'menus/deleteMenus'
    }),
    getDetails () {
      this.actionGetDetails(this.id)
        .then((response) => {
          this.hold.name = response.name
          this.hold.price = response.price
          this.hold.category_id = response.category_id
          this.hold.image = response.image
          this.hold.isReady = response.isReady
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    },
    buildUpdateData (msg) {
      const fd = new FormData()
      fd.append('name', this.hold.name)
      fd.append('price', this.hold.price)
      fd.append('category_id', this.hold.category_id)
      fd.append('isReady', this.hold.isReady)
      fd.append('image', this.hold.image)
      const fixData = {
        id: this.id,
        fd
      }
      this.actionUpdate(fixData)
        .then((response) => {
          if (response.data.code === 200) {
            this.getDetails()
            this.$swal.close()
            this.alertToast('success', msg)
          } else {
            this.$swal.close()
            this.alertToast('error', response.data.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onUpdate () {
      this.swalLoading('Updating data ...')
      if (this.hold.isReady === false) {
        this.hold.isReady = 0
        this.buildUpdateData('Soft Delete Success')
        this.$router.push('/')
      } else {
        this.hold.isReady = 1
        this.buildUpdateData('Update Menu Success')
      }
    },
    processFile (el) {
      this.hold.image = el.target.files[0]
    },
    confirmDelete (id) {
      this.$swal({
        title: 'Delete this menu?',
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        confirmButtonText: 'Confirm',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.deleteMenus(this.id)
            .then((response) => {
              if (response.data.code === 200) {
                this.swalToast('success', 'Delete Menu Success')
                this.$router.push('/')
              } else {
                this.alertToast('error', response.data.msg)
              }
            })
            .catch((err) => { console.log(err) })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      details: 'menus/details',
      categories: 'categories/categories'
    })
  },
  mounted () {
    this.isLoading = true
    this.getDetails()
  }
}
</script>
