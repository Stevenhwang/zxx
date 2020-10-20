import request from '@/utils/request'

export function getRefunds(params) {
  return request({
    url: '/refunds',
    method: 'get',
    params: params
  })
}

export function deleteRefund(id) {
  return request({
    url: `/refunds/${id}`,
    method: 'delete'
  })
}

export function createRefund(data) {
  return request({
    url: '/refunds',
    method: 'post',
    data: data
  })
}

export function updateRefund(id, data) {
  return request({
    url: `/refunds/${id}`,
    method: 'put',
    data: data
  })
}
