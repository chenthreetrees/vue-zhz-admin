import { postRequest } from '../base'

export function index(data) {
  return postRequest({
    url: '/stat/index',
    withMsg: true
  }, data)
}

export function indexCity(data) {
  return postRequest({
    url: '/stat/indexCity',
    withMsg: true
  }, data)
}
