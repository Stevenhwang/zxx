import request from '@/utils/request'

export function getRespays(params) {
  return request({
    url: '/respays',
    method: 'get',
    params: params
  })
}

export function deleteRespay(id) {
  return request({
    url: `/respays/${id}`,
    method: 'delete'
  })
}

export function createRespay(data) {
  return request({
    url: '/respays',
    method: 'post',
    data: data
  })
}

export function updateRespay(id, data) {
  return request({
    url: `/respays/${id}`,
    method: 'put',
    data: data
  })
}
