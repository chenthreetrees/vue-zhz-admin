import request from '@/utils/request'
import { Notification, Loading } from 'element-ui'

export function postRequest(config, data) {
  let loadingInstance = null
  if (config.hasLoading) {
    loadingInstance = Loading.service({
      lock: true,
      fullscreen: true,
      text: config.loadMsg || '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  return new Promise((resolve, reject) => {
    request({
      url: config.url,
      method: 'post',
      data
    }).then(res => {
      if (config.hasLoading) {
        loadingInstance.close()
      }
      if (config.withMsg && config.successMsg) {
        Notification.success({
          title: '成功',
          message: config.successMsg
        })
      }
      resolve(res)
    }).catch(err => {
      if (config.hasLoading) {
        loadingInstance.close()
      }
      if (config.withMsg) {
        Notification.error({
          title: '失败',
          message: config.errMsg || err.data.errmsg
        })
      }
      reject(err)
    })
  })
}

export function uploadFile(file, url = '/dv/system/uploadFile') {
  return new Promise((resolve, reject) => {
    const param = new FormData()
    param.append('file', file)
    request({
      url: url,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: param
    }).then(res => {
      resolve(res)
    }).catch(err => {
      Notification.error({
        title: '失败',
        message: err.data.errmsg
      })
      reject(err)
    })
  })
}
