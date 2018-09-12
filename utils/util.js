const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url, callback) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': 'application/xml' // 默认值
    },
    success: function(res) {
      callback(res.data)
    }
  })
}

function dealTitle(title) {
  if (title.length >= 6) {
    title = title.substring(0, 6) + '...';
  }
  return title;
}
module.exports = {
  formatTime: formatTime,
  http: http,
  dealTitle: dealTitle
}