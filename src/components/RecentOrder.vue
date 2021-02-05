
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
      <table class="table table-responsive-sm" style="width:100%">
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
            <td class="text-center">Rp. {{formatPrice(element.total?element.total:0)}}</td>
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
  </div>
</template>

<script>
import { posvueMixin } from '../helper/mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RecentOrder',
  mixins: [posvueMixin],
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
      this.actionDetails(inv)
        .then((response) => {
          if (response.code === 200) {
            this.alertToast('success', response.data)
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
      pagination: 'orders/pagination'
    })
  },
  mounted () {
    this.getOrders(this.order)
  }
}
</script>

<style>

</style>
