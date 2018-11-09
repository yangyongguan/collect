//  获取用户是否已预约 获取用户是否已报名
// isApply是否预约，true是false否
// isOrder是否报名，true是false否
export function getJoininfo (id) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/user/join-info',
    params: {
      activityId: id
    }
  })
}
// 预约活动
export function subScribe (data) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/user/order-activity',
    params: data
  })
}
// 获取用户信息
export function getUserinfo (data) {
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/info',
    params: data
  })
}
// 获取活动信息
export function getWebinarinfo (data) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/live/info',
    params: data
  })
}
// 获取分享信息
export function getShareInfo (data) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/share/info',
    params: data
  })
}
// 获取参会信息
export function getRegactivity (id) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/user/reg-activity',
    params: {
      activityId: id
    }
  })
}
// 手机快捷登陆
export function mobileLogin (data) {
  return this.$ajax({
    method: 'post',
    url: '/user/consumer-user/mobile-login',
    params: data
  })
}
// 获取报名表单题目
export function getForm (id) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/question/info',
    params: {
      activityId: id
    }
  })
}
// 报名活动提交表单
export function saveForm (data) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/user/apply-activity',
    params: data
  })
}
// 获取游客信息
export function getVisitorinfo () {
  return this.$ajax({
    method: 'get',
    url: '/frontend/user/visitor-info'
  })
}
// 验证是否已报名
export function applyValid (data) {
  return this.$ajax({
    method: 'post',
    url: '/frontend/user/check-apply',
    params: data,
    headers: {
      noAlert: true
    }
  })
}
// 获取我得活动列表
export function getActivityList (data) {
  return this.$ajax({
    method: 'get',
    url: '/frontend/user/visit-activity-list',
    params: data,
    headers: {
      noAlert: true
    }
  })
}
