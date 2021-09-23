<template>
  <div
    :id="id"
    ref="lineChart"
    class="line-chart"
  />
</template>

<script>
import { isObject } from '@/utils'
import defaultOptions from './defaultOptions'
import ChartMixin from '../../mixin/chart.vue'
export default {
  name: 'LineChart',
  mixins: [ChartMixin],
  data() {
    return {
      refName: 'lineChart'
    }
  },
  computed: {
    title: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.title) ? this.config.chartOptions.title : defaultOptions.title
      }
      return defaultOptions.title
    },
    grid: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.grid) ? this.config.chartOptions.grid : defaultOptions.grid
      }
      return defaultOptions.grid
    },
    legend: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.legend) ? this.config.chartOptions.legend : defaultOptions.legend
      }
      return defaultOptions.legend
    },
    xAxis: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.xAxis) ? this.config.chartOptions.xAxis : defaultOptions.xAxis
      }
      return defaultOptions.xAxis
    },
    yAxis: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.yAxis) ? this.config.chartOptions.yAxis : defaultOptions.yAxis
      }
      return defaultOptions.yAxis
    },
    options: function() {
      return {
        ...defaultOptions,
        title: { ...defaultOptions.title, ...this.title },
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
.line-chart {
  width: 100%;
  height: 100%;
}
</style>

