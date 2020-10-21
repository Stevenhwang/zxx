import request from '@/utils/request'

export function getCancellations(params) {
  return request({
    url: '/cancellations',
    method: 'get',
    params: params
  })
}

export function deleteCancellation(id) {
  return request({
    url: `/cancellations/${id}`,
    method: 'delete'
  })
}

export function createCancellation(data) {
  return request({
    url: '/cancellations',
    method: 'post',
    data: data
  })
}

export function updateCancellation(id, data) {
  return request({
    url: `/cancellations/${id}`,
    method: 'put',
    data: data
  })
}
