/**
 * 程序名：api接口
 * 功能：与后端通讯的api接口定义
 */
import axios from 'axios'

// 问卷设计者操作
export const designOpera = data => {
  return axios.post(process.env.VUE_APP_BASE_API + 'api/design', data).then(res => res.data)
}

// 问卷回答者操作
export const answerOpera = data => {
  return axios.post(process.env.VUE_APP_BASE_API + 'api/answer', data).then(res => res.data)
}

export function getUUID() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 16; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  var uuid = s.join('')
  return uuid
}

// 设置cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) +
((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 取回cookie
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
