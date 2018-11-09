import Vue from 'vue'

export function login (data) {
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/mobile-login',
    params: data,
    headers: {
      noAlert: true
    }
  })
}
export function logout (data) {
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/signout',
    params: data
  })
}
export function getCode (data) {
  return this.$ajax({
    method: 'post',
    url: '/common/message/send-code',
    params: data,
    headers: {
      noAlert: true
    }
  })
}

export function getLoginInfo (data) {
  let _this = this
  if (!_this) {
    _this = new Vue()
  }
  return _this.$ajax({
    method: 'get',
    url: '/user/consumer-user/info',
    params: data,
    headers: {
      loading: true,
      noAlert: true
    }
  })
}
export function getMasterInfos (token) {
  return this.$ajax({
    method: 'get',
    url: '/initiator/user/get-user-info',
    headers: {
      Authorization: token
    }
  })
}
export function getCenterInfo (token) { // 获取个人中心信息
  return this.$ajax({
    method: 'get',
    url: '/user/consumer-user/center-info',
    headers: {
      Authorization: token,
      noAlert: true
    }
  })
}
export function changeCenterMobile (data) { // 更改个人中心手机号
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/update-mobile',
    params: data,
    headers: {
      noAlert: true
    }
  })
}
export function changeCenterInfo (data) { // 更改个人中心信息
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/update',
    params: data
  })
}

export function getAreaJson (data) { // 更改个人中心信息
  return this.$ajax({
    method: 'get',
    url: 'https://static.vhallyun.com/public/static/js/area.json',
    params: data
  })
}
