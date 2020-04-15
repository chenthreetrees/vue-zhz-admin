import request from '@/utils/request'

export function tableList(url, data, method = 'post') {
  if (method === 'get') {
    return request({
      url: url,
      method: method,
      params: data
    })
  } else {
    return request({
      url: url,
      method: method,
      data
    })
  }
}

export function insertOrUpdate(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function doDelete(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
