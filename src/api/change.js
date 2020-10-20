import request from '@/utils/request'

export function getChanges(params) {
  return request({
    url: '/changes',
    method: 'get',
    params: params
  })
}

export function deleteChange(id) {
  return request({
    url: `/changes/${id}`,
    method: 'delete'
  })
}

export function createChange(data) {
  return request({
    url: '/changes',
    method: 'post',
    data: data
  })
}

export function updateChange(id, data) {
  return request({
    url: `/changes/${id}`,
    method: 'put',
    data: data
  })
}
