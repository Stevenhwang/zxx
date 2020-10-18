import request from '@/utils/request'

export function getMaterialTypes(params) {
  return request({
    url: '/materialTypes',
    method: 'get',
    params: params
  })
}

export function deleteMaterialType(id) {
  return request({
    url: `/materialTypes/${id}`,
    method: 'delete'
  })
}
