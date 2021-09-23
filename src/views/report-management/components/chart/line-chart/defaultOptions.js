import * as echarts from 'echarts'
import { commonStyle } from '../chartStyle'
export default {
  backgroundColor: commonStyle.canvasBg,
  title: {
    text: '折线图',
    show: true,
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      textAlign: 'left',
      color: '#4f647f'
    }
  },
  grid: {
    left: '5%',
    right: '50',
    top: '20%',
    bottom: '15%',
    containLabel: true
  },
  legend: {
    show: true,
    left: 'right',
    icon: 'stack',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: commonStyle.legendText,
      fontSize: 12,
      fontWeight: 'normal'
    },
    data: ['成交量']
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: commonStyle.axisLine
      }
    },
    axisLabel: {
      color: commonStyle.axisLabel,
      margin: 15
    },
    axisTick: { show: true },
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
    max: function(value) {
      return value.max + 20
    },
    min: 0,
    axisLine: {
      show: true,
      lineStyle: {
        color: commonStyle.axisLine
      }
    },
    axisLabel: {
      color: commonStyle.axisLabel,
      margin: 15
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: commonStyle.splitLine
      }
    },
    axisTick: { show: true }
  },
  series: [{
    name: '成交量',
    smooth: true,
    data: [10, 50, 100, 150, 100, 50, 150],
    type: 'line',
    lineStyle: {
      color: '#3deaff' // 线条颜色
    },
    symbolSize: 10,
    itemStyle: {
      color: '#2ec7c9'
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: commonStyle.linearGradientStart
      }, {
        offset: 1,
        color: commonStyle.linearGradientEnd
      }]),
      opacity: 0.8
    }
  }]
}
