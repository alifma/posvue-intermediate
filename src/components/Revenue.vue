<template>
  <div class="card mb-4">
    <div class="card-header border-0 bg-white">
      <!-- Title -->
      <h3 class="font-weight-bolder d-inline-block mb-0 mt-2">Revenue</h3>
      <!-- Dropdown -->
      <div class="btn-group m-1 float-right">
        <button disabled class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Month
        </button>
      </div>
    </div>
    <div class="card-body pt-0">
      <!-- LineCart -->
      <div class="small">
        <line-chart :chart-data="datacollection" :options="datacollection.options" :height=100 :width=400>
        </line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../components/LineChart.js'
export default {
  name: 'Revenue',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: {}
    }
  },
  methods: {
    fillData    () {
      this.datacollection = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          responsive: true
        },
        datasets: [{
          label: 'This Month',
          fill: false,
          data: [0, 20, 10, 30, 20, 40, 10, 50, 40, 30, 35, 20, 48, 35, 40, 22, 38, 30],
          borderColor: [
            'rgba(0, 241, 255, 1)'
          ],
          borderWidth: 1
        }, {
          label: 'Last Month',
          fill: false,
          data: [10, 30, 5, 30, 40, 38, 10, 30, 20, 40, 8, 25, 20, 50, 10, 28, 10, 40],
          borderColor: [
            'rgba(242, 79, 138, 1)'
          ],
          borderWidth: 1
        }]
      }
    }
  },
  mounted () {
    this.fillData()
  }
}
</script>
