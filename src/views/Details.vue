<template>
  <div class="details">
    <Navbar navpage='history' navtitle='Product Details' />
    <div class="container-fluid px-0">
      <div class="row mx-0">
        <div id="main" class="pt-0 pb-0 pl-0 mb-0 pr-4 d-flex " style="width:100%">
          <Sidebar />
          <!-- Menu Tiles -->
          <div class="MainContent row p-3">
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
                  <div class="form-group">
                    <label for="exampleFormControlInput1" class="font-weight-bold">Menu Name</label>
                    <input type="text" class="form-control" v-model="hold.name" :placeholder="details.name">
                  </div>
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
        name: '',
        price: '',
        image: '',
        category: ''
      }
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    ...mapActions({
      actionGetDetails: 'menus/getDetails'
    }),
    getDetails () {
      this.actionGetDetails(this.id)
        .then(() => {
          console.log('Display Detail Success')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters({
      details: 'menus/details'
    })
  },
  mounted () {
    this.getDetails()
  }
}
</script>
