import request from '@/utils/request'

export function getEntrytickets(params) {
  return request({
    url: '/entrytickets',
    method: 'get',
    params: params
  })
}

export function deleteEntryticket(id) {
  return request({
    url: `/entrytickets/${id}`,
    method: 'delete'
  })
}

export function createEntryticket(data) {
  return request({
    url: '/entrytickets',
    method: 'post',
    data: data
  })
}

export function updateEntryticket(id, data) {
  return request({
    url: `/entrytickets/${id}`,
    method: 'put',
    data: data
  })
}
