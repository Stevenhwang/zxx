import request from '@/utils/request'

export function getDashboard() {
  return request({
    url: '/getDashboard',
    method: 'get'
  })
}
