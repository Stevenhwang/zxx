import request from '@/utils/request'

export function getMaterials(params) {
  return request({
    url: '/materials',
    method: 'get',
    params: params
  })
}

export function deleteMaterial(id) {
  return request({
    url: `/materials/${id}`,
    method: 'delete'
  })
}

export function createMaterial(data) {
  return request({
    url: '/materials',
    method: 'post',
    data: data
  })
}

export function updateMaterial(id, data) {
  return request({
    url: `/materials/${id}`,
    method: 'put',
    data: data
  })
}
