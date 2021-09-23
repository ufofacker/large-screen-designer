<script>
import * as echarts from 'echarts'
import { getDataByDynamicURL } from '@/api/reportManagement'
export default {
  props: {
    id: {
      type: String,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    api: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chartInstance: null // 折线图实例
    }
  },
  watch: {
    api: {
      deep: true,
      handler: function(val) {
        this.getData(val)
      }
    }
  },
  beforeDestroy() {
    this.chartInstance && echarts.dispose(this.chartInstance)
  },
  mounted() {
    this.createChart()
  },
  methods: {
    getData(params) {
      const self = this
      getDataByDynamicURL(params).then((res) => {
        if (Array.isArray(res.data)) {
          const _res = res.data
          self.api.dataBind.forEach((item, key) => {
            for (const fItem in item) {
              if (['name', 'configType'].includes(fItem)) {
                continue
              }
              const funMapping = {
                'line-chart': self.formatHasAxisChartData,
                'bar-chart': self.formatHasAxisChartData,
                'gauge-chart': self.formatGaugeChartData,
                'pie-chart': self.formatPieChartData
              }
              funMapping[item.configType](fItem, item, _res)
            }
          })
        }
        this.chartInstance.setOption(this.options)
      })
    },
    formatHasAxisChartData(fItem, item, data) {
      const self = this
      if (fItem === 'value') {
        const _target = self.options.series.find((tItem, key) => {
          return tItem.name === item.name
        })
        _target.data = data.map((mItem, key) => {
          return mItem[item['value']]
        })
      } else if (fItem === 'label') {
        self.options['xAxis'].data = data.map((mItem, key) => {
          return mItem[item['label']]
        })
      }
    },
    formatGaugeChartData(fItem, item, data) {
      const self = this
      if (fItem === 'value') {
        const _target = self.options.series.find((tItem, key) => {
          return tItem.name === item.name
        })
        _target.data = data.map((mItem, key) => {
          return {
            value: mItem[item['value']]
          }
        })
      } else if (fItem === 'label') {
        //
      }
    },
    formatPieChartData(fItem, item, data) {
      const self = this
      if (fItem === 'value') {
        const _targetSeries = self.options.series[0]
        _targetSeries.data = data.map((mItem, key) => {
          return {
            value: mItem[item['value']],
            name: mItem[item['label']]
          }
        })
      }
    },
    createChart() {
      const _lineChart = this.$refs[this.refName]
      const _echarts = echarts.getInstanceByDom(_lineChart)
      if (!_echarts) {
        this.chartInstance = echarts.init(_lineChart)
        this.chartInstance.setOption(this.options)
      }
    },
    updateChart(options) {
      const self = this
      const _keys = Object.keys(options)
      _keys.forEach((item, key) => {
        if (item === 'series') {
          const _res = self.options[item].map((sItem, sKey) => {
            return Object.assign({}, sItem, options[item][sKey])
          })
          self.options[item] = _res
        } else {
          self.options[item] = { ...self.options[item], ...options[item] }
        }
      })
      self.chartInstance.setOption(self.options)
    }
  }
}
</script>
