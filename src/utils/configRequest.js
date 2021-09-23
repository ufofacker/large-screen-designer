import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
export const genConfigRequest = ({ baseURL = '', url = '', method = 'post', params = {}, data = {}} = {}) => {
  const _headers = {}
  if (store.getters.token) {
    _headers['X-Token'] = getToken()
  }
  return new Promise((resolve, reject) => {
    axios({
      // baseURL: baseURL,
      url: 'http://www.baidu.com',
      method: method,
      headers: _headers,
      params: params,
      data: data
    }).then((res) => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

