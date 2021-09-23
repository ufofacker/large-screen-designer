const configTypeMapping = {
  'line-chart': {
    compList: ['title', 'legend', 'xAxis', 'yAxis', 'series'],
    bindData: { // 图表绑定的字段
      name: '',
      configType: 'line-chart',
      label: '', // x轴绑定字段
      value: ''// y轴绑定字段
    }
  },
  'bar-chart': {
    compList: ['title', 'legend', 'xAxis', 'yAxis', 'series'],
    bindData: { // 图表绑定的字段
      name: '',
      configType: 'bar-chart',
      label: '', // x轴绑定字段
      value: ''// y轴绑定字段
    }
  },
  'pie-chart': {
    compList: ['title', 'legend', 'series'],
    bindData: { // 图表绑定的字段
      name: '',
      configType: 'pie-chart',
      label: '', // x轴绑定字段
      value: ''// y轴绑定字段
    }

  },
  'gauge-chart': {
    compList: ['title', 'series'],
    bindData: { // 图表绑定的字段
      name: '',
      configType: 'gauge-chart',
      label: '', // x轴绑定字段
      value: ''// y轴绑定字段
    }
  }
}
// 获取图表对应的可配置组件项
export const getConfigByChartType = (type) => {
  return configTypeMapping[type].compList
}
// 获取接口绑定字段
export const getBindData = (type) => {
  return configTypeMapping[type].bindData
}
export const genCommConfig = () => {
  return {
    title: { // 图表标题
      _showChartConfig: false, // 是否展示对应的类型配置
      text: '', // 标题
      show: false, // 是否展示标题
      left: '', // 标题位置
      textStyle: {
        fontSize: 0, // 字体大小
        fontWeight: '', // 字体粗细
        color: ''// 标题颜色
      }
    },
    legend: { // 图例
      _showChartConfig: false, // 是否展示对应的类型配置
      show: false,
      icon: 'stack',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { // 图例文本样式
        fontSize: 0, // 字体大小
        fontWeight: '', // 字体粗细
        color: ''// 标题颜色
      },
      data: ['haha']
    },
    xAxis: {
      _showChartConfig: false,
      name: '', // 坐标轴名称
      nameTextStyle: { // 坐标轴名称样式配置
        color: '',
        fontWeight: '',
        fontSize: 0
      },
      splitLine: { // 网格线
        show: false
      }
    },
    yAxis: {
      _showChartConfig: false,
      name: '', // 坐标轴名称
      nameTextStyle: { // 坐标轴名称样式配置
        color: '',
        fontWeight: '',
        fontSize: 0
      },
      splitLine: { // 网格线
        show: false
      }
    }
  }
}
export const genApiConfig = () => {
  return {
    url: '', // `url` 是用于请求的服务器 URL
    method: 'get', // `method` 是创建请求时使用的方法
    data: { // `data` 是作为请求主体被发送的数据
    },
    dataBind: []
  }
}
