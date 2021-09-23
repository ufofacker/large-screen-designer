
<template>
  <div
    :id="id"
    ref="barChart"
    class="bar-chart"
  />
</template>

<script>
import { isObject } from '@/utils'
import defaultOptions from './defaultOptions'
import ChartMixin from '../../mixin/chart.vue'
export default {
  name: 'BarChart',
  mixins: [ChartMixin],
  data() {
    return {
      refName: 'barChart'
    }
  },
  computed: {
    grid: function() {
      return isObject(this.config.grid) ? this.config.grid : defaultOptions.grid
    },
    legend: function() {
      return isObject(this.config.legend) ? this.config.legend : defaultOptions.legend
    },
    xAxis: function() {
      return isObject(this.config.xAxis) ? this.config.xAxis : defaultOptions.xAxis
    },
    yAxis: function() {
      return isObject(this.config.yAxis) ? this.config.yAxis : defaultOptions.yAxis
    },
    options: function() {
      return {
        ...defaultOptions,
        grid: { ...defaultOptions.grid, ...this.grid },
        legend: { ...defaultOptions.legend, ...this.legend },
        xAxis: { ...defaultOptions.xAxis, ...this.xAxis },
        yAxis: { ...defaultOptions.xAxis, ...this.yAxis }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>

