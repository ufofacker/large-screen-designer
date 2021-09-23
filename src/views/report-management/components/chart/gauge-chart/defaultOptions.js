
import { commonStyle, gaugeChart } from '../chartStyle'
import * as echarts from 'echarts'
const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
  offset: 0,
  color: '#409EFF'
},
{
  offset: 0.5,
  color: '#E6A23C' // 100% 处的颜色
},
{
  offset: 1,
  color: '#F56C6C' // 100% 处的颜色
}
])

var colorSet = [
  [1, color]
]

export default {
  backgroundColor: commonStyle.canvasBg,
  title: {
    text: '仪表盘',
    show: true,
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
      textAlign: 'left',
      color: '#4f647f'
    }
  },
  series: [{
    name: '仪表盘',
    radius: '90%',
    splitNumber: 10,
    z: 10,
    type: 'gauge',
    center: ['50%', '58%'],
    detail: {
      show: false
    },
    data: [{
      value: 100
    }],
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        width: 10,
        color: colorSet
      }
    },
    axisLabel: {
      show: false
    },
    pointer: {
      show: true,
      length: '45%',
      width: '5%'
    },
    itemStyle: {
      color: '#08BBED'
    }
  },
  {
    type: 'gauge',
    name: 'style', // 用来实现特殊效果的图例统一用style命名
    radius: '90%',
    center: ['50%', '58%'],
    splitNumber: 10,
    z: 8,
    axisTick: {
      show: false
    },
    splitLine: {
      length: 10,
      lineStyle: {
        width: 2,
        color: gaugeChart.splitLine
      }
    },
    axisLabel: {
      color: commonStyle.defaultText,
      fontSize: 10
    },
    pointer: {
      show: false
    },
    axisLine: {
      lineStyle: {
        opacity: 0
      }
    },
    detail: {
      show: false
    }
  }
  ]
}
