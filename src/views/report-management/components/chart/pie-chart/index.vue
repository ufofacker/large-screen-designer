
<template>
  <div
    :id="id"
    ref="pieChart"
    class="pie-chart"
  />
</template>

<script>
import { isObject } from '@/utils'
import defaultOptions from './defaultOptions'
import ChartMixin from '../../mixin/chart.vue'
export default {
  name: 'PieChart',
  mixins: [ChartMixin],
  data() {
    return {
      refName: 'pieChart'
    }
  },
  computed: {
    legend: function() {
      return isObject(this.config.legend) ? this.config.legend : defaultOptions.legend
    },
    options: function() {
      return {
        ...defaultOptions,
        legend: { ...defaultOptions.legend, ...this.legend }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>

