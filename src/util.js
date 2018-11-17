export function formatDate(s) {
  const bs = s.split(' ')
  const date = new Date(bs[0] + 'T' + bs[1] + '+08:00')
  if (isNaN(date.getDate())) {
    return ''
  }
  const seconds = parseInt((new Date() - date) / 1000, 10)
  if (seconds < 60) {
    return '刚刚'
  }
  const minutes = parseInt(seconds / 60, 10)
  if (minutes < 60) {
    return `${minutes}分钟前`
  }
  const hours = parseInt(minutes / 60, 10)
  if (hours < 24) {
    return `${hours}小时前`
  }
  const days = parseInt(hours / 24, 10)
  if (days < 30) {
    return `${days}天前`
  }
  return date.toJSON().split('T')[0]
}
