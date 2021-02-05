<template>
  <div class="container-fluid">
    <!-- Daily Income Card -->
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12 mb-4 pl-0" style="vertical-alignment:middle">
        <div id="card1" class="card p-4 h-100">
          <div class="card-body d-flex flex-column justify-content-center">
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">Today's Income</p>
            <h5 class="card-title mb-0 font-weight-bolder">Rp. {{formatPrice(incomeData.todaysIncome)}}</h5>
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">{{Number(incomeData.gainIncome) > 0 ? '+' + Number(incomeData.gainIncome) : Number(incomeData.gainIncome)}}% Yesterday</p>
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips1">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips2">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips3">
          </div>
        </div>
      </div>
      <!-- Orders Card -->
      <div class="col-lg-4 col-md-4 col-sm-12 mb-4 pl-0">
        <div id="card2" class="card p-4 h-100">
          <div class="card-body d-flex flex-column justify-content-center">
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">Orders</p>
            <h5 class="card-title mb-0 font-weight-bolder">{{incomeData.thisWeekOrders}}</h5>
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">{{Number(incomeData.gainOrders) > 0 ? '+' + Number(incomeData.gainOrders) : Number(incomeData.gainOrders)}}% Last Week</p>
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips1">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips2">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips3">
          </div>
        </div>
      </div>
      <!-- Year's Card -->
      <div class="col-lg-4 col-md-4 col-sm-12 mb-4 pl-0">
        <div id="card3" class="card p-4 h-100">
          <div class="card-body d-flex flex-column justify-content-center">
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">This Year's Income</p>
            <h5 class="card-title mb-0 font-weight-bolder">Rp. {{formatPrice(incomeData.totalIncome)}}</h5>
            <p class="card-text mb-1 font-weight-bold" style="font-size:12px">+10% Last Year</p>
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips1">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips2">
            <img src="https://i.ibb.co/yycXDvx/i-elips.png" class="elips3">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { posvueMixin } from '../helper/mixin'
import { mapGetters } from 'vuex'
export default {
  mixins: [posvueMixin],
  name: 'CardIncome',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      incomeData: 'orders/pagination'
    })
  }
}
</script>

<style>

</style>
