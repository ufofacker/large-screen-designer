
const mockData = require('./mock-data/data')
const Mock = require('mockjs')
const reportList = Mock.mock({
  'list|0': [{
    id: `@id`,
    reportName: '@sentence(1, 3)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'wyy',
    createTime: '@datetime(yyyy-MM-dd)'
  }]
})
const reportDetails = Mock.mock({
  'list|0': [{
    id: `@id`,
    reportName: '@sentence(1, 3)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'wyy',
    createTime: '@datetime(yyyy-MM-dd)'
  }]
})
module.exports = [
  {
    url: '/vue-admin-template/report/list',
    type: 'post',
    response: config => {
      const _list = reportList.list
      return {
        code: 20000,
        message: 'success',
        data: {
          total: _list.length,
          list: _list
        }
      }
    }
  },
  {
    url: '/vue-admin-template/report/details',
    type: 'post',
    response: config => {
      const _list = reportDetails.list
      return {
        code: 20000,
        message: 'success',
        data: {
          total: _list.length,
          list: _list
        }
      }
    }
  },
  {
    url: '/vue-admin-template/chart/excuteUrl',
    type: 'post',
    response: config => {
      const _str = config.body.url
      const _key = _str.substring(_str.lastIndexOf('/') + 1, _str.length)
      console.log(config.body.url)
      return {
        code: 20000,
        message: 'success',
        data: mockData[_key]
      }
    }
  }
]
