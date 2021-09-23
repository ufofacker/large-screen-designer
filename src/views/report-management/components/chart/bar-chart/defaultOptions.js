import * as echarts from 'echarts'
import { commonStyle } from '../chartStyle'
export default {
  backgroundColor: commonStyle.canvasBg,
  title: {
    text: '柱状图',
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
    boundaryGap: true,
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
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
    type: 'bar',
    name: '成交量',
    data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66, 100, 150],
    itemStyle: {
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
