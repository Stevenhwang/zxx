import request from '@/utils/request'

export function getMaterialTypes(params) {
  return request({
    url: '/materialTypes',
    method: 'get',
    params: params
  })
}
