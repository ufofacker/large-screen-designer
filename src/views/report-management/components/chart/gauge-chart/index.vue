
<template>
  <div
    :id="id"
    :ref="refName"
    class="gauge-chart"
  />
</template>

<script>
import { isObject } from '@/utils'
import defaultOptions from './defaultOptions'
import ChartMixin from '../../mixin/chart.vue'
export default {
  name: 'GaugeChart',
  mixins: [ChartMixin],
  data() {
    return {
      refName: 'gaugeChart'
    }
  },
  computed: {
    title: function() {
      if (this.config.chartOptions) {
        return isObject(this.config.chartOptions.title) ? this.config.chartOptions.title : defaultOptions.title
      }
      return defaultOptions.title
    },
    options: function() {
      return {
        ...defaultOptions,
        title: { ...defaultOptions.title, ...this.title }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gauge-chart {
  width: 100%;
  height: 100%;
}
</style>

