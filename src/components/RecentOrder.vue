
<template>
  <div class="card mb-4">
    <div class="card-header border-0 bg-white">
      <!-- Title Section -->
      <div class="row">
        <div class="col-sm-12 col-lg-8 col-md-8 my-2">
        <h3 class="font-weight-bolder mb-0 mt-2">Recent Order</h3>
      </div>
      <div class="col-sm-12 col-lg-4 col-md-4 d-inline-flex">
        <select class="custom-select float-right"  v-model="order.range" @change="getOrdersByRange()">
          <option value="day"> Day <b-icon icon="sort-alpha-up"></b-icon></option>
          <option value="week"> Week <b-icon icon="sort-alpha-up"></b-icon></option>
          <option value="month"> Month <b-icon icon="sort-alpha-up"></b-icon></option>
          <option value="year"> Years <b-icon icon="sort-alpha-down"></b-icon></option>
        </select>
        <select class="custom-select float-right ml-2"  v-model="order.sort" @change="getOrdersByRange()">
          <option value="asc"> A &rarr; Z <b-icon icon="sort-alpha-up"></b-icon></option>
          <option value="desc"> Z &rarr; A <b-icon icon="sort-alpha-down"></b-icon></option>
        </select>
      </div>
      </div>
      <!-- Sort By -->
    </div>
    <div class="card-body pt-0">
       <div class="text-center p-5" v-if="!orders.length">
         <h1>No Recent Order</h1>
       </div>
      <table class="table table-responsive-sm" style="width:100%" v-else>
        <thead>
          <tr>
            <th class="text-center" style="width:15%">INVOICES</th>
            <th class="text-center" style="width:15%">CASHIER</th>
            <th class="text-center" style="width:15%">DATE</th>
            <th class="text-center" style="width:30%">ORDERS</th>
            <th class="text-center" style="width:15%">TOTAL</th>
            <th class="text-center" style="width:10%">ACTION</th>
          </tr>
        </thead>
        <tbody class="text-secondary" v-for="(element, index) in orders" :key="index">
          <tr>
            <td class="text-center">{{element.inv}}</td>
            <td class="text-center">{{element.cashier}}</td>
            <td class="text-center">{{(new Date(element.created_at).toLocaleDateString())}}</td>
            <td class="text-center"><div style="max-height:10vh;overflow-y:scroll">{{element.orders}}</div></td>
            <td class="text-center">Rp. {{formatPrice(element.total?element.total*1.1:0)}}</td>
            <td class="text-center"><button @click="getDetails(element.inv)"
                class="btn-sm btn btn-warning mr-1">
                <b-icon icon="eye"></b-icon>
              </button>
              <button @click="confirmDelete(element.inv)" class="btn-sm btn btn-danger">
                <b-icon icon="trash"></b-icon>
              </button></td>
          </tr>
        </tbody>
      </table>
      <div class="w-100 text-center">
        <h5 class="mb-0 d-inline font-weight-bold">Select Page: </h5>
        <div class="d-inline" v-for="(element, index) in pagination.totalPages" :key="index">
          <h5 class="d-inline"><span class="badge badge-primary mx-2" @click="getOrdersByPage(element)">{{element}}
            </span></h5>
        </div>
      </div>
    </div>
    <!-- Modal Details -->
    <modal v-if="showDetailModal" @close="showDetailModal = false">
      <div slot="header" class="w-100">
        <div class="d-flex w-auto">
          <h5 class="modal-title font-weight-bolder">Details</h5>
          <p class="font-weight-bold w-100 mb-0 float-right" style="text-align:right">Receipt no:#{{details[0].inv}}
          </p>
        </div>
        <p style="font-size: 12px;" class="mb-0 font-weight-bold">Cashier: {{details[0].cashier}}</p>
      </div>
      <div slot="body" style="max-height:50vh;overflow-y:scroll">
        <div class="text-center" v-if="isLoading">
          <div class="d-flex justify-content-center w-100">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <h5 class="mt-4">Fetching Data</h5>
        </div>
          <table v-else class="p-0 table table-borderless mt-4" style="width:100%;">
          <tbody>
            <tr v-for="item in details" :key="item.id" class="mb-3" style="width:100%">
              <td style="width:70%" class="pb-0 font-weight-bold">{{item.menu}} {{item.amount}}x</td>
              <td style="text-align:right; width:30%" class="pb-0 font-weight-bold">Rp.
                {{formatPrice(item.price*item.amount)}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold pb-0">PPN 10%</td>
              <td style="text-align:right" class="font-weight-bold pb-0">Rp.{{formatPrice(detailsPPN)}}</td>
            </tr>
            <tr>
              <td style="text-align:right" class="font-weight-bold pb-0">Total :</td>
              <td style="text-align:right" class="font-weight-bold pb-0">
                Rp.{{formatPrice(detailsTotal+detailsPPN)}}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold pb-0">Payment : Cash</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Checkout Footer -->
      <div slot="footer">
        <button class="btn btn-pink font-weight-bolder d-block mb-2" @click="showDetailModal = false"
          style="width:100%">Close</button>
      </div>
    </modal>
    <!-- End Modal Details -->
  </div>
</template>

<script>
import { posvueMixin } from '../helper/mixin'
import { mapActions, mapGetters } from 'vuex'
import Modal from '../components/Modal'
export default {
  name: 'RecentOrder',
  mixins: [posvueMixin],
  data () {
    return {
      showDetailModal: false
    }
  },
  components: {
    Modal
  },
  methods: {
    ...mapActions({
      actionOrder: 'orders/getOrders',
      actionDetails: 'orders/getDetails',
      actionDelete: 'orders/deleteOrders'
    }),
    getOrders (data) {
      this.actionOrder(data)
        .then((response) => {
          if (response.code === 400) {
            this.alertToast('error', 'No Order')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getOrdersByPage (page) {
      this.order.page = page
      this.getOrders(this.order)
    },
    getOrdersByRange () {
      this.order.page = 1
      this.getOrders(this.order)
    },
    getDetails (inv) {
      this.showDetailModal = true
      this.actionDetails(inv)
        .then((response) => {
          if (response.code === 200) {
            this.showDetailModal = true
          } else {
            this.alertToast('error', response.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    confirmDelete (inv) {
      this.$swal({
        title: 'Delete orders',
        text: `Are you sure want to delete order ${inv}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#57cad5',
        confirmButtonText: 'Confirm',
        cancelButtonColor: '#f24f8a',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.value) {
          this.actionDelete(inv)
            .then((response) => {
              if (response.code === 200) {
                this.getOrders(this.order)
                this.alertToast('success', 'Delete Order Success')
              } else {
                this.alertToast('error', response.msg)
              }
            })
            .catch((err) => { console.log(err) })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      orders: 'orders/orders',
      pagination: 'orders/pagination',
      details: 'orders/details',
      detailsTotal: 'orders/detailsTotal',
      detailsPPN: 'orders/detailsPPN',
      isLoading: 'orders/detailOrdersLoading'
    })
  },
  mounted () {
    this.getOrders(this.order)
  }
}
</script>

<style>

</style>
