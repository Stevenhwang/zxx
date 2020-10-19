import request from '@/utils/request'

export function getProductTypes(params) {
  return request({
    url: '/productTypes',
    method: 'get',
    params: params
  })
}

export function deleteProductType(id) {
  return request({
    url: `/productTypes/${id}`,
    method: 'delete'
  })
}

export function createProductType(data) {
  return request({
    url: '/productTypes',
    method: 'post',
    data: data
  })
}

export function updateProductType(id, data) {
  return request({
    url: `/productTypes/${id}`,
    method: 'put',
    data: data
  })
}
