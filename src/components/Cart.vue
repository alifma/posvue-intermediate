<template>
  <div>
    <div v-if="!carts.length" class="text-center p-4">
      <img class="img" style="width: 150px;" src="https://i.ibb.co/WFxBbwg/i-empty.png" alt="">
      <p class="font-weight-bolder mb-0" style="font-size: 24px;">Your cart is empty</p>
      <p class="font-weight-bold" style="font-size:15px;color:#CECECE;">Please add some items from the menu</p>
    </div>
    <div v-else class="cart">
      <ul class="list-group mb-3 w-100" style="height:50vh;overflow-y:scroll">
        <li class="list-group-item p-0 mb-3 border-0" v-for="(item, index) in carts" :key="index">
          <div class="media w-100 ">
            <img :src="`${baseURL}/img/${item.image}`" style="border-radius:5px" class="mr-3 menuImgCart"
              :alt="item.image">
            <div class="media-body w-100">
              <h5 class="mt-0 pt-1 font-weight-bold">{{item.name}}</h5>
              <div class="d-flex align-items-center mb-1">
                <table class="table font-weight-bolder table-bordered mb-0"
                  style="width:30px; color:rgba(130, 222, 58, 1)">
                  <thead>
                    <tr style="line-height: 10px;width: 10px;">
                      <td style="background-color: rgba(193, 245, 153, 0.5);" @click="minQty(item.id)">-
                      </td>
                      <td class="bg-white">{{item.amount}}</td>
                      <td style="background-color: rgba(193, 245, 153, 0.5);" @click="addQty(item.id)">+</td>
                    </tr>
                  </thead>
                </table>
                <p class="card-text font-weight-bold w-100 mr-2" style="text-align:right">
                  Rp. {{formatPrice(item.price)}}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div>
        <!-- Checkout Option -->
        <div id="checkOut" style="text-align:left">
          <h6 class="font-weight-bolder mb-0 d-inline">Total:<span style="float:right">
              Rp.{{formatPrice(totalPrice)}}*</span></h6>
          <p style="font-size: 12px;">*Belum termasuk PPN</p>
          <!-- Input Name & Cashier -->
          <div class="input-group mb-3">
            <input type="text" class="form-control mr-1" required v-model="trans.cashier" :placeholder="trans.cashier" readonly>
            <input type="number" class="form-control ml-1" required v-model="trans.invoices" placeholder="Invoices">
          </div>
          <!-- End Input Name & Cashier -->
          <button class="btn btn-blue d-block mb-2" style="width:100%" @click="checkout()"
            type="submit">Checkout</button>
          <a href="#" class="btn btn-pink d-block" @click="cancelCart('Cart has been cleaned')" style="width:100%">Cancel</a>
        </div>
        <!-- End Checkout Option -->
      </div>
      <!-- ModalCheckout -->
      <modal v-if="showCheckoutModal" @close="showCheckoutModal = false">
        <div slot="header" class="w-100">
          <div class="d-flex w-auto">
            <h5 class="modal-title font-weight-bolder">Checkout</h5>
            <p class="font-weight-bold w-100 mb-0 float-right" style="text-align:right">Receipt no:#{{trans.invoices}}
            </p>
          </div>
          <p style="font-size: 12px;text-align:left" class="mb-0 font-weight-bold">Cashier: {{trans.cashier}}</p>
        </div>
        <div slot="body" style="max-height:50vh;overflow-y:scroll">
          <table class="p-0 table table-borderless mt-4" style="width:100%">
            <tbody>
              <tr v-for="item in carts" :key="item.id" class="mb-3" style="width:100%">
                <td style="width:70%;text-align:left" class="pb-0 font-weight-bold">{{item.name}} {{item.amount}}x</td>
                <td style="text-align:right; width:30%" class="pb-0 font-weight-bold">Rp.
                  {{formatPrice(item.price)}}</td>
              </tr>
              <tr>
                <td class="font-weight-bold pb-0" style="text-align:left">PPN 10%</td>
                <td style="text-align:right" class="font-weight-bold pb-0">Rp.{{formatPrice(ppn)}}</td>
              </tr>
              <tr>
                <td style="text-align:right" class="font-weight-bold pb-0">Total :</td>
                <td style="text-align:right" class="font-weight-bold pb-0">
                  Rp.{{formatPrice(totalPrice+ppn)}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold pb-0" style="text-align:left">Payment : Cash</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Checkout Footer -->
        <div slot="footer">
          <button class="btn btn-pink font-weight-bolder d-block mb-2"
            @click="postCart();" style="width:100%">Print</button>
          <p class="mb-0 font-weight-bold text-center">Or</p>
          <button class="btn btn-blue font-weight-bolder d-block"
            @click="postCart();" style="width:100%">SendEmail</button>
        </div>
      </modal>
      <!-- End Modal Checkout -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { posvueMixin } from '../helper/mixin'
import Modal from '../components/Modal'
export default {
  mixins: [posvueMixin],
  components: {
    Modal
  },
  data () {
    return {
      showCheckoutModal: false,
      trans: {
        cashier: '',
        invoices: 0
      }
    }
  },
  methods: {
    ...mapActions({
      addQty: 'menus/addQty',
      minQty: 'menus/minQty',
      clearCarts: 'menus/clearCarts',
      postCarts: 'menus/postCart'
    }),
    cancelCart (msg) {
      this.clearCarts()
      this.trans.cashier = this.cashier
      this.trans.invoices = 0
      this.alertToast('success', msg)
    },
    checkout () {
      if (this.trans.cashier === '' || this.trans.invoices === 0) {
        this.alertToast('error', 'Please Insert Cashier Name & Invoices')
      } else if (this.trans.invoices.length > 10) {
        this.alertToast('error', 'Please Check Invoices Length')
      } else {
        this.showCheckoutModal = true
      }
    },
    postCart () {
      this.postCarts(this.trans)
        .then((response) => {
          if (response.data.code === 200) {
            this.clearCarts()
            this.trans.cashier = this.cashier
            this.trans.invoices = 0
            this.alertToast('success', 'Order data success')
          } else {
            this.clearCarts()
            this.trans.cashier = this.cashier
            this.trans.invoices = 0
            this.alertToast('error', response.data.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.showCheckoutModal = false
    }
  },
  computed: {
    ...mapGetters({
      carts: 'menus/carts',
      totalPrice: 'menus/totalPrice',
      ppn: 'menus/ppn',
      cashier: 'auth/getCashier'
    })
  },
  mounted () {
    this.trans.cashier = this.cashier
  }
}
</script>

<style>

</style>
