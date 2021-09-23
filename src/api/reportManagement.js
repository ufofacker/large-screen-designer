import request from '@/utils/request'

export function getDataByDynamicURL(params) {
  return request({
    url: '/vue-admin-template/chart/excuteUrl',
    method: 'post',
    data: params
  })
}

export function getReportList(params) {
  return request({
    url: '/vue-admin-template/report/list',
    method: 'post',
    params
  })
}
export function getReportDetails(params) {
  return request({
    url: '/vue-admin-template/report/details',
    method: 'post',
    params
  })
}
