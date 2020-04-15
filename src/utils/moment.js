import moment from 'moment'

// 获取最近几个月
export function getLastMonths(num, format = 'YYYY-MM') {
  const date = []
  const end = moment().format(format)
  const start = moment().subtract(num, 'months').format(format)
  date.push(start)
  date.push(end)
  return date
}

export function getCurDate(format = 'YYYY-MM-DD') {
  return moment().format(format)
}

export function getCurTime(format = 'YYYY-MM-DD hh:mm') {
  return moment().format(format)
}

export function dateformat(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)
}
