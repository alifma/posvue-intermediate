
<template>
  <div class="card mb-4">
    <div class="card-header border-0 bg-white">
      <!-- Title Section -->
      <div class="row">
        <div class="col-sm-12 col-lg-8 col-md-8 my-2">
        <h3 class="font-weight-bolder mb-0 mt-2">Recent Order</h3>
      </div>
      <div class="col-sm-12 col-lg-4 col-md-4 d-inline-flex">
        <select class="custom-select float-right ml-2"  v-model="order.limit" @change="getOrdersByRange()">
          <option value="5"> Limit: 5</option>
          <option value="10"> Limit: 10</option>
        </select>
        <select class="custom-select float-right ml-2"  v-model="order.range" @change="getOrdersByRange()">
          <option value="day"> Day</option>
          <option value="week"> Week </option>
          <option value="month"> Month </option>
          <option value="year"> Years</option>
        </select>
        <select class="custom-select float-right ml-2" style="width: min-content"  v-model="order.sort" @change="getOrdersByRange()">
          <option value="asc"> A &rarr; Z </option>
          <option value="desc"> Z &rarr; A </option>
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
                class="btn-sm btn btn-warning mr-1 mb-1">
                <b-icon icon="eye"></b-icon>
              </button>
              <button v-if="access == 0" @click="confirmDelete(element.inv)" class="btn-sm btn btn-danger mr-1 mb-1">
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
    <b-modal id="modal-details" hide-footer hide-header centered>
      <div class="d-flex w-auto">
        <h5 class="modal-title font-weight-bolder">Checkout</h5>
        <p class="font-weight-bold w-100 mb-0 float-right" style="text-align:right">Receipt no:#{{details[0].inv}}
        </p>
      </div>
      <div class="d-flex w-auto">
        <p style="font-size: 12px;text-align:left" class="mb-0 w-50 font-weight-bold">Cashier: {{details[0].cashier}}</p>
      </div>
      <!-- Body Checkout-->
      <div style="max-height:50vh;overflow-y:scroll">
        <div class="text-center p-4 m-4" v-if="isLoading">
          <div class="d-flex justify-content-center w-100">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <h5 class="mt-4">Fetching Data</h5>
        </div>
        <table v-else class="p-0 table table-borderless mt-4" style="width:100%">
          <tbody>
            <tr v-for="item in details" :key="item.id" class="mb-3" style="width:100%">
              <td style="width:70%;text-align:left" class="pb-0 font-weight-bold">{{item.menu}} {{item.amount}}x</td>
              <td style="text-align:right; width:30%" class="pb-0 font-weight-bold">Rp.
                {{formatPrice(item.price*item.amount)}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold pb-0" style="text-align:left">PPN 10%</td>
              <td style="text-align:right" class="font-weight-bold pb-0">Rp.{{formatPrice(detailsPPN)}}</td>
            </tr>
            <tr>
              <td style="text-align:right" class="font-weight-bold pb-0">Total :</td>
              <td style="text-align:right" class="font-weight-bold pb-0">
                Rp.{{formatPrice(detailsTotal+detailsPPN)}}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold pb-0" style="text-align:left">Payment : Cash</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End Body Checkout -->
      <!-- Checkout Option -->
      <div>
        <button class="btn btn-pink font-weight-bolder d-block mb-2" @click="$bvModal.hide('modal-details')"
          style="width:100%">Close</button>
      </div>
      <!-- End Checkout Option -->
    </b-modal>
  </div>
</template>

<script>
import { posvueMixin } from '../helper/mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RecentOrder',
  mixins: [posvueMixin],
  data () {
    return {
      showDetailModal: false
    }
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
      this.$bvModal.show('modal-details')
      this.actionDetails(inv)
        .then((response) => {
          if (response.code === 200) {
            this.$bvModal.show('modal-details')
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
      isLoading: 'orders/detailOrdersLoading',
      access: 'auth/getAccess'
    })
  },
  mounted () {
    this.getOrders(this.order)
  }
}
</script>

<style>

</style>
