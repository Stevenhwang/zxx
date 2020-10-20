import request from '@/utils/request'

export function getPayments(params) {
  return request({
    url: '/payments',
    method: 'get',
    params: params
  })
}

export function deletePayment(id) {
  return request({
    url: `/payments/${id}`,
    method: 'delete'
  })
}

export function createPayment(data) {
  return request({
    url: '/payments',
    method: 'post',
    data: data
  })
}

export function updatePayment(id, data) {
  return request({
    url: `/payments/${id}`,
    method: 'put',
    data: data
  })
}
