import request from '@/utils/request'

export function getSales(params) {
  return request({
    url: '/sales',
    method: 'get',
    params: params
  })
}

export function deleteSale(id) {
  return request({
    url: `/sales/${id}`,
    method: 'delete'
  })
}

export function createSale(data) {
  return request({
    url: '/sales',
    method: 'post',
    data: data
  })
}

export function updateSale(id, data) {
  return request({
    url: `/sales/${id}`,
    method: 'put',
    data: data
  })
}
