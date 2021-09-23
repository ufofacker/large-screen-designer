import { commonStyle } from '../chartStyle'
export default {
  backgroundColor: commonStyle.canvasBg,
  legend: {
    show: true,
    left: 'center',
    y: '10',
    icon: 'stack',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: commonStyle.legendText
    },
    data: ['rose1', 'rose2', 'rose3', 'rose4']
  },
  series: [{
    type: 'pie',
    radius: ['20%', '80%'],
    roseType: 'area',
    top: '20%',
    itemStyle: {
      borderRadius: 8
    },
    label: {
      position: 'outside',
      fontSize: 14,
      color: commonStyle.legendText,
      lineHeight: 10,
      borderWidth: 10,
      borderRadius: 4
    },
    labelLine: {
      show: true,
      length: 8,
      length2: 8,
      lineStyle: {
        type: 'solid',
        color: 'red'
      }
    },
    data: [
      { value: 40, name: 'rose1' },
      { value: 45, name: 'rose2' },
      { value: 50, name: 'rose3' },
      { value: 60, name: 'rose4' }
    ]
  }]
}
