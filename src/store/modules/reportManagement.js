// import { getReportDetails } from '@/api/user'
import { Message } from 'element-ui'
/**
 *chartObj示例
 *{
 *  componentName: 'line-chart', // 组件名称
 *  id: '组件id', // 为组件增加唯一标识
 *  details: {
 *    width: 300,
 *    height: 200,
 *    chartOptions:{
 *      ...图表配置
 *    }
 *  },
 *  api:{
 *    url: '/user', // `url` 服务端图表接口地址
 *    method: 'get', // `method` 是创建请求时使用的方法
 *    data: { // `data` 是作为请求主体被发送的数据
 *    }
 *  }
 *}
 */
const getDefaultState = () => {
  return {
    drawingChartList: [], // 绘制中图表列表
    savedChartList: [] // 已保存的图表列表
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 绘制列表新增项
  SET_DRAWING_LIST: (state, list) => {
    state.drawingChartList = [...state.drawingChartList, ...list]
  },
  // 更新图表配置
  UPDATE_DRAWING_LIST_ITEM: (state, config) => {
    const _res = state.drawingChartList.find((item, key) => {
      return item.id === config.id
    })
    const _list = ['geoInfo', 'chartOptions']
    _list.forEach((item, key) => {
      if (config[item]) {
        const _obj = _res.details[item]
        _res.details[item] = { ..._obj, ...config[item] }
      }
    })
  },
  // 更新图表几何信息
  UPDATE_CHART_GEOINFO: (state, config) => {
    const _res = state.drawingChartList.find((item, key) => {
      return item.id === config.id
    })
    _res.details = { ..._res.details, ...config.geoInfo }
  },
  // 更新图表接口配置
  UPDATE_CHART_API: (state, config) => {
    const _res = state.drawingChartList.find((item, key) => {
      return item.id === config.id
    })
    _res.api = { ..._res.api, ...config.api }
  }
}
const actions = {
  /**
  * @description 获取报表详情
  */
  getReportDetails({ commit, state }) {
    const _strData = localStorage.getItem('reportList')
    if (_strData) {
      commit('SET_DRAWING_LIST', JSON.parse(_strData))
    }
  },
  /**
  * @description 保存大屏数据，暂时将数据保存在localstorage
  */
  saveReportInfo({ state }, data) {
    debugger
    const _strData = JSON.stringify(state.drawingChartList)
    localStorage.setItem('reportList', _strData)
    Message.success('配置保存成功！')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

